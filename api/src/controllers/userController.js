import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';

export const registerUser = async (request, response) => {
  const { name, email, password } = request.body;

  const emailAlreadyRegister = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailAlreadyRegister) {
    return response.status(400).json({
      success: false,
      statusCode: 400,
      message: 'E-mail já cadastrado.',
    });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        displayName: name,
      },
    });

    if (user) {
      return response.status(201).json({
        success: true,
        statusCode: 201,
        message: 'usuário registrado com sucesso!',
        user: user.id,
      });
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
      errorCode: error,
    });
  }
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return response.status(404).json({
      success: false,
      statusCode: 404,
      message: 'E-mail não encontrado',
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return response.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Senha incorreta',
    });
  }

  try {
    const secret = process.env.SESSION_SECRET;
    const token = jwt.sign(
      {
        id: user.uuid,
        email: user.email,
      },
      secret,
      { expiresIn: '30d' }
    );

    return response.status(200).json({
      success: true,
      statusCode: 200,
      token: token,
      message: 'Usuário autenticado com sucesso!',
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};

export const userEvents = async (request, response) => {
  const { id } = request.params;
  console.log(id);

  if (!id) {
    return response.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Id não encontrato',
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: id,
      },
      include: {
        userEvents: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!user || user.userEvents.length === 0) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Nenhum evento encontrado para este usuário',
      });
    }

    const events = user.userEvents.map((userEvent) => userEvent.event);

    return response.status(200).json({
      sucess: true,
      statusCode: 200,
      data: {
        events,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};

export const allUsers = async (request, response) => {
  try {
    const users = await prisma.user.findMany();

    return response.status(200).json({
      sucess: true,
      statusCode: 200,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};
