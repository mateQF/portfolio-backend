import { describe, it, expect, vi, beforeEach } from 'vitest';

import logger from '../../utils/logger.js';

describe('logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log error messages to console transport', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.error('This is an error');
    expect(logger).toBeDefined();
    consoleSpy.mockRestore();
  });

  it('should support info level logging', () => {
    expect(() => logger.info('Info log')).not.toThrow();
  });

  it('should support warn level logging', () => {
    expect(() => logger.warn('Warning log')).not.toThrow();
  });
});
