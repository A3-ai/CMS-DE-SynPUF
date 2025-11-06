export enum UserRole {
  ADMIN = 'admin',
  PROCUREMENT_MANAGER = 'procurement_manager',
  PROCUREMENT_SPECIALIST = 'procurement_specialist',
  CATEGORY_MANAGER = 'category_manager',
  FINANCE = 'finance',
  LEGAL = 'legal',
  VENDOR = 'vendor',
  VIEWER = 'viewer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
  status: UserStatus;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
}
