// Tela de Update
import { useEffect, useState } from 'react';
import axios from 'axios';
import { EventCard } from '@/components/component/event-card';
import { FormUpdate } from '../components/component/UpdateForm';
import { Alert } from '@/components/ui/alert';
import { FiTerminal } from 'react-icons/fi';
import { AlertTitle } from '@/components/ui/alert';
import { AlertDescription } from '@/components/ui/alert';
import apiURL from '@/utils/envConfig';

export const EventUpdateScreen = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiURL}/events`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prevEvents) => prevEvents.map((event) => (event.eventId === updatedEvent.eventId ? updatedEvent : event)));
    setSelectedEvent(updatedEvent);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`${apiURL}/events/${eventId}/delete`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setEvents(events.filter((event) => event.eventId !== eventId));

      setShowAlert(true);
      setAlertMessage('Evento deletado com sucesso!');

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (err) {
      if (err.response) {
        console.error('Erro na resposta:', err.response.data);
        setAlertMessage(err.response.data.message || 'Erro ao enviar os dados');
      } else if (err.request) {
        console.error('Erro na requisição:', err.request);
        setAlertMessage('Nenhuma resposta recebida do servidor');
      } else {
        console.error('Erro ao configurar a requisição:', err.message);
        setAlertMessage('Erro ao configurar a requisição');
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-full gap-6 justify-center items-start w-full mx-auto p-4">
      {showAlert && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-5/6 max-w-md ${
            showAlert ? 'animate-fadeIn' : 'animate-fadeOut'
          }`}
        >
          <Alert>
            <FiTerminal className="h-4 w-4" />
            <AlertTitle>Notificação</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="flex justify-center items-center w-full sm:w-1/2">
        <FormUpdate event={selectedEvent} onUpdateEvent={handleUpdateEvent} />
      </div>
      {events.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {events.map((event) => (
            <div className="flex justify-center items-center" key={event.eventId}>
              <EventCard
                title={event.title}
                date={event.date}
                details={event.details}
                buttonText={'Atualizar Evento'}
                onClick={() => handleSelectEvent(event)}
                onDelete={() => handleDeleteEvent(event.eventId)}
                deleteButton={true}
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
