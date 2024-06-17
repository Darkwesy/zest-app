import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('name').notEmpty().withMessage('O campo nome é obrigatório.'),
  body('password').notEmpty().withMessage('O campo senha é obrigatório.'),
  body('email').notEmpty().withMessage('O campo e-mail é obrigatório.'),
  body('email').isEmail().withMessage('O campo email deve ser um email válido.'),
  body('password').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),
  (request, response, next) => {
    const errors = validationResult(request);

    const formattedErrors = errors.array().map((error) => ({
      type: error.type,
      message: error.msg,
      field: error.path,
    }));

    if (!errors.isEmpty()) {
      return response.status(422).json({
        status: false,
        statusCode: 422,
        errors: formattedErrors,
      });
    }
    next();
  },
];
