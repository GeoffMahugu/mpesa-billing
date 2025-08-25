class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class ForbiddenError extends ExtendableError {
  constructor(m = 'Forbidden') {
    super(m);
  }
}

export class ValidationError extends ExtendableError {
  constructor(m = 'Validation Error') {
    super(m);
  }
}

export class AuthError extends ExtendableError {
  constructor(m = 'Authentication Error') {
    super(m);
  }
}

export class NotFoundError extends ExtendableError {
  constructor(m = 'Not Found') {
    super(m);
  }
}
