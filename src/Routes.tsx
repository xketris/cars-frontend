import React from 'react';
import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import App from './App';

import CarList from './components/CarList';
import CarDetails from './components/CarDetails';
import CarForm from './components/CarForm';
import NotFound from './components/NotFound';

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
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
            {
                path: 'not-found',
                element: <NotFound />
            },
            {
                path: '*',
                element: <Navigate replace to='/not-found' />
            }
        ]
    }
];

// Utworzenie routera [cite: 38]
export const router = createBrowserRouter(routes);