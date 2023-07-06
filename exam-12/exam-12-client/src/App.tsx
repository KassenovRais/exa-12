import React from 'react';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Login from './Container/Login/Login';
import MainPage from './Container/MainPage/MainPage';
import Register from './Container/Register/Register';
import UserPage from './Container/UserPage/UserPage';
import { useAppSelector } from './Store/hooks';
import { RootState } from './Store/store';

function App() {

  const user = useAppSelector<RootState>(state => state.auth)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<MainPage/>}/>
            <Route path='/register' element={(
              <ProtectedRoute isAllowed={!user.user} redirectPath='/' >
                <Register/>
              </ProtectedRoute>
            )} />
            <Route path='/login' element={(
              <ProtectedRoute isAllowed={!user.user} redirectPath='/' >
                <Login/>
              </ProtectedRoute>
            )} />
            <Route path='/user/:id/:user' element={<UserPage/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
