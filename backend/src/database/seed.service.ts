import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleType, Department, User, Topic } from '../entities';
import { PasswordService } from '../auth/services/password.service';

@Injectable()
export class SeedService {
  private logger = new Logger('SeedService');
  private passwordService = new PasswordService();

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async seed() {
    await this.seedRoles();
    await this.seedDepartments();
    await this.seedTopics();
    await this.seedUsers();
  }

  private async seedRoles() {
    const roles = [
      {
        name: RoleType.SUPER_ADMIN,
        description: 'System administrator with full access',
      },
      {
        name: RoleType.HR_ADMIN,
        description: 'HR admin who can manage users and approve internship offers',
      },
      {
        name: RoleType.DEPT_CHIEF,
        description: 'Department chief who can post internship offers',
      },
      {
        name: RoleType.CANDIDATE,
        description: 'Candidate who can browse and apply to offers',
      },
    ];

    for (const roleData of roles) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleData.name },
      });

      if (!existingRole) {
        const role = this.roleRepository.create(roleData);
        await this.roleRepository.save(role);
        this.logger.log(`✓ Role created: ${roleData.name}`);
      } else {
        this.logger.log(`✓ Role already exists: ${roleData.name}`);
      }
    }
  }

  private async seedDepartments() {
    const departments = [
      {
        name: 'Engineering',
        description: 'Software Engineering and Development',
      },
      {
        name: 'Human Resources',
        description: 'Human Resources Management',
      },
      {
        name: 'Marketing',
        description: 'Marketing and Communications',
      },
      {
        name: 'Finance',
        description: 'Finance and Accounting',
      },
      {
        name: 'Operations',
        description: 'Operations and Supply Chain',
      },
    ];

    for (const deptData of departments) {
      const existingDept = await this.departmentRepository.findOne({
        where: { name: deptData.name },
      });

      if (!existingDept) {
        const department = this.departmentRepository.create(deptData);
        await this.departmentRepository.save(department);
        this.logger.log(`✓ Department created: ${deptData.name}`);
      } else {
        this.logger.log(`✓ Department already exists: ${deptData.name}`);
      }
    }
  }

  private async seedTopics() {
    const engineeringDept = await this.departmentRepository.findOne({
      where: { name: 'Engineering' },
    });
    const marketingDept = await this.departmentRepository.findOne({
      where: { name: 'Marketing' },
    });
    const financeDept = await this.departmentRepository.findOne({
      where: { name: 'Finance' },
    });

    const topics = [
      { name: 'Web Development', description: 'Frontend and backend web technologies', departmentId: engineeringDept?.id },
      { name: 'Mobile Development', description: 'iOS and Android app development', departmentId: engineeringDept?.id },
      { name: 'DevOps', description: 'CI/CD, cloud infrastructure, containerization', departmentId: engineeringDept?.id },
      { name: 'Data Science', description: 'Machine learning and data analysis', departmentId: engineeringDept?.id },
      { name: 'Cybersecurity', description: 'Network and application security', departmentId: engineeringDept?.id },
      { name: 'Digital Marketing', description: 'SEO, social media, and online campaigns', departmentId: marketingDept?.id },
      { name: 'Content Strategy', description: 'Content creation and brand messaging', departmentId: marketingDept?.id },
      { name: 'Financial Analysis', description: 'Financial modeling and reporting', departmentId: financeDept?.id },
    ];

    for (const topicData of topics) {
      if (!topicData.departmentId) continue;

      const existingTopic = await this.topicRepository.findOne({
        where: { name: topicData.name, departmentId: topicData.departmentId },
      });

      if (!existingTopic) {
        const topic = this.topicRepository.create(topicData);
        await this.topicRepository.save(topic);
        this.logger.log(`✓ Topic created: ${topicData.name}`);
      } else {
        this.logger.log(`✓ Topic already exists: ${topicData.name}`);
      }
    }
  }

  private async seedUsers() {
    const hrRole = await this.roleRepository.findOne({
      where: { name: RoleType.HR_ADMIN },
    });
    const deptChiefRole = await this.roleRepository.findOne({
      where: { name: RoleType.DEPT_CHIEF },
    });
    const engineeringDept = await this.departmentRepository.findOne({
      where: { name: 'Engineering' },
    });

    if (!hrRole || !deptChiefRole) {
      this.logger.warn('Roles not found, skipping user seed');
      return;
    }

    const users = [
      {
        email: 'hr@orange.com',
        firstName: 'Jane',
        lastName: 'Smith',
        password: 'SecurePass123!@#',
        roleId: hrRole.id,
        departmentId: null as string | null,
        status: 'ACTIVE',
        description: 'HR Admin',
      },
      {
        email: 'chief@orange.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'SecurePass123!@#',
        roleId: deptChiefRole.id,
        departmentId: engineeringDept?.id || null,
        status: 'ACTIVE',
        description: 'Engineering Department Chief',
      },
    ];

    for (const userData of users) {
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        // Use the same PasswordService that login uses — critical for hash/verify match
        const hashedPassword = await this.passwordService.hash(userData.password);
        const user = this.userRepository.create({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: hashedPassword,
          roleId: userData.roleId,
          departmentId: userData.departmentId,
          status: userData.status,
          passwordChangedAt: new Date(),
        });
        await this.userRepository.save(user);
        this.logger.log(
          `User created: ${userData.email} (${userData.description})`,
        );
      } else {
        this.logger.log(`User already exists: ${userData.email}`);
      }
    }
  }
}
