import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities';

export interface AuditEvent {
  action: string;
  userId?: string;
  targetId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  severity?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(event: AuditEvent): Promise<void> {
    const auditLog = this.auditLogRepository.create({
      eventType: event.action,
      userId: event.userId,
      targetId: event.targetId,
      details: event.details,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      severity: event.severity || 'INFO',
      timestamp: new Date(),
    });

    await this.auditLogRepository.save(auditLog);

    // High-severity events trigger alerts (implement notification service later)
    if (this.isHighSeverity(event)) {
      // TODO: Send security alert
      console.warn(`[SECURITY ALERT] ${event.action}`, event);
    }
  }

  private isHighSeverity(event: AuditEvent): boolean {
    return ['ACCOUNT_SUSPENDED', 'MULTIPLE_FAILED_LOGINS', 'UNAUTHORIZED_ACCESS_ATTEMPT'].includes(
      event.action,
    );
  }

  async getUserLogs(userId: string, limit: number = 100): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      where: { userId },
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  async getRecentEvents(limit: number = 100): Promise<AuditLog[]> {
    return this.auditLogRepository.find({
      order: { timestamp: 'DESC' },
      take: limit,
      relations: ['user'],
    });
  }
}
