import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/project.repository.js', () => ({
  ProjectRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}));

import { ProjectService } from '../../services/project.service.js';
import { ProjectRepository } from '../../repositories/project.repository.js';
import { NotFoundError } from '../../utils/errors.js';

describe('ProjectService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getAll calls ProjectRepository.findAll', async () => {
    await ProjectService.getAll({});
    expect(ProjectRepository.findAll).toHaveBeenCalled();
  });

  it('getById returns a project if found', async () => {
    const project = { id: 1 };
    ProjectRepository.findById.mockResolvedValue(project);

    const result = await ProjectService.getById(1);
    expect(result).toEqual(project);
  });

  it('getById throws NotFoundError if not found', async () => {
    ProjectRepository.findById.mockResolvedValue(null);
    await expect(ProjectService.getById(1)).rejects.toThrow(NotFoundError);
  });

  it('create calls ProjectRepository.create', async () => {
    const data = { title: 'Test' };
    await ProjectService.create(data);
    expect(ProjectRepository.create).toHaveBeenCalledWith(data);
  });

  it('update calls getById and update', async () => {
    ProjectRepository.findById.mockResolvedValue({ id: 1 });
    const data = { title: 'Updated' };
    await ProjectService.update(1, data);
    expect(ProjectRepository.update).toHaveBeenCalledWith(1, data);
  });

  it('remove calls getById and remove', async () => {
    ProjectRepository.findById.mockResolvedValue({ id: 1 });
    await ProjectService.remove(1);
    expect(ProjectRepository.remove).toHaveBeenCalledWith(1);
  });
});
