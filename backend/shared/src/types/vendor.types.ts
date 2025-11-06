export enum VendorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Certification {
  name: string;
  issuedBy: string;
  issuedDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
}

export interface Vendor {
  id: string;
  name: string;
  legalName: string;
  taxId: string;
  email: string;
  phone: string;
  website?: string;
  address: Address;
  categories: string[];
  certifications: Certification[];
  status: VendorStatus;
  performanceScore?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateVendorDto {
  name: string;
  legalName: string;
  taxId: string;
  email: string;
  phone: string;
  website?: string;
  address: Address;
  categories: string[];
  certifications?: Certification[];
}

export interface UpdateVendorDto {
  name?: string;
  legalName?: string;
  taxId?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: Address;
  categories?: string[];
  certifications?: Certification[];
  status?: VendorStatus;
}
