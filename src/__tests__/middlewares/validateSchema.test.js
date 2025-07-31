import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

import { validate } from '../../middlewares/validateSchema.js';

vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

const schema = z.object({ name: z.string() });

describe('validateSchema', () => {
  it('should pass valid input', () => {
    const req = { body: { name: 'Mateo' }, method: 'POST', originalUrl: '/' };
    const res = {};
    const next = vi.fn();

    validate(schema)(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 on invalid input', () => {
    const req = { body: {}, method: 'POST', originalUrl: '/' };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };

    validate(schema)(req, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
