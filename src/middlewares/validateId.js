import { IdParamSchema } from '../schemas/common.schema.js';

export const validateId = (req, res, next) => {
  try {
    req.params = IdParamSchema.parse(req.params);
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'InvalidId',
      message: err.errors?.[0]?.message || 'ID inválido'
    });
  }
};
