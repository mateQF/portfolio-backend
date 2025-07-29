import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const techStacks = [
  { name: 'React', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Prisma', category: 'orm' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' }
];

async function main() {
  await prisma.techStack.deleteMany();
  for (const stack of techStacks) {
    await prisma.techStack.create({ data: stack });
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
