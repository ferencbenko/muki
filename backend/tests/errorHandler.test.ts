import { NextFunction, Request, Response } from 'express';
import { AppError, errorHandler, notFoundHandler } from '../src/middleware/errorHandler';

describe('errorHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {
      path: '/test',
      method: 'GET',
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should handle errors with custom status code', () => {
    const error: AppError = new Error('Test error');
    error.statusCode = 404;
    error.status = 'fail';

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      status: 'fail',
      error: 'Test error',
    });
  });

  it('should default to 500 status code', () => {
    const error: AppError = new Error('Test error');

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it('should hide error details in production for 500 errors', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const error: AppError = new Error('Internal error details');

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      status: 'error',
      error: 'Internal server error',
    });

    process.env.NODE_ENV = originalEnv;
  });

  it('should show error details in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const error: AppError = new Error('Detailed error message');

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      status: 'error',
      error: 'Detailed error message',
    });

    process.env.NODE_ENV = originalEnv;
  });

  it('should log error information', () => {
    const error: AppError = new Error('Test error');
    error.statusCode = 400;

    errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('notFoundHandler', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {
      originalUrl: '/non-existent-route',
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 404 with route not found message', () => {
    notFoundHandler(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      error: 'Route /non-existent-route not found',
    });
  });
});
