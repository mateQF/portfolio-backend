import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../config/prisma.js', () => {
  return {
    default: {
      project: {
        findMany: vi.fn(),
        count: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      },
      techStack: {
        findMany: vi.fn()
      }
    }
  };
});

import prisma from '../../config/prisma.js';
import { ProjectRepository } from '../../repositories/project.repository.js';

describe('ProjectRepository', () => {
  afterEach(() => vi.clearAllMocks());

  describe('findAll', () => {
    it('should return projects and total count with search and pagination', async () => {
      const mockProjects = [{ id: 1, title: 'Test' }];
      const mockCount = 1;
      prisma.project.findMany.mockResolvedValue(mockProjects);
      prisma.project.count.mockResolvedValue(mockCount);

      const result = await ProjectRepository.findAll({
        page: 1,
        limit: 10,
        sort: 'title',
        order: 'asc',
        search: 'test'
      });

      expect(prisma.project.findMany).toHaveBeenCalled();
      expect(prisma.project.count).toHaveBeenCalled();
      expect(result).toEqual({ projects: mockProjects, total: mockCount });
    });
  });

  describe('findById', () => {
    it('should return a project by id', async () => {
      const mockProject = { id: 1, title: 'Test' };
      prisma.project.findUnique.mockResolvedValue(mockProject);

      const result = await ProjectRepository.findById(1);

      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { techStack: true }
      });
      expect(result).toEqual(mockProject);
    });
  });

  describe('create', () => {
    it('should create a project and connect tech stack', async () => {
      const input = {
        title: 'Test Project',
        techStack: ['Node', 'React']
      };
      const techs = [{ id: 1 }, { id: 2 }];
      const createdProject = { id: 1, ...input };

      prisma.techStack.findMany.mockResolvedValue(techs);
      prisma.project.create.mockResolvedValue(createdProject);

      const result = await ProjectRepository.create(input);

      expect(prisma.techStack.findMany).toHaveBeenCalled();
      expect(prisma.project.create).toHaveBeenCalled();
      expect(result).toEqual(createdProject);
    });
  });

  describe('update', () => {
    it('should update a project and reset tech stack', async () => {
      const input = {
        title: 'Updated Project',
        techStack: ['Node']
      };
      const techs = [{ id: 1 }];
      const updatedProject = { id: 1, ...input };

      prisma.techStack.findMany.mockResolvedValue(techs);
      prisma.project.update.mockResolvedValue(updatedProject);

      const result = await ProjectRepository.update(1, input);

      expect(prisma.techStack.findMany).toHaveBeenCalled();
      expect(prisma.project.update).toHaveBeenCalled();
      expect(result).toEqual(updatedProject);
    });
  });

  describe('remove', () => {
    it('should delete a project by id', async () => {
      const deletedProject = { id: 1, title: 'Deleted' };
      prisma.project.delete.mockResolvedValue(deletedProject);

      const result = await ProjectRepository.remove(1);

      expect(prisma.project.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(deletedProject);
    });
  });
});
