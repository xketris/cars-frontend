import React from 'react';
import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import App from './App';

import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import CarForm from './components/CarForm';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth'; // <--- Import Guarda

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            // --- ŚCIEŻKI PUBLICZNE (Dostępne dla każdego) ---
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'not-found',
                element: <NotFound />
            },
            
            // --- ŚCIEŻKI CHRONIONE (Wymagają logowania) ---
            {
                element: <RequireAuth />, // Wszystko wewnątrz tego elementu jest chronione
                children: [
                    {
                        path: 'cars',
                        element: <CarList />
                    },
                    {
                        path: 'cars/:id',
                        element: <CarDetails />
                    },
                    {
                        path: 'edit/:id',
                        element: <CarForm />
                    },
                    // Przekierowanie ze strony głównej "/" na "/cars" (tylko dla zalogowanych)
                    {
                        path: '/', 
                        element: <Navigate replace to="/cars" />
                    }
                ]
            },

            // Wildcard
            {
                path: '*',
                element: <Navigate replace to='/not-found' />
            }
        ]
    }
];

export const router = createBrowserRouter(routes);