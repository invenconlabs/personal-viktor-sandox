import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './routes/home/home';
import { About } from './routes/about/about';
import { Root } from './routes/root';
import { ErrorPage } from './routes/error/ErrorPage';
import { ChartNavigation } from './routes/chart/ChartNavigation';
import { BarChart } from './routes/chart/BarChart';
import { LineChart } from './routes/chart/LineChart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'chart',
        element: <ChartNavigation />,
        children: [
          {
            path: 'bar',
            element: <BarChart />,
          },
          {
            path: 'line',
            element: <LineChart />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="bg-midnightExpress-600 text-midnightExpress-100 min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
