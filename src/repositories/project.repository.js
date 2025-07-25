import prisma from '../config/prisma.js';

export const ProjectRepository = {
  async findAll({ page, limit, sort, order, search }) {
    const skip = (page - 1) * limit;
    const take = limit;
    const orderBy = { [sort]: order };

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
            { techStack: { some: { name: { contains: search, mode: 'insensitive' } } } }
          ]
        }
      : {};

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take,
        orderBy,
        where,
        include: { techStack: true }
      }),
      prisma.project.count({ where })
    ]);

    return { projects, total };
  },

  findById: (id) =>
    prisma.project.findUnique({
      where: { id },
      include: { techStack: true }
    }),

  async create(data) {
    const { techStack, ...rest } = data;

    const techs = await prisma.techStack.findMany({
      where: { name: { in: techStack } }
    });

    return prisma.project.create({
      data: {
        ...rest,
        techStack: {
          connect: techs.map((tech) => ({ id: tech.id }))
        }
      },
      include: { techStack: true }
    });
  },

  async update(id, data) {
    const { techStack, ...rest } = data;

    const techs = await prisma.techStack.findMany({
      where: { name: { in: techStack } }
    });

    return prisma.project.update({
      where: { id },
      data: {
        ...rest,
        techStack: {
          set: [], // quitamos todos los anteriores
          connect: techs.map((tech) => ({ id: tech.id }))
        }
      },
      include: { techStack: true }
    });
  },

  remove: (id) => prisma.project.delete({ where: { id } })
};
