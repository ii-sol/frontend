import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

// pages
import Home from "../pages/Home/Child/Home";
import InsideLayout from "../pages/layout/InsideLayout";
import FromWho from "../pages/Loan/Child/FromWho";
import Money from "../pages/Loan/Child/Money"; // Import the Money component
import Period from "../pages/Loan/Child/Period";
import Message from "../pages/Loan/Child/Message";
import Complete from "../pages/Loan/Child/Complete";

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
      {
        path: "money",
        element: <Money />,
      },
      {
        path: "period",
        element: <Period />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "complete",
        element: <Complete />,
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
