import { describe, it, expect, vi } from 'vitest';

import { validateAuth } from '../../middlewares/validateAuth.js';

vi.mock('../../utils/jwt.js', () => ({
  verifyToken: vi.fn(() => ({ id: 1, role: 'admin' }))
}));
vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

describe('validateAuth', () => {
  it('should set req.user if token is valid', () => {
    const req = { headers: { authorization: 'Bearer token123' } };
    const res = {};
    const next = vi.fn();

    validateAuth(req, res, next);
    expect(req.user).toEqual({ id: 1, role: 'admin' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if no token', () => {
    const req = { headers: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    validateAuth(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
