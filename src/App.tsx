import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Layout from './components/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Tasks filter="all" />} />
            <Route path="/today" element={<Tasks filter="today" />} />
            <Route path="/important" element={<Tasks filter="important" />} />
            <Route path="/planned" element={<Tasks filter="planned" />} />
            <Route path="/assigned" element={<Tasks filter="assigned" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;