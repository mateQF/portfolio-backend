import { describe, it, expect } from 'vitest';
import request from 'supertest';

import app from '../../index.js';

describe('Public Routes', () => {
  it('GET /api/projects should return 200 and array', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.projects)).toBe(true);
  });

  it('GET /api/tech should return 200 and array', async () => {
    const res = await request(app).get('/api/tech');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/health should return 200 and ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
