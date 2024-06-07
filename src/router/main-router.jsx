import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import HomeC from "../pages/Home/Child/HomeC";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";
import FromWho from "../pages/Loan/Child/FromWho";
import Money from "../pages/Loan/Child/Money"; // Import the Money component
import HomeP from "../pages/Home/Parent/HomeP";

const MainRouter = [
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        index: true,
        element: <HomeP />,
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
      {
        path: "money",
        element: <Money />, // Remove the index: true property
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
