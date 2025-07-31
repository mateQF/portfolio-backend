import { ProjectRepository } from '../repositories/project.repository.js';
import { NotFoundError } from '../utils/errors.js';

export const ProjectService = {
  getAll: (query) => {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', search = '' } = query;

    return ProjectRepository.findAll({
      page: Number(page),
      limit: Number(limit),
      sort,
      order,
      search
    });
  },

  getById: async (id) => {
    const project = await ProjectRepository.findById(id);
    if (!project) throw new NotFoundError('Proyecto no encontrado');
    return project;
  },

  create: (data) => ProjectRepository.create(data),

  update: async (id, data) => {
    await ProjectService.getById(id);
    return ProjectRepository.update(id, data);
  },

  remove: async (id) => {
    await ProjectService.getById(id);
    return ProjectRepository.remove(id);
  }
};
