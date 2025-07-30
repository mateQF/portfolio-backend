import nodemailer from 'nodemailer';

import { getMailOptions, transportConfig } from '../config/nodemailer.js';

export const ContactController = {
  sendMessage: async (req, res, next) => {
    try {
      const transporter = nodemailer.createTransport(transportConfig);
      await transporter.sendMail(getMailOptions(req.body));
      res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
      next(err);
    }
  }
};
