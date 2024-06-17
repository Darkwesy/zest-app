import jwt from 'jsonwebtoken';

export function acessValidation(request, response, next) {
  const authHeader = request.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return response.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Acesso negado, necessário token de acesso.',
    });
  }

  try {
    const secret = process.env.SESSION_SECRET;
    const decoded = jwt.verify(token, secret);
    request.user = decoded;
    next();
  } catch (error) {
    response.status(400).json({
      success: false,
      statusCode: 400,
      msg: 'Token invalido',
    });
  }
}
