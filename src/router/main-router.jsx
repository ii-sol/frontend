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
import Money from "../pages/Loan/Child/Money"; // Import the Money component
import Period from "../pages/Loan/Child/Period";
import Message from "../pages/Loan/Child/Message";
import Complete from "../pages/Loan/Child/Complete";
import HomeP from "../pages/Home/Parent/HomeP";
import LoanHistory from "../pages/Loan/Child/LoanHistoryNull";
import LoanHistoryExist from "../pages/Loan/Child/LoanHistoryExist";
import Main from "../pages/Loan/Child/Main";
import AllowanceRequest from "../pages/Allowance/Child/AllowanceRequest";
import AllowanceHistory from "../pages/Allowance/Child/AllowanceHistory";
import Mission from "../pages/Mission/Child/Mission";

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
    path: "/loan",
    element: <InsideLayout />,
    children: [
      {
        path: "main",
        element: <Main />,
      },
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
