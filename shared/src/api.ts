/**
 * Định dạng phản hồi RESTful API chuẩn
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  errors?: any;
  timestamp: string;
}
