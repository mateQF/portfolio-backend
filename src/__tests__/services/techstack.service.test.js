import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../repositories/techstack.repository.js', () => ({
  TechStackRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(), // por si existiera
    remove: vi.fn()
  }
}));

import { TechStackService } from '../../services/techstack.service.js';
import { TechStackRepository } from '../../repositories/techstack.repository.js';

describe('TechStackService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getAll returns all tech stacks', async () => {
    const mockStacks = [{ id: 1, name: 'React' }];
    TechStackRepository.findAll.mockResolvedValue(mockStacks);

    const result = await TechStackService.getAll();
    expect(result).toEqual(mockStacks);
  });

  it('getById returns tech stack if exists', async () => {
    const mockStack = { id: 1, name: 'Node.js' };
    TechStackRepository.findById.mockResolvedValue(mockStack);

    const result = await TechStackService.getById(1);
    expect(result).toEqual(mockStack);
  });

  it('getById throws error if not found', async () => {
    TechStackRepository.findById.mockResolvedValue(null);
    await expect(TechStackService.getById(999)).rejects.toEqual({
      status: 404,
      message: 'Tech stack not found'
    });
  });

  it('create should call repository with data', async () => {
    const data = { name: 'TypeScript' };
    await TechStackService.create(data);
    expect(TechStackRepository.create).toHaveBeenCalledWith(data);
  });

  it('update should first verify existence then update', async () => {
    const id = 1;
    const data = { name: 'Updated' };
    TechStackRepository.findById.mockResolvedValue({ id, name: 'Old' });

    await TechStackService.update(id, data);
    expect(TechStackRepository.update).toHaveBeenCalledWith(id, data);
  });

  it('remove should first verify existence then remove', async () => {
    const id = 1;
    TechStackRepository.findById.mockResolvedValue({ id });

    await TechStackService.remove(id);
    expect(TechStackRepository.remove).toHaveBeenCalledWith(id);
  });
});
