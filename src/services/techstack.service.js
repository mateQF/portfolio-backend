import { TechStackRepository } from '../repositories/techstack.repository.js';

export const TechStackService = {
  getAll: async () => TechStackRepository.findAll(),
  getById: async (id) => {
    const stack = await TechStackRepository.findById(id);
    if (!stack) throw { status: 404, message: 'Tech stack not found' };
    return stack;
  },
  create: async (data) => TechStackRepository.create(data),
  update: async (id, data) => {
    await TechStackService.getById(id);
    return TechStackRepository.update(id, data);
  },
  remove: async (id) => {
    await TechStackService.getById(id);
    return TechStackRepository.remove(id);
  }
};
