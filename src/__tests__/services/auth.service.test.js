import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn()
  }
}));
vi.mock('../../config/prisma.js', () => ({
  default: {
    user: {
      findUnique: vi.fn()
    }
  }
}));
vi.mock('../../utils/jwt.js', () => ({
  createToken: vi.fn()
}));
vi.mock('../../utils/errors.js', async () => {
  const mod = await vi.importActual('../../utils/errors.js');
  return {
    ...mod,
    UnauthorizedError: mod.UnauthorizedError
  };
});

import prisma from '../../config/prisma.js';
import { createToken } from '../../utils/jwt.js';
import { AuthService } from '../../services/auth.service.js';
import { UnauthorizedError } from '../../utils/errors.js';

describe('AuthService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should login and return token if credentials are valid', async () => {
    const user = { id: 1, email: 'test@test.com', password: 'hashed', role: 'admin' };
    prisma.user.findUnique.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    createToken.mockReturnValue('mocked-jwt');

    const result = await AuthService.login('test@test.com', '123456');
    expect(result).toBe('mocked-jwt');
    expect(createToken).toHaveBeenCalledWith({ id: user.id, email: user.email, role: user.role });
  });

  it('should throw if user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    await expect(AuthService.login('wrong@test.com', '123456')).rejects.toThrow(UnauthorizedError);
  });

  it('should throw if password is incorrect', async () => {
    const user = { id: 1, email: 'test@test.com', password: 'hashed' };
    prisma.user.findUnique.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);
    await expect(AuthService.login('test@test.com', 'wrongpass')).rejects.toThrow(
      UnauthorizedError
    );
  });
});
