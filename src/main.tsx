import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ProductsPage from './pages/ProductsPage'

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { index: true, element: <ProductsPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
