import { describe, it, expect, vi } from 'vitest';

import { errorHandler } from '../../middlewares/errorHandler.js';

vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

describe('errorHandler', () => {
  it('should log error and return 500', () => {
    const req = { method: 'GET', url: '/api/test' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const err = new Error('Something went wrong');

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });

  it('should use error status if provided', () => {
    const req = { method: 'POST', url: '/api/test' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const err = { status: 403, message: 'Forbidden' };

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });
});
