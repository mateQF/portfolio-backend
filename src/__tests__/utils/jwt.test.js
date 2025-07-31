import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken', () => ({
  default: { sign: vi.fn(), verify: vi.fn() }
}));

import { createToken, verifyToken } from '../../utils/jwt.js';

describe('jwt utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'secret';
    process.env.JWT_EXPIRES = '1h';
  });

  it('should call jwt.sign with payload and secret', () => {
    jwt.sign.mockReturnValue('mocked-token');
    const token = createToken({ id: 1 });
    expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, 'secret', { expiresIn: '1h' });
    expect(token).toBe('mocked-token');
  });

  it('should call jwt.verify with token and secret', () => {
    jwt.verify.mockReturnValue({ id: 1 });
    const decoded = verifyToken('mocked-token');
    expect(jwt.verify).toHaveBeenCalledWith('mocked-token', 'secret');
    expect(decoded).toEqual({ id: 1 });
  });
});
