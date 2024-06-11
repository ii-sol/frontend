import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import HomeC from "../pages/Home/Child/HomeC";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";
import FromWho from "../pages/Loan/Child/FromWho";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Money from "../pages/Loan/Child/Money";
import Period from "../pages/Loan/Child/Period";
import Message from "../pages/Loan/Child/Message";
import Complete from "../pages/Loan/Child/Complete";
import HomeP from "../pages/Home/Parent/HomeP";
import InvestMain from "../pages/Investment/InvestMain";
import AvailableInvest from "../pages/Investment/Child/AvailableInvest";
import LoanHistory from "../pages/Loan/Child/LoanHistoryNull";
import LoanHistoryExist from "../pages/Loan/Child/LoanHistoryExist";
import Main from "../pages/Loan/Child/Main";
import AllowanceRequest from "../pages/Allowance/Child/AllowanceRequest";
import NewAllowanceRequest from "../pages/Allowance/Child/NewAllowanceRequest";
import AllowanceHistory from "../pages/Allowance/Child/AllowanceHistory";
import Mission from "../pages/Mission/Child/Mission";
import Trading from "../pages/Investment/Child/Trading";
import Suggestion from "../pages/Investment/Child/Suggestion";
import AllowanceRequestHistory from "../pages/Allowance/Child/AllowanceRequestHistory.jsx";
import AllowanceManagement from "../pages/Allowance/Parent/AllowanceManagement.jsx";
import AllowanceRegistration from "../pages/Allowance/Parent/AllowanceRegistration.jsx";

const MainRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "signup",
        index: true,
        element: <Signup />,
      },
      {
        path: "login",
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <NavLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomeP />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "allowance",
        children: [
          {
            path: "management",
            element: <AllowanceManagement />,
          },
          {
            path: "registration",
            element: <AllowanceRegistration />,
          },
          {
            path: "history",
            element: <AllowanceHistory />,
          },
          {
            path: "irregular",
            children: [
              {
                path: "",
                element: <AllowanceRequest />,
              },
              {
                path: "create",
                element: <NewAllowanceRequest />,
              },
              {
                path: "history",
                element: <AllowanceRequestHistory />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/mission",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Mission />,
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "invest",
        children: [
          {
            path: "",
            element: <InvestMain />,
          },
          {
            path: "start",
            element: <AvailableInvest />,
          },
          {
            path: "trading",
            element: <Trading />,
          },
          {
            path: "suggest",
            element: <Suggestion />,
          },
        ],
      },
      { path: "/loan", element: <FromWho />, children: [] },
    ],
  },

  {
    path: "/loan/main",
    element: <Main />,
  },
  {
    path: "/loan",
    element: <InsideLayout service={"대출"} />,
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
      {
        path: "history",
        element: <LoanHistory />,
      },
      {
        path: "historyexist",
        element: <LoanHistoryExist />,
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
