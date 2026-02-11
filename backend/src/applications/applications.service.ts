import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus, Offer, OfferStatus, User } from '../entities';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  /**
   * Apply to an offer (Candidate only)
   */
  async apply(offerId: string, user: User): Promise<Application> {
    // Verify offer exists and is approved
    const offer = await this.offerRepository.findOne({
      where: { id: offerId, status: OfferStatus.APPROVED },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found or not available');
    }

    // Check if already applied
    const existing = await this.applicationRepository.findOne({
      where: { candidateId: user.id, offerId },
    });

    if (existing) {
      throw new ConflictException('You have already applied to this offer');
    }

    const application = this.applicationRepository.create({
      candidateId: user.id,
      offerId,
      status: ApplicationStatus.SUBMITTED,
    });

    return this.applicationRepository.save(application);
  }

  /**
   * Get all applications for the current candidate
   */
  async findMyApplications(userId: string): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { candidateId: userId },
      relations: ['offer', 'offer.department', 'offer.topics'],
      order: { appliedAt: 'DESC' },
    });
  }
}
