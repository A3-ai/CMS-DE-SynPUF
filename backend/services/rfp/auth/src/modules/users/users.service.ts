import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto, User } from '@procurement/shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);
    return this.mapToUser(savedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.mapToUser(user));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    return this.mapToUser(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLoginAt: new Date() });
  }

  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  private mapToUser(entity: UserEntity): User {
    const { passwordHash, ...user } = entity;
    return user as User;
  }
}
