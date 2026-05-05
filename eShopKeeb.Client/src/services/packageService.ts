import type { ApiResponse } from '@/models/common/api';
import type { PaginationParams } from '@/models/common/api';
import type { PackageListResponse } from '@/models/package/response/packageListResponse';
import type { PackageDetailResponse } from '@/models/package/response/packageDetailResponse';
import type { CreatePackageRequest } from '@/models/package/request/createPackageRequest';
import type { UpdatePackageRequest } from '@/models/package/request/updatePackageRequest';
import type { Package } from '@/models/package/entity/package';

// Mock data
const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Basic Package',
    code: 'BASIC',
    description: 'Perfect for small teams and startups',
    price: 9.99,
    duration: 30,
    features: [
      'Up to 5 users',
      'Basic support',
      '10GB storage',
      'Email support',
    ],
    isActive: true,
    maxUsers: 5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Professional Package',
    code: 'PRO',
    description: 'Ideal for growing businesses',
    price: 29.99,
    duration: 30,
    features: [
      'Up to 20 users',
      'Priority support',
      '100GB storage',
      '24/7 support',
      'Advanced analytics',
    ],
    isActive: true,
    maxUsers: 20,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Enterprise Package',
    code: 'ENTERPRISE',
    description: 'For large organizations with advanced needs',
    price: 99.99,
    duration: 30,
    features: [
      'Unlimited users',
      'Dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'SLA guarantee',
    ],
    isActive: true,
    maxUsers: 999999,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Trial Package',
    code: 'TRIAL',
    description: 'Try before you buy',
    price: 0,
    duration: 7,
    features: ['1 user', 'Basic features', '1GB storage', 'Community support'],
    isActive: false,
    maxUsers: 1,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

let packages = [...mockPackages];

class PackageService {
  apiRoute = {
    GET_PACKAGES: '/api/v1/packages/list',
    GET_PACKAGE_BY_ID: '/api/v1/packages/:id',
    CREATE_PACKAGE: '/api/v1/packages',
    UPDATE_PACKAGE: '/api/v1/packages/:id',
    DELETE_PACKAGE: '/api/v1/packages/:id',
    ACTIVATE_PACKAGE: '/api/v1/packages/:id/activate',
    DEACTIVATE_PACKAGE: '/api/v1/packages/:id/deactivate',
  };

  async getPackages(
    params?: PaginationParams
  ): Promise<ApiResponse<PackageListResponse>> {
    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const searchTerm = params?.searchTerm?.toLowerCase() || '';

    // Filter
    let filtered = packages;
    if (searchTerm) {
      filtered = packages.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchTerm) ||
          pkg.code.toLowerCase().includes(searchTerm) ||
          pkg.description.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = filtered.slice(startIndex, endIndex);

    return {
      isSuccess: true,
      data: {
        items,
        totalCount,
        totalPages,
        currentPage: page,
        pageSize,
      },
      message: 'Packages retrieved successfully',
    };
  }

  async getPackageById(
    id: string
  ): Promise<ApiResponse<PackageDetailResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pkg = packages.find((p) => p.id === id);

    if (!pkg) {
      return {
        isSuccess: false,
        data: null as any,
        message: 'Package not found',
      };
    }

    return {
      isSuccess: true,
      data: pkg,
      message: 'Package retrieved successfully',
    };
  }

  async createPackage(
    request: CreatePackageRequest
  ): Promise<ApiResponse<PackageDetailResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newPackage: Package = {
      id: Date.now().toString(),
      ...request,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    packages.push(newPackage);

    return {
      isSuccess: true,
      data: newPackage,
      message: 'Package created successfully',
    };
  }

  async updatePackage(
    id: string,
    request: UpdatePackageRequest
  ): Promise<ApiResponse<PackageDetailResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = packages.findIndex((p) => p.id === id);

    if (index === -1) {
      return {
        isSuccess: false,
        data: null as any,
        message: 'Package not found',
      };
    }

    packages[index] = {
      ...packages[index],
      ...request,
      updatedAt: new Date().toISOString(),
    };

    return {
      isSuccess: true,
      data: packages[index],
      message: 'Package updated successfully',
    };
  }

  async deletePackage(id: string): Promise<ApiResponse<void>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = packages.findIndex((p) => p.id === id);

    if (index === -1) {
      return {
        isSuccess: false,
        data: undefined as any,
        message: 'Package not found',
      };
    }

    packages.splice(index, 1);

    return {
      isSuccess: true,
      data: undefined as any,
      message: 'Package deleted successfully',
    };
  }

  async activatePackage(id: string): Promise<ApiResponse<boolean>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pkg = packages.find((p) => p.id === id);

    if (!pkg) {
      return {
        isSuccess: false,
        data: false,
        message: 'Package not found',
      };
    }

    pkg.isActive = true;
    pkg.updatedAt = new Date().toISOString();

    return {
      isSuccess: true,
      data: true,
      message: 'Package activated successfully',
    };
  }

  async deactivatePackage(id: string): Promise<ApiResponse<boolean>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pkg = packages.find((p) => p.id === id);

    if (!pkg) {
      return {
        isSuccess: false,
        data: false,
        message: 'Package not found',
      };
    }

    pkg.isActive = false;
    pkg.updatedAt = new Date().toISOString();

    return {
      isSuccess: true,
      data: true,
      message: 'Package deactivated successfully',
    };
  }
}

const packageService = new PackageService();
export default packageService;
