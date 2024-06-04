import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import PlaceOrder from './pages/PlaceOrder';
import Appbar from './components/Appbar';

function App() {
  const currentUser = useRecoilValue(userAtom);
  return (
    <>
      <div>
        <Appbar />
        <Routes>
          <Route
            path='/signup'
            element={
              !currentUser || currentUser.error ? (
                <Signup />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
          <Route
            path='/login'
            element={
              !currentUser || currentUser.error ? (
                <Signin />
              ) : (
                <Navigate to={'/'} />
              )
            }
          />
          <Route
            path='/'
            element={
              currentUser && !currentUser.error ? (
                <Dashboard />
              ) : (
                <Navigate to={'/login'} />
              )
            }
          />
          <Route
            path='/placeOrder'
            element={
              currentUser && !currentUser.error ? (
                <PlaceOrder />
              ) : (
                <Navigate to={'/login'} />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
