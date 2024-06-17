import slugify from 'slugify';
import { prisma } from './../config/prisma.js';

export const getEvents = async (request, response) => {
  const { email } = request.body;
  const inactives = request.query.inactives;
  try {
    let events = await prisma.event.findMany({ where: { active: true } });

    if (inactives === 'true') {
      const query = await prisma.event.findMany();
      events = query;
    } else {
    }

    if (events.length === 0) {
      return response.status(404).json({
        sucess: false,
        statusCode: 404,
        message: 'Nenhum registro encontrado',
      });
    }

    return response.status(200).json(events);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};

export const getEventById = async (request, response) => {
  const { id } = request.params;
  try {
    const event = await prisma.event.findUnique({
      where: { eventId: parseInt(id) },
    });

    if (!event || event.length === 0) {
      return response.status(404).json({
        sucess: false,
        statusCode: 404,
        message: `Evento com id: ${id} não encontrado`,
      });
    }

    return response.status(200).json({
      event,
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
export const createEvent = async (request, response) => {
  const bodyData = request.body;

  if (!bodyData) {
    return response.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Campos em branco',
    });
  }

  try {
    const slug = slugify(bodyData.title, { lower: true, trim: true });

    const eventOrganizer = await prisma.user.findUnique({
      where: {
        email: bodyData.email,
      },
    });

    const eventSameName = await prisma.event.findUnique({
      where: { slug },
    });

    if (eventSameName) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Evento com o mesmo nome ja cadastrado.',
      });
    }

    if (!eventOrganizer) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Organizador não encontrado',
      });
    }

    const newEvent = await prisma.event.create({
      data: {
        title: bodyData.title,
        date: bodyData.date,
        slug,
        details: bodyData.details,
        organizerId: eventOrganizer.userId,
      },
    });

    await prisma.userEvent.create({
      data: {
        userId: eventOrganizer.userId,
        eventId: newEvent.eventId,
      },
    });

    return response.status(201).json({
      sucess: true,
      statusCode: 201,
      data: {
        slug: newEvent.slug,
        eventId: newEvent.eventId,
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
      error: error,
    });
  }
};
export const updateEvent = async (request, response) => {
  const { id } = request.params;
  const bodyData = request.body;

  console.log('ID do evento recebido:', id);
  console.log('Dados recebidos para atualização:', bodyData);

  if (!bodyData) {
    return response.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Dados para alteração não encontrados',
    });
  }

  try {
    const eventAlreadyExist = await prisma.event.findUnique({
      where: { eventId: parseInt(id) },
    });

    if (!eventAlreadyExist || eventAlreadyExist.length === 0) {
      return response.status(404).json({
        sucess: false,
        statusCode: 404,
        message: 'Nenhum registro encontrado',
      });
    }

    const newSlug = slugify(bodyData.title);

    console.log('Slug gerado:', newSlug);

    const eventUpdated = await prisma.event.update({
      where: { eventId: parseInt(id) },
      data: {
        title: bodyData.title,
        date: bodyData.date,
        details: bodyData.details,
        slug: newSlug,
      },
    });

    console.log('Evento atualizado:', eventUpdated);

    return response.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Evento atualizado com sucesso!',
      data: eventUpdated,
    });
  } catch (error) {
    console.error('Erro durante a atualização do evento:', error);
    return response.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Erro interno do servidor.',
    });
  }
};
export const inactiveEvent = async (request, response) => {
  const { id } = request.params;

  try {
    const eventAlreadyExist = await prisma.event.findUnique({
      where: { eventId: parseInt(id) },
    });

    if (!eventAlreadyExist || eventAlreadyExist.length === 0) {
      return response.status(404).json({
        sucess: false,
        statusCode: 404,
        message: 'Evento não encontrado',
      });
    }

    const eventUpdated = await prisma.event.update({
      where: { eventId: parseInt(id) },
      data: {
        active: false,
      },
    });

    return response.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Evento desativado com sucesso.',
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
