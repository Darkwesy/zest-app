import { prisma } from '../config/prisma.js';

export const getCategories = async (request, response) => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Nenhum registro encontrado',
      });
    }

    return response.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};
