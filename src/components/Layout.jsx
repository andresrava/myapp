import { Link, Outlet } from "react-router-dom";
import React from "react";
import { getCurrentUser } from 'aws-amplify/auth';

async function getCurrentUserEmail() {
  try {
    // Obtiene el usuario actual
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

function Layout({ signOut }) {
  const [userEmail, setUserEmail] = React.useState(null);

  React.useEffect(() => {
    getCurrentUserEmail().then((email) => setUserEmail(email));
  }, []);

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