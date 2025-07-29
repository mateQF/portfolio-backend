import { TechStackService } from '../services/techstack.service.js';

export const TechStackController = {
  getAll: async (_req, res, next) => {
    try {
      const data = await TechStackService.getAll();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const data = await TechStackService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const created = await TechStackService.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const updated = await TechStackService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      await TechStackService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};
