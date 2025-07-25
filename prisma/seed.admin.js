import 'dotenv/config.js';
import bcrypt from 'bcrypt';

import prisma from '../src/config/prisma.js';

const email = 'mateo.fortu@gmail.com';
const plainPassword = process.env.ADMIN_PASSWORD;

if (!plainPassword) process.exit(1);

const run = async () => {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) process.exit(0);

  const hashed = await bcrypt.hash(plainPassword, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: 'admin'
    }
  });
};

run()
  .catch((err) => {
    console.error('Error creating admin:', err);
  })
  .finally(() => prisma.$disconnect());
