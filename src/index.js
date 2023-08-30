import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import Chart from './routes/Chart';
import App from "./App";
import About from "./routes/About";

const ROUTE_CHART = "chart";
const ROUTE_ABOUT = "about";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: ROUTE_CHART,
                element: <Chart />,
            },
            {
                path: ROUTE_ABOUT,
                element: <About />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);