import { ProjectService } from '../services/project.service.js';

export const ProjectController = {
  getAll: async (req, res, next) => {
    try {
      const data = await ProjectService.getAll(req.query);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const data = await ProjectService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const created = await ProjectService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const updated = await ProjectService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await ProjectService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
