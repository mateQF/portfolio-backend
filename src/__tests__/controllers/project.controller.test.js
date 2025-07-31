import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/project.service.js', () => ({
  ProjectService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}));

import { ProjectController } from '../../controllers/project.controller.js';
import { ProjectService } from '../../services/project.service.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('ProjectController', () => {
  let res, next;

  beforeEach(() => {
    res = mockRes();
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('getAll returns data', async () => {
    ProjectService.getAll.mockResolvedValue([{ id: 1 }]);
    await ProjectController.getAll({ query: {} }, res, next);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getById returns data', async () => {
    ProjectService.getById.mockResolvedValue({ id: 1 });
    await ProjectController.getById({ params: { id: 1 } }, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('create returns 201', async () => {
    ProjectService.create.mockResolvedValue({ id: 1 });
    await ProjectController.create({ body: { title: 'New' } }, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('update returns updated project', async () => {
    ProjectService.update.mockResolvedValue({ id: 1, title: 'Updated' });
    await ProjectController.update({ params: { id: 1 }, body: {} }, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Updated' });
  });

  it('remove returns 204', async () => {
    ProjectService.remove.mockResolvedValue();
    await ProjectController.remove({ params: { id: 1 } }, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
