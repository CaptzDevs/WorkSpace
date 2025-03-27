import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import Pricing from './Pages/Pricing';
import Layout from './Pages/Layout';
import Portfolio from './Pages/Portfolio';
import '@ant-design/v5-patch-for-react-19';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        index : true
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
    ]
  },

/*   {
    path: "*",
    element: <NotFound />,
  }, */
]);

createRoot(document.getElementById('root')).render(
 /*  <StrictMode> */
    <RouterProvider router={router} />
/*   </StrictMode>, */
)
