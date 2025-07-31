import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../../config/prisma.js', () => {
  return {
    default: {
      techStack: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      }
    }
  };
});

import prisma from '../../config/prisma.js';
import { TechStackRepository } from '../../repositories/techstack.repository.js';

describe('TechStackRepository', () => {
  afterEach(() => vi.clearAllMocks());

  describe('findAll', () => {
    it('should return all tech stacks', async () => {
      const mockTechs = [{ id: 1, name: 'Node.js' }];
      prisma.techStack.findMany.mockResolvedValue(mockTechs);

      const result = await TechStackRepository.findAll();

      expect(prisma.techStack.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockTechs);
    });
  });

  describe('findById', () => {
    it('should return a tech stack by ID', async () => {
      const mockTech = { id: 1, name: 'React' };
      prisma.techStack.findUnique.mockResolvedValue(mockTech);

      const result = await TechStackRepository.findById(1);

      expect(prisma.techStack.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTech);
    });
  });

  describe('create', () => {
    it('should create a tech stack', async () => {
      const data = { name: 'PostgreSQL' };
      const created = { id: 2, ...data };
      prisma.techStack.create.mockResolvedValue(created);

      const result = await TechStackRepository.create(data);

      expect(prisma.techStack.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(created);
    });
  });

  describe('update', () => {
    it('should update a tech stack by ID', async () => {
      const data = { name: 'Updated' };
      const updated = { id: 1, ...data };
      prisma.techStack.update.mockResolvedValue(updated);

      const result = await TechStackRepository.update(1, data);

      expect(prisma.techStack.update).toHaveBeenCalledWith({ where: { id: 1 }, data });
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should delete a tech stack by ID', async () => {
      const deleted = { id: 1, name: 'Old' };
      prisma.techStack.delete.mockResolvedValue(deleted);

      const result = await TechStackRepository.remove(1);

      expect(prisma.techStack.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(deleted);
    });
  });
});
