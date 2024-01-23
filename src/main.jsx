import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import { Home, Login, Signup } from './pages/index.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'login',
        element:<Login/>
      },
      {
        path:'signup',
        element:<Signup/>
      },
      {
        path:'dashboard',
        element:<Home/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
