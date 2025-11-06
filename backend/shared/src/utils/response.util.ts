import { ApiResponse, ApiError, ResponseMeta, PaginatedResponse } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class ResponseUtil {
  static success<T>(data: T, requestId?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: this.createMeta(requestId),
    };
  }

  static error(code: string, message: string, details?: any, requestId?: string): ApiResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
      meta: this.createMeta(requestId),
    };
  }

  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    requestId?: string,
  ): PaginatedResponse<T> {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      meta: this.createMeta(requestId),
    };
  }

  private static createMeta(requestId?: string): ResponseMeta {
    return {
      timestamp: new Date().toISOString(),
      requestId: requestId || uuidv4(),
    };
  }
}
