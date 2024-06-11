import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import HomeC from "../pages/Home/Child/HomeC";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";
import HeaderLayout from "../pages/layout/HeaderLayout.jsx";
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
import { elements } from "chart.js";
import LoanDetail from "../pages/Loan/Child/Detail.jsx";

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
    path: "/allowance-history",
    element: <HeaderLayout left="<" title="용돈 내역" right="" />,
    children: [
      {
        index: true,
        element: <AllowanceHistory />,
      },
    ],
  },
  {
    path: "/allowance-request",
    element: <HeaderLayout left="<" title="용돈 조르기" right="취소" />,
    children: [
      {
        index: true,
        element: <AllowanceRequest />,
      },
      {
        path: "create",
        index: true,
        element: <NewAllowanceRequest />,
      },
    ],
  },
  {
    path: "/mission",
    element: <HeaderLayout left="<" title="미션" right="" />,
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
        path: "history-null",
        element: <LoanHistory />,
      },
      {
        path: "history-exist",
        element: <LoanHistoryExist />,
      },
      {
        path: "detail",
        element: <LoanDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(MainRouter);

export default router;
