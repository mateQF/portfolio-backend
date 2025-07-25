import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const projects = [
  {
    title: 'Portfolio',
    description: 'Hecho con React, Express y PostgreSQL.',
    image: 'https://i.imgur.com/XgD6AXf.png',
    url: 'https://github.com/mateqf/portfolio'
  },
  {
    title: 'API de Tareas',
    description: 'API REST con Node.js y JWT para gestionar tareas.',
    image: 'https://i.imgur.com/dG9V9Rr.png',
    url: 'https://github.com/mateqf/todo-api'
  },
  {
    title: 'App de Clima',
    description: 'App que muestra el clima usando la API de OpenWeather.',
    image: 'https://i.imgur.com/AD5Omkk.png',
    url: 'https://github.com/mateqf/weather-app'
  }
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { url: project.url },
      update: {},
      create: project
    });
  }
}

main()
  .catch((e) => {
    console.warn(e)
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
