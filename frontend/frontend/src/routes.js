import React from 'react';

const Login = React.lazy(() => import('./components/Auth/Login'));
const ProductGrid = React.lazy(() => import('./components/Product/ProductGrid'));

export const publicRoutes = [
    {
        path: '/login',
        name: "login",
        element: <Login />,
        isPrivate: false
    }
]

export const privateRoutes = [
    {
        path: '/products',
        name: "products",
        element: <ProductGrid />,
        isPrivate: true
    },
]
