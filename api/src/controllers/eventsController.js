import slugify from 'slugify';
import { prisma } from './../config/prisma.js';

export const getEvents = async (request, response) => {
  const inactives = request.query.inactives;
  try {
    let events = await prisma.event.findMany({ where: { active: true }, include: { category: true } });

    if (inactives === 'true') {
      events = await prisma.event.findMany({ include: { category: true } });
    }

    if (events.length === 0) {
      return response.status(404).json({
        success: false,
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
      include: { category: true },
    });

    if (!event) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: `Evento com id: ${id} não encontrado`,
      });
    }

    return response.status(200).json(event);
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

  try {
    const slug = slugify(bodyData.title, { lower: true, trim: true });

    const eventOrganizer = await prisma.user.findUnique({
      where: {
        email: bodyData.organizerEmail,
      },
    });

    const eventSameName = await prisma.event.findUnique({
      where: { slug },
    });

    if (eventSameName) {
      return response.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Evento com o mesmo nome já cadastrado.',
      });
    }

    if (!eventOrganizer) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Organizador não encontrado',
      });
    }

    const category = await prisma.category.findUnique({
      where: { name: bodyData.categoryName },
    });

    if (!category) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Categoria não encontrada',
      });
    }

    const newEvent = await prisma.event.create({
      data: {
        title: bodyData.title,
        date: new Date(bodyData.date),
        slug,
        details: bodyData.details,
        location: bodyData.location,
        maxParticipants: bodyData.maxParticipants,
        organizerEmail: bodyData.organizerEmail,
        eventLink: bodyData.eventLink,
        categoryId: category.categoryId,
        active: true,
      },
    });

    return response.status(201).json({
      success: true,
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
    });
  }
};

export const updateEvent = async (request, response) => {
  const { id } = request.params;
  const bodyData = request.body;

  if (!bodyData) {
    return response.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Dados para alteração não encontrados',
    });
  }

  try {
    const eventAlreadyExist = await prisma.event.findUnique({
      where: { eventId: parseInt(id) },
    });

    if (!eventAlreadyExist) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Nenhum registro encontrado',
      });
    }

    const newSlug = slugify(bodyData.title, { lower: true, trim: true });

    const category = await prisma.category.findUnique({
      where: { name: bodyData.categoryName },
    });

    if (!category) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Categoria não encontrada',
      });
    }

    const eventUpdated = await prisma.event.update({
      where: { eventId: parseInt(id) },
      data: {
        title: bodyData.title,
        date: new Date(bodyData.date),
        details: bodyData.details,
        slug: newSlug,
        location: bodyData.location,
        maxParticipants: bodyData.maxParticipants,
        organizerEmail: bodyData.organizerEmail,
        eventLink: bodyData.eventLink,
        categoryId: category.categoryId,
      },
    });

    return response.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Evento atualizado com sucesso!',
      data: eventUpdated,
    });
  } catch (error) {
    console.error(error);
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

    if (!eventAlreadyExist) {
      return response.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Evento não encontrado',
      });
    }

    await prisma.event.update({
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
