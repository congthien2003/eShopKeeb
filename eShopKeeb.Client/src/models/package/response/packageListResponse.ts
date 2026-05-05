import type { Package } from '../entity/package';

export interface PackageListResponse {
  items: Package[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
