import { body, validationResult } from 'express-validator';

export const validateEventCreation = [
  body('title').isString().notEmpty().withMessage('Título não encontrado.'),
  body('date').isISO8601().withMessage('Formato de data invalido.'),
  body('details').optional().isString().withMessage('Details deve ser uma string'),
  body('location').optional().isString().withMessage('Localização deve ser uma string'),
  body('maxParticipants').optional().isInt({ gt: 0 }).withMessage('Máximo de participantes deve ser um inteiro positivo.'),
  body('organizerEmail').isEmail().withMessage('O email de organizador deve ser um e-mail valido.'),
  body('categoryName').isString().notEmpty().withMessage('Categoria deve ser uma string.'),
  body('eventLink').isString().isURL().notEmpty().withMessage('URL Invalida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
