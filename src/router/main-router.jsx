import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import Home from "../pages/Home/Child/Home";
import InsideLayout from "../pages/layout/InsideLayout";
import FromWho from "../pages/Loan/Child/FromWho";

const MainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/loan",
    element: <InsideLayout />,
    children: [
      {
        path: "who",
        index: true,
        element: <FromWho />,
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
