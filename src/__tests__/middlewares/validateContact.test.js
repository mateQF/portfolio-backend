import { describe, it, expect, vi } from 'vitest';

import { validateContact } from '../../middlewares/validateContact.js';
import { ContactSchema } from '../../schemas/contact.schema.js';

vi.mock('../../schemas/contact.schema.js', () => ({
  ContactSchema: {
    parse: vi.fn()
  }
}));
vi.mock('../../utils/logger.js', () => ({
  default: { error: vi.fn() }
}));

describe('validateContact', () => {
  it('should call next on valid data', () => {
    const req = { body: { name: 'Mateo' } };
    const next = vi.fn();
    ContactSchema.parse.mockReturnValue(req.body);

    validateContact(req, {}, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 on validation error', () => {
    const req = { body: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const error = { errors: [{ path: ['email'], message: 'Required' }] };

    ContactSchema.parse.mockImplementation(() => {
      throw error;
    });

    validateContact(req, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });
});
