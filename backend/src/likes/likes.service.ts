import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like, Offer, OfferStatus, User } from '../entities';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  /**
   * Like (save/favorite) an offer
   */
  async like(offerId: string, user: User): Promise<Like> {
    // Verify offer exists and is approved
    const offer = await this.offerRepository.findOne({
      where: { id: offerId, status: OfferStatus.APPROVED },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found or not available');
    }

    // Check if already liked
    const existing = await this.likeRepository.findOne({
      where: { candidateId: user.id, offerId },
    });

    if (existing) {
      throw new ConflictException('You have already liked this offer');
    }

    const like = this.likeRepository.create({
      candidateId: user.id,
      offerId,
    });

    return this.likeRepository.save(like);
  }

  /**
   * Unlike (remove favorite) an offer
   */
  async unlike(offerId: string, user: User): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { candidateId: user.id, offerId },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepository.remove(like);
  }

  /**
   * Get all liked offers for the current candidate
   */
  async findMyLikes(userId: string): Promise<Like[]> {
    return this.likeRepository.find({
      where: { candidateId: userId },
      relations: ['offer', 'offer.department', 'offer.topics'],
      order: { createdAt: 'DESC' },
    });
  }
}
