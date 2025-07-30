import xss from 'xss';

function sanitize(value) {
  if (typeof value === 'string') {
    return xss(value);
  } else if (Array.isArray(value)) {
    return value.map(sanitize);
  } else if (typeof value === 'object' && value !== null) {
    const sanitized = {};
    for (const key in value) {
      sanitized[key] = sanitize(value[key]);
    }
    return sanitized;
  }
  return value;
}

export const sanitizeInput = (req, _res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      req.body[key] = sanitize(req.body[key]);
    }
  }

  if (req.query && typeof req.query === 'object') {
    for (const key in req.query) {
      req.query[key] = sanitize(req.query[key]);
    }
  }

  if (req.params && typeof req.params === 'object') {
    for (const key in req.params) {
      req.params[key] = sanitize(req.params[key]);
    }
  }

  next();
};
