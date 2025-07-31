import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/auth.service.js', () => ({
  AuthService: {
    login: vi.fn()
  }
}));

import { AuthController } from '../../controllers/auth.controller.js';
import { AuthService } from '../../services/auth.service.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('AuthController', () => {
  let res, next;

  beforeEach(() => {
    res = mockRes();
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('should return token on successful login', async () => {
    AuthService.login.mockResolvedValue('jwt-token');

    const req = { body: { email: 'test@test.com', password: '123456' } };
    await AuthController.login(req, res, next);

    expect(AuthService.login).toHaveBeenCalledWith('test@test.com', '123456');
    expect(res.json).toHaveBeenCalledWith({ token: 'jwt-token' });
  });

  it('should call next on error', async () => {
    const error = new Error('Login failed');
    AuthService.login.mockRejectedValue(error);

    const req = { body: { email: 'fail@test.com', password: 'wrong' } };
    await AuthController.login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
