import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { Department } from './department.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column('uuid')
  roleId: string;

  @ManyToOne(() => Department, (department) => department.users, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column('uuid', { nullable: true })
  departmentId: string;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'ACTIVE', 'SUSPENDED', 'LOCKED'],
    default: 'PENDING',
  })
  status: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'integer', default: 0 })
  failedLoginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  accountLockedUntil: Date;

  @Column({ type: 'integer', default: 0 })
  lockoutCount24h: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLockoutReset: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  passwordChangedAt: Date;

  @Column({ type: 'simple-array', nullable: true })
  @Exclude()
  passwordHistory: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  mfaSecret: string;

  @Column({ type: 'boolean', default: false })
  mfaEnabled: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('uuid', { nullable: true })
  createdBy: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email?.toLowerCase().trim();
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
