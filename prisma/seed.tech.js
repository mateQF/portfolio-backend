import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const techStacks = [
  'React',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Prisma',
  'Tailwind CSS',
  'JavaScript',
  'TypeScript'
];

async function main() {
  for (const name of techStacks) {
    await prisma.techStack.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
