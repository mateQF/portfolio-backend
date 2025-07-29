import prisma from '../generated/prisma/index.js';

export const TechStackRepository = {
  findAll: () => prisma.techStack.findMany(),
  findById: (id) => prisma.techStack.findUnique({ where: { id } }),
  create: (data) => prisma.techStack.create({ data }),
  update: (id, data) => prisma.techStack.update({ where: { id }, data }),
  remove: (id) => prisma.techStack.delete({ where: { id } })
};
