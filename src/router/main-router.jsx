import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import Home from "../pages/Home/Child/Home";

const MainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
