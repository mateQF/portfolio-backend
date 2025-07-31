import { describe, it, expect, vi } from 'vitest';

import { sanitizeInput } from '../../middlewares/sanitizeInput.js';

describe('sanitizeInput', () => {
  it('should sanitize body, query, and params', () => {
    const req = {
      body: { msg: '<script>alert(1)</script>' },
      query: { search: '<img src=x onerror=alert(1)>' },
      params: { id: '<b>123</b>' }
    };
    const next = vi.fn();

    sanitizeInput(req, {}, next);

    expect(req.body.msg).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(req.query.search).toBe('<img src>'); // corregido
    expect(req.params.id).toBe('<b>123</b>');
    expect(next).toHaveBeenCalled();
  });
});
