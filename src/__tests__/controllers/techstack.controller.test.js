import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/techstack.service.js', () => ({
  TechStackService: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}));

import { TechStackController } from '../../controllers/techstack.controller.js';
import { TechStackService } from '../../services/techstack.service.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  return res;
};

describe('TechStackController', () => {
  let res, next;

  beforeEach(() => {
    res = mockRes();
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('getAll should return data', async () => {
    TechStackService.getAll.mockResolvedValue([{ id: 1 }]);
    await TechStackController.getAll({}, res, next);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getById should return data', async () => {
    TechStackService.getById.mockResolvedValue({ id: 1 });
    await TechStackController.getById({ params: { id: 1 } }, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('create should return 201 with created item', async () => {
    TechStackService.create.mockResolvedValue({ id: 1 });
    await TechStackController.create({ body: { name: 'Test' } }, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('update should return updated item', async () => {
    TechStackService.update.mockResolvedValue({ id: 1, name: 'Updated' });
    await TechStackController.update({ params: { id: 1 }, body: {} }, res, next);
    expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated' });
  });

  it('remove should return 204', async () => {
    TechStackService.remove.mockResolvedValue();
    await TechStackController.remove({ params: { id: 1 } }, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
