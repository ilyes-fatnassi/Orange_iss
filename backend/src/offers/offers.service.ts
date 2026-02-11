import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Offer, OfferStatus, Topic, User, RoleType, Application } from '../entities';
import { CreateOfferDto, UpdateOfferDto } from './dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  /**
   * Create a new offer (Dept Chief only)
   */
  async create(dto: CreateOfferDto, user: User): Promise<Offer> {
    if (!user.departmentId) {
      throw new BadRequestException('You must belong to a department to create offers');
    }

    // Validate topics exist
    const topics = await this.topicRepository.find({
      where: { id: In(dto.topicIds) },
    });

    if (topics.length !== dto.topicIds.length) {
      throw new BadRequestException('One or more topic IDs are invalid');
    }

    const offer = this.offerRepository.create({
      title: dto.title,
      description: dto.description,
      status: OfferStatus.PENDING,
      createdById: user.id,
      departmentId: user.departmentId,
      topics,
    });

    return this.offerRepository.save(offer);
  }

  /**
   * Public: return approved offers (no auth required)
   */
  async findPublic(): Promise<Offer[]> {
    return this.offerRepository.find({
      where: { status: OfferStatus.APPROVED },
      relations: ['department', 'topics'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get offers — filtered by role:
   * - CANDIDATE: only APPROVED
   * - DEPT_CHIEF: only their own
   * - HR_ADMIN / SUPER_ADMIN: all
   */
  async findAll(user: User): Promise<any[]> {
    let offers: Offer[];

    if (user.role.name === RoleType.CANDIDATE) {
      offers = await this.offerRepository.find({
        where: { status: OfferStatus.APPROVED },
        relations: ['createdBy', 'department', 'topics'],
        order: { createdAt: 'DESC' },
      });
    } else if (user.role.name === RoleType.DEPT_CHIEF) {
      offers = await this.offerRepository.find({
        where: { createdById: user.id },
        relations: ['createdBy', 'department', 'topics'],
        order: { createdAt: 'DESC' },
      });
    } else {
      // HR_ADMIN or SUPER_ADMIN — see all
      offers = await this.offerRepository.find({
        relations: ['createdBy', 'department', 'topics'],
        order: { createdAt: 'DESC' },
      });
    }

    // Attach applicant count for DEPT_CHIEF and HR views
    if (user.role.name !== RoleType.CANDIDATE) {
      const offerIds = offers.map((o) => o.id);
      const counts = await this.applicationRepository
        .createQueryBuilder('app')
        .select('app.offerId', 'offerId')
        .addSelect('COUNT(*)', 'count')
        .where('app.offerId IN (:...offerIds)', { offerIds: offerIds.length ? offerIds : ['none'] })
        .groupBy('app.offerId')
        .getRawMany();

      const countMap = new Map(counts.map((c) => [c.offerId, parseInt(c.count)]));

      return offers.map((offer) => ({
        ...offer,
        applicantCount: countMap.get(offer.id) || 0,
        createdBy: {
          id: offer.createdBy.id,
          firstName: offer.createdBy.firstName,
          lastName: offer.createdBy.lastName,
          email: offer.createdBy.email,
        },
      }));
    }

    return offers;
  }

  /**
   * Get single offer by ID
   */
  async findOne(id: string, user: User): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['createdBy', 'department', 'topics'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    // Candidates can only see approved offers
    if (user.role.name === RoleType.CANDIDATE && offer.status !== OfferStatus.APPROVED) {
      throw new NotFoundException('Offer not found');
    }

    // Dept chiefs can only see their own offers
    if (user.role.name === RoleType.DEPT_CHIEF && offer.createdById !== user.id) {
      throw new ForbiddenException('You can only view your own offers');
    }

    return offer;
  }

  /**
   * Update offer (Dept Chief — own offers only)
   */
  async update(id: string, dto: UpdateOfferDto, user: User): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['topics'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    if (offer.createdById !== user.id) {
      throw new ForbiddenException('You can only edit your own offers');
    }

    if (dto.title) offer.title = dto.title;
    if (dto.description) offer.description = dto.description;

    if (dto.topicIds) {
      const topics = await this.topicRepository.find({
        where: { id: In(dto.topicIds) },
      });

      if (topics.length !== dto.topicIds.length) {
        throw new BadRequestException('One or more topic IDs are invalid');
      }

      offer.topics = topics;
    }

    // If offer was declined, resubmit as pending
    if (offer.status === OfferStatus.DECLINED) {
      offer.status = OfferStatus.PENDING;
    }

    return this.offerRepository.save(offer);
  }

  /**
   * Approve offer (HR only)
   */
  async approve(id: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['createdBy', 'department', 'topics'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OfferStatus.APPROVED;
    return this.offerRepository.save(offer);
  }

  /**
   * Decline offer (HR only)
   */
  async decline(id: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['createdBy', 'department', 'topics'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = OfferStatus.DECLINED;
    return this.offerRepository.save(offer);
  }
}
