/* eslint-disable react/prop-types */
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FiTerminal } from 'react-icons/fi';
import axios from 'axios';
import { useEffect } from 'react';
import apiURL from '@/utils/envConfig';

export function Cadastro() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    date: '',
    maxParticipants: 0,
    eventLink: '',
    location: '',
    organizerEmail: '',
    categoryName: '',
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
      console.log(formData);
      const isoDate = new Date(formData.date).toISOString();
      const response = await axios.post(
        'http://localhost:3333/events',
        { ...formData, date: isoDate, maxParticipants: parseInt(formData.maxParticipants) },
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/categories`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API response:', response.data);

        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchCategories();
  }, []);
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
      <CadastroForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
}

function CadastroForm({ formData, handleChange, handleSubmit, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    handleChange({ target: { name: 'categoryName', value: selectedCategory } });
  };
  return (
    <form className="space-y-4" name="formCadastro" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input className="bg-white" name="title" placeholder="Evento XXXXXXX" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Data do Evento</Label>
            <Input className="bg-white" name="date" type="date" value={formData.date} onChange={handleChange} />
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
              placeholder="Site do evento"
              value={formData.organizerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select className="bg-white" name="categoryName" value={selectedCategory} onValueChange={handleSelectChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Categorias" />
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
        <Button className="w-full sm:w-ful my-2" type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}
