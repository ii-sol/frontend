import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";

//pages
import Home from "../pages/Home/Home";
import NavLayout from "../pages/layout/NavLayout";
import InsideLayout from "../pages/layout/InsideLayout";
import FromWho from "../pages/Loan/Child/FromWho";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import Money from "../pages/Loan/Child/Money";
import Period from "../pages/Loan/Child/Period";
import Message from "../pages/Loan/Child/Message";
import Complete from "../pages/Loan/Child/Complete";
import InvestMain from "../pages/Investment/InvestMain";
import AvailableInvest from "../pages/Investment/Child/AvailableInvest";
import LoanHistory from "../pages/Loan/Child/LoanHistoryNull";
import LoanHistoryExist from "../pages/Loan/Child/LoanHistoryExist";
import Main from "../pages/Loan/Child/Main";
import AllowanceRequest from "../pages/Allowance/Child/AllowanceRequest";
import NewAllowanceRequest from "../pages/Allowance/Child/NewAllowanceRequest";
import AllowanceHistory from "../pages/Allowance/Child/AllowanceHistory";
import Mission from "../pages/Mission/Child/Mission";
import MissionHistory from "../pages/Mission/Child/MissionHistory.jsx";
import MissionDetail from "../pages/Mission/Child/MissionDetail.jsx";
import CreateMission from "../pages/Mission/Child/CreateMission.jsx";
import CreateMissionPrice from "../pages/Mission/Child/CreateMissionPrice.jsx";
import CreateMissionMember from "../pages/Mission/Child/CreateMissionMember.jsx";
import CreateMissionComplete from "../pages/Mission/Child/CreateMissionComplete.jsx";
import MissionSendDetail from "../pages/Mission/Child/MissionSendDetail.jsx";
import MissionReceiveDetail from "../pages/Mission/Child/MissionReceiveDetail.jsx";

import InvestMain from "../pages/Investment/InvestMain";
import AvailableInvest from "../pages/Investment/AvailableInvest";
import Trading from "../pages/Investment/Trading";
import Suggestion from "../pages/Investment/Suggestion";
import Done from "../pages/Investment/Done";
import ParentSelection from "../pages/Investment/ParentSelection";
import StockList from "../pages/Investment/StockList";
import InvestHistory from "../pages/Investment/InvestHistory";
import SuggestionDetail from "../pages/Investment/SuggestionDetail";
import TradeHistory from "../pages/Investment/TradeHistory";

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
    element: <MainLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
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
            path: "history-parent",
            element: <AllowanceHistoryP />,
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
          { path: "", element: <InvestMain /> },
          { path: "start", element: <AvailableInvest /> },
          { path: "trading", element: <Trading /> },
          { path: "member", element: <ParentSelection /> },
          { path: "suggest", element: <Suggestion /> },
          { path: "send", element: <Done /> },
          { path: "stocklist", element: <StockList /> },
          { path: "history", element: <InvestHistory /> },
          { path: "history/:id", element: <SuggestionDetail /> },
          { path: "tradehistory", element: <TradeHistory /> },
        ],
      },
      {
        path: "/loan",
        children: [
          { path: "main", element: <Main /> },
          { path: "who", element: <FromWho /> },
          { path: "money", element: <Money /> },
          { path: "period", element: <Period /> },
          { path: "message", element: <Message /> },
          { path: "complete", element: <Complete /> },
          { path: "history", element: <LoanHistory /> },
          { path: "detail/:loanId", element: <LoanDetail /> },
          { path: "detailOnGoing/:loanId", element: <LoanDetailOnGoing /> },
        ],
      },
      {
        path: "/account",
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
            path: "member",
            element: <ParentSelection />,
          },
          {
            path: "suggest",
            element: <Suggestion />,
          },
          {
            path: "send",
            element: <Done />,
          },
          {
            path: "stocklist",
            element: <StockList />,
          },
          {
            path: "history",
            element: <InvestHistory />,
          },
          {
            path: "history/:id",
            element: <SuggestionDetail />,
          },
        ],
      },
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
