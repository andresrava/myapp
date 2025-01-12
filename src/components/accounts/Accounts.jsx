

import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import Account from "./Account";

function Accounts() {
  // Estados para los arrays de "integrantes" y "acciones"
  const [integrantes, setIntegrantes] = useState([]);
  const [acciones, setAcciones] = useState([]);

  // Estados para los valores temporales de los inputs
  const [nuevoIntegrante, setNuevoIntegrante] = useState("");
  const [nuevaAccion, setNuevaAccion] = useState("");
  // const [nuevaKey, setNuevaKey] = useState("");

  // Función para agregar un nuevo integrante
  const agregarIntegrante = () => {
    if (nuevoIntegrante.trim() !== "") {
      setIntegrantes([...integrantes, nuevoIntegrante]);
      setNuevoIntegrante(""); // Limpiar el input
    }
  };

  // Función para agregar una nueva acción
  const agregarAccion = () => {
    if (nuevaAccion.trim() !== "") {
      setAcciones([...acciones, nuevaAccion]);
      setNuevaAccion(""); // Limpiar el input
    }
  };

  // Función para enviar los datos a la API
  const enviarDatos = () => {
    const datos = {
      integrantes,
      acciones,
    };

    console.log("Datos a enviar:", datos);

    // Aquí puedes hacer la llamada a la API usando fetch o axios
    // Ejemplo con fetch:
    fetch("https://2jn4t45vda.execute-api.sa-east-1.amazonaws.com/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);

      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Formulario con Arrays</h1>

      {/* Campo para agregar integrantes */}
      <Form.Group className="mb-3">
        <Form.Label>Integrantes</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Agregar integrante"
            value={nuevoIntegrante}
            onChange={(e) => setNuevoIntegrante(e.target.value)}
          />
          <Button variant="primary" onClick={agregarIntegrante} className="ms-2">
            Agregar
          </Button>
        </div>
      </Form.Group>

      {/* Mostrar la lista de integrantes */}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Integrantes</th>
          </tr>
        </thead>
        <tbody>
          {integrantes.map((integrante, index) => (
            <tr key={index}>
              <td>{integrante}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Campo para agregar acciones */}
      <Form.Group className="mb-3">
        <Form.Label>Acciones</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Agregar acción"
            value={nuevaAccion}
            onChange={(e) => setNuevaAccion(e.target.value)}
          />
          <Button variant="primary" onClick={agregarAccion} className="ms-2">
            Agregar
          </Button>
        </div>
      </Form.Group>

      {/* Mostrar la lista de acciones */}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {acciones.map((accion, index) => (
            <tr key={index}>
              <td>{accion}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón para enviar los datos */}
      <Button variant="success" onClick={enviarDatos}>
        Enviar Datos
      </Button>
    </div>
  );
}

export default Accounts;