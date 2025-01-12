import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom'

function HomeMenu() {
  const navigate = useNavigate();
  // Funciones que se ejecutarán al hacer clic en cada botón
  // const handleCreateAccount = () => {
  //   alert('Crear una cuenta');
  //   // Aquí puedes agregar la lógica para crear una cuenta
  // };

  const handleLoginWithCode = () => {
    alert('Ingresar a una cuenta con un código');
    // Aquí puedes agregar la lógica para ingresar con un código
  };

  const handleSettings = () => {
    alert('Ajustes');
    // Aquí puedes agregar la lógica para abrir los ajustes
  };
  return (
    <ButtonGroup aria-label="Basic example">
      <Button variant="secondary" onClick={() => navigate('/accounts')}>Crea una cuenta</Button>
      <Button variant="secondary" onClick={handleLoginWithCode}>Ingresa a una cuenta con un código</Button>
      <Button variant="secondary" onClick={handleSettings}>Ajustes</Button>
    </ButtonGroup>
  );
}

export default HomeMenu;