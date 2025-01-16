import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NewUser = () => {
  const location = useLocation();
  const email = location.state?.email; // Accede al email pasado como estado
  if (!email) {
    return <p>No se proporcionó un email.</p>;
  }

  // Estados para manejar los campos del formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el nombre no esté vacío
    if (!name.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    // Crear el objeto con los datos a enviar
    const userData = {
      name: name.trim(),
      email: email,
      accounts: []
    };

    try {
      // Hacer la solicitud POST a la API
      const response = await fetch('https://tu-api.com/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert('Usuario creado exitosamente');
        // Limpiar el formulario después de un envío exitoso
        setName('');
        setDescription('');
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al intentar crear el usuario');
    }
  };

  return (
    <div>
      <h2>Crear Nuevo Usuario</h2>
      {email ? (
        <p>Crear un nuevo usuario para el email: <strong>{email}</strong></p>
      ) : (
        <p>No se proporcionó un email.</p>
      )}

      {/* Formulario para crear un nuevo usuario */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción (opcional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default NewUser;