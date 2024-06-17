/* eslint-disable react/prop-types */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FiTerminal } from 'react-icons/fi';
import { dateFormater } from '@/utils/dateFormater';
import axios from 'axios';

export function FormUpdate({ event, onUpdateEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    eventDate: '',
    email: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        details: event.details,
        eventDate: dateFormater(event.date),
        email: event.email,
      });
    }
  }, [event]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event || !event.eventId) {
      setAlertMessage('Evento não selecionado ou ID do evento está faltando');
      setShowAlert(true);
      return;
    }
    try {
      const isoDate = new Date(formData.eventDate).toISOString();
      const response = await axios.patch(
        `http://localhost:3333/events/${event.eventId}/update`,
        { ...formData, date: isoDate },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const updatedEvent = response.data.data;
      console.log(updatedEvent);
      onUpdateEvent(updatedEvent);
      setAlertMessage('Evento atualizado com sucesso!');
      setShowAlert(true);

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

      setShowAlert(true);

      setFormData({
        title: '',
        details: '',
        eventDate: '',
        email: '',
      });

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className="w-full sm:w-11/12 lg:w-full h-auto sm:h-5/6 space-y-6 p-6 border rounded-lg shadow-md">
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
      <div className="space-y-2 text-start">
        <h1 className="font-bold text-2xl sm:text-4xl">Atualizar Cadastro</h1>
      </div>
      <CadastroForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

function CadastroForm({ formData, handleChange, handleSubmit }) {
  return (
    <form className="space-y-4" name="formCadastro" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        <div className="space-y-2 px-4 sm:pr-0">
          <Label htmlFor="title">Título</Label>
          <Input className="bg-white" name="title" placeholder="Evento XXXXXXX" required value={formData.title} onChange={handleChange} />
        </div>
        <div className="space-y-2 px-4 sm:pr-4 sm:px-0">
          <Label htmlFor="eventDate">Data do Evento</Label>
          <Input className="bg-white" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} />
        </div>
        <div className="space-y-2 px-4 sm:pr-4 sm:px-0">
          <Label htmlFor="details">Descrição do evento</Label>
          <Input className="bg-white" name="details" placeholder="Descrição do evento" value={formData.details} onChange={handleChange} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-full sm:w-full my-2" type="submit">
          Atualizar
        </Button>
      </div>
    </form>
  );
}
