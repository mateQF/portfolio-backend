import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
};
