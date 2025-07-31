import { describe, it, expect, vi, beforeEach } from 'vitest';
import nodemailer from 'nodemailer';

vi.mock('nodemailer', () => {
  return {
    default: {
      createTransport: vi.fn()
    }
  };
});

vi.mock('../../config/nodemailer.js', () => ({
  getMailOptions: vi.fn(),
  transportConfig: {}
}));

import { getMailOptions, transportConfig } from '../../config/nodemailer.js';
import { ContactController } from '../../controllers/contact.controller.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('ContactController', () => {
  let res, next, sendMail;

  beforeEach(() => {
    vi.clearAllMocks();
    res = mockRes();
    next = vi.fn();
    sendMail = vi.fn().mockResolvedValue({});
    nodemailer.createTransport.mockReturnValue({ sendMail });
  });

  it('should send email and return success', async () => {
    getMailOptions.mockReturnValue({ to: 'me@example.com' });

    const req = { body: { name: 'Mateo', email: 'mateo@test.com', message: 'Hola!' } };
    await ContactController.sendMessage(req, res, next);

    expect(nodemailer.createTransport).toHaveBeenCalledWith(transportConfig);
    expect(sendMail).toHaveBeenCalledWith({ to: 'me@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Message sent successfully' });
  });

  it('should call next with error on failure', async () => {
    const error = new Error('SMTP fail');
    sendMail.mockRejectedValue(error);

    getMailOptions.mockReturnValue({});
    const req = { body: {} };
    await ContactController.sendMessage(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
