import bcrypt from 'bcrypt';

import prisma from '../config/prisma.js';
import { UnauthorizedError } from '../utils/errors.js';
import { createToken } from '../utils/jwt.js';

export const AuthService = {
  login: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = createToken({ id: user.id, email: user.email, role: user.role });
    return token;
  }
};
