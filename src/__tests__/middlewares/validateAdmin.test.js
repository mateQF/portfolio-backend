import { describe, it, expect, vi } from 'vitest';

import { validateAdmin } from '../../middlewares/validateAdmin.js';

vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

describe('validateAdmin', () => {
  it('should return 403 if role is not admin', () => {
    const req = { user: { role: 'user' }, method: 'GET', originalUrl: '/' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    validateAdmin(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('should call next if user is admin', () => {
    const req = { user: { role: 'admin' } };
    const res = {};
    const next = vi.fn();

    validateAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
