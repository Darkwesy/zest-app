/* eslint-disable react/prop-types */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FiTerminal } from 'react-icons/fi';
import axios from 'axios';

export function Cadastro() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    details: '',
    email: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isoDate = new Date(formData.eventDate).toISOString();
      const response = await axios.post(
        'http://localhost:3333/events',
        { ...formData, date: isoDate },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const jsonData = response.data;
      console.log(jsonData);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (err) {
      if (err.response) {
        console.error('Erro na resposta:', err.response.data);
        setErrorMessage(err.response.data.message || 'Erro ao enviar os dados');
      } else if (err.request) {
        console.error('Erro na requisição:', err.request);
        setErrorMessage('Nenhuma resposta recebida do servidor');
      } else {
        console.error('Erro ao configurar a requisição:', err.message);
        setErrorMessage('Erro ao configurar a requisição');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <div className="w-11/12 sm:w-11/12 lg:w-1/2 h-auto sm:h-5/6 space-y-6 p-6 border rounded-lg shadow-md">
      {showAlert == true && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-5/6 max-w-md ${
            showAlert ? 'animate-fadeIn' : 'animate-fadeOut'
          }`}
        >
          <Alert>
            <FiTerminal className="h-4 w-4" />
            <AlertTitle>Notificação</AlertTitle>
            <AlertDescription>{errorMessage || 'Dados registrados no banco de dados com sucesso!'}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="space-y-2 text-start">
        <h1 className="font-bold text-2x  l sm:text-4xl">Cadastrar novo evento</h1>
      </div>
      <CadastroForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
}

function CadastroForm({ formData, handleChange, handleSubmit }) {
  return (
    <form className="space-y-4" name="formCadastro" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        <div className="space-y-2 px-4 sm:pr-4">
          <Label htmlFor="title">Título</Label>
          <Input className="bg-white" name="title" placeholder="Evento XXXXXXX" required value={formData.title} onChange={handleChange} />
        </div>
        <div className="space-y-2 px-4 sm:pr-4 sm:px-0">
          <Label htmlFor="details">Detalhes</Label>
          <Input className="bg-white" name="details" placeholder="Descrição do evento" value={formData.details} onChange={handleChange} />
        </div>
        <div className="space-y-2 px-4 sm:pr-4 sm:px-0">
          <Label htmlFor="eventDate">Data do Evento</Label>
          <Input className="bg-white" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} />
        </div>
        <div className="space-y-2 px-4 sm:pr-4 sm:px-0">
          <Label htmlFor="organizerEmail">E-mail contato</Label>
          <Input
            className="bg-white"
            name="email"
            type="email"
            placeholder="teste@teste.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-full sm:w-ful my-2" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
