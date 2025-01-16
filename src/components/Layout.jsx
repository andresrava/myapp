import { Link, Outlet, useNavigate} from "react-router-dom";
import React , { useState, useEffect } from "react";
import { getCurrentUser } from 'aws-amplify/auth';
import axios from 'axios';


async function getCurrentUserEmail() {
  try {
    // Obtiene el usuario autenticado actual
    const { username, userId, signInDetails } = await getCurrentUser();

console.log("username", username);
console.log("user id", userId);
console.log("sign-in details", signInDetails);

    // Accede al email del usuario
    const userEmail = signInDetails.loginId;
    return userEmail;
  } catch (error) {
    console.error('Error al obtener el usuario autenticado:', error);
    return null;
  }
}

const buscarUsuarioPorEmail = async (email) => {
  const apiUrl = 'https://2jn4t45vda.execute-api.sa-east-1.amazonaws.com/users';
  console.log("El mail que mando es: ", email)
  try {
    const response = await axios.get(apiUrl, {
      params: { email }, // Envía el email como parámetro de consulta
      headers: {
        'Content-Type': 'application/json',
        // Agrega headers adicionales si es necesario
      },
    });

    return response.data.length > 0 ? response.data : [];
  } catch (error) {
    console.error('Error al consultar la API Gateway:', error);
    return [];
  }
};



function Layout({ signOut }) {
  const [usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState(null);

  React.useEffect(() => {
    getCurrentUserEmail()
      .then((email) => {
        if (email !== userEmail) {
          setUserEmail(email);
        }
      })
      .catch((error) => console.error('Error al obtener el email del usuario:', error));
  }, [userEmail]);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (userEmail) {
        const resultado = await buscarUsuarioPorEmail(userEmail);
        setUsuario(resultado);
  
        if (resultado.length === 0) {
          navigate('/NewUser', { state: { email: userEmail } });
        }
      }
    };
  
    fetchUsuario();
  }, [userEmail, navigate]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/accounts"}>Accounts</Link>
          </li>
          <li>
            <Link to={"/aboutUs"}>AboutUs</Link>
          </li>
          {userEmail && (
            <li>El mail del usuario es: {userEmail}</li>
          )}
          <button onClick={signOut} className="sign-out-button">
            Log Out
          </button>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;