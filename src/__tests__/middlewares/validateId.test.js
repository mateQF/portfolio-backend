import { describe, it, expect, vi } from 'vitest';

import { validateId } from '../../middlewares/validateId.js';
import { IdParamSchema } from '../../schemas/common.schema.js';

vi.mock('../../schemas/common.schema.js', () => ({
  IdParamSchema: {
    parse: vi.fn()
  }
}));
vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

describe('validateId', () => {
  it('should call next on valid ID', () => {
    const req = { params: { id: '123' } };
    IdParamSchema.parse.mockReturnValue(req.params);
    const next = vi.fn();

    validateId(req, {}, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 on invalid ID', () => {
    const req = { params: { id: 'x' }, method: 'GET', originalUrl: '/' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const error = { errors: [{ path: ['id'], message: 'Invalid' }] };

    IdParamSchema.parse.mockImplementation(() => {
      throw error;
    });

    validateId(req, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });
});
