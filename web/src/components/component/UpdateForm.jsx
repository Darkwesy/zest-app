/* eslint-disable react/prop-types */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FiTerminal } from 'react-icons/fi';
import { dateFormater } from '@/utils/dateFormater';
import axios from 'axios';
import apiURL from '@/utils/envConfig';

export function FormUpdate({ event, onUpdateEvent }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    date: '',
    maxParticipants: 0,
    categoryName: '',
    eventLink: '',
    location: '',
    organizerEmail: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        details: event.details || '',
        date: dateFormater(event.date) || '',
        organizerEmail: event.organizerEmail || '',
        categoryName: event.category?.name || '',
        maxParticipants: event.maxParticipants || 0,
        eventLink: event.eventLink || '',
        location: event.location || '',
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
      const isoDate = new Date(formData.date).toISOString();
      const response = await axios.patch(
        `http://localhost:3333/events/${event.eventId}`,
        { ...formData, date: isoDate, maxParticipants: parseInt(formData.maxParticipants) },
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
        date: '',
        maxParticipants: 0,
        categoryName: '',
        eventLink: '',
        location: '',
      });

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/categories`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchCategories();
  }, []);

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
      <CadastroForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} categories={categories} />
    </div>
  );
}

function CadastroForm({ formData, handleChange, handleSubmit, categories }) {
  const handleSelectChange = (selectedCategory) => {
    handleChange({ target: { name: 'categoryName', value: selectedCategory } });
  };

  return (
    <form className="space-y-4" name="formCadastro" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input className="bg-white" name="title" placeholder="Evento XXXXXXX" required value={formData.title} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Data do Evento</Label>
            <Input className="bg-white" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="details">Descrição do evento</Label>
            <Input
              className="bg-white"
              name="details"
              placeholder="Descrição do evento"
              value={formData.details}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="space-y-2">
            <Label htmlFor="eventLink">Link do evento</Label>
            <Input
              className="bg-white"
              name="eventLink"
              placeholder="Site do evento"
              value={formData.eventLink}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Número máximo de participantes</Label>
            <Input
              type="number"
              className="bg-white"
              name="maxParticipants"
              placeholder="Número máximo de participantes"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              className="bg-white"
              name="location"
              placeholder="Localização do evento"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="space-y-2">
            <Label htmlFor="organizerEmail">E-mail Organizador</Label>
            <Input
              className="bg-white"
              name="organizerEmail"
              placeholder="E-mail do organizador"
              value={formData.organizerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select className="bg-white" name="categoryName" value={formData.categoryName} onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue>{formData.categoryName || 'Selecione uma categoria'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem value={category.name} key={category.categoryId}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
