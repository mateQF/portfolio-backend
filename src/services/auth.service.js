import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../config/prisma.js';
import { UnauthorizedError } from '../utils/errors.js';

export const AuthService = {
  login: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    return token;
  }
};
