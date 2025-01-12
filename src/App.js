import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import Home from './components/home/Home'
import Layout from './components/Layout'
import NoPage from './components/NoPage'

// import Accounts from './components/Accounts'
import Accounts from './components/accounts/Accounts'



import AboutUs from './components/AboutUs'
import {BrowserRouter, Routes, Route} from "react-router-dom"


Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <Authenticator>
          {({ signOut }) => (
            <div className="auth-container">
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout signOut={signOut}/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/aboutUs' element={<AboutUs/>}/>
                    <Route path='/accounts' element={<Accounts/>}/>
                    <Route path='*' element={<NoPage/>}/>
                  </Route>
                </Routes>
              </BrowserRouter>
            </div>)}
          </Authenticator>
        </div>
      </div>
  );
}
export default App