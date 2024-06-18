import { useState } from 'react';
import { EventCard } from '../components/component/event-card';
import { useEffect } from 'react';
import axios from 'axios';
import apiURL from '@/utils/envConfig';

export const EventsScreen = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiURL}/events`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API response:', response.data);

        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
          {events.map((event) => (
            <div className="flex justify-center items-center" key={event.eventId}>
              <EventCard
                title={event.title}
                date={event.date}
                details={event.details}
                description={event.details}
                location={event.location}
                eventLink={event.eventLink}
                maxParticipants={event.maxParticipants}
                category={event.category.name}
                buttonText={'Acessar Evento'}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Que pena, nenhum evento disponível.</p>
      )}
    </div>
  );
};
