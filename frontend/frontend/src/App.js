import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import { useSelector } from 'react-redux';
import ProductGrid from './components/Product/ProductGrid';
import Layout from './components/Layout/Layout';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  const { isLoading } = useSelector((state) => state.auth);
  const [routes, setRoutes] = useState([]);
  const token = localStorage.getItem('accessToken')

  const publicRoutes = [
    {
      path: '/login',
      name: "login",
      element: <Login />,
      isPrivate: false
    }
  ]

  const privateRoutes = [
    {
      path: '/products',
      name: "products",
      element: <ProductGrid />,
      isPrivate: true
    },
  ]

  useEffect(() => {
    setRoutes(token ? privateRoutes : publicRoutes)
  }, [token])


  const FirstPage = useMemo(() => {
    return token ? <Layout><ProductGrid /></Layout> : <Login />
  }, [token])

  return <>
    <div className="App">
      <Routes>
        <>
          <Route path='/' element={FirstPage} />
          {!isLoading && routes && routes.length > 0 ?
            routes.map((route) => (
              <Route
                path={route.path}
                name={route.name}
                element={route.isPrivate ?
                  <>
                    <Suspense fallback={<CircularProgress />}>
                      <Layout>
                        {route.element}
                      </Layout>
                    </Suspense>
                  </>
                  :
                  <Navigate to='/' />
                }
              />
            )) : ""
          }
          <Route path='*' element={<Navigate to='/' />} />
        </>
      </Routes>
    </div>
    {!!isLoading && <CircularProgress />}
    <ToastContainer />
  </>
}

export default App;
