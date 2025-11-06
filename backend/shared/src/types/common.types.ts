export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ResponseMeta {
  timestamp: string;
  requestId: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterParams {
  [key: string]: any;
}
