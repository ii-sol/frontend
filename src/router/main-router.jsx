import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";
import InsideLayout from "../pages/layout/InsideLayout";

// pages
import Home from "../pages/Home/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
// import Notification from "../pages/Notification/Notification";
import MyPage from "../pages/MyPage/MyPage";
import MemberManagement from "../pages/MyPage/MemberManagement";

import AllowanceManagement from "../pages/Allowance/Parent/AllowanceManagement.jsx";
import AllowanceRegistration from "../pages/Allowance/Parent/AllowanceRegistration.jsx";
import AllowanceHistoryP from "../pages/Allowance/Parent/AllowanceHistory.jsx";
import AllowanceRequest from "../pages/Allowance/Child/AllowanceRequest";
import NewAllowanceRequest from "../pages/Allowance/Child/NewAllowanceRequest";
import AllowanceRequestHistory from "../pages/Allowance/Child/AllowanceRequestHistory.jsx";
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
import AvailableInvest from "../pages/Investment/Child/AvailableInvest";
import Trading from "../pages/Investment/Child/Trading";
import Suggestion from "../pages/Investment/Child/Suggestion";
import Done from "../pages/Investment/Child/Done";
import ParentSelection from "../pages/Investment/Child/ParentSelection";
import StockList from "../pages/Investment/StockList";
import InvestHistory from "../pages/Investment/InvestHistory";
import SuggestionDetail from "../pages/Investment/Child/SuggestionDetail";

import Main from "../pages/Loan/Child/Main";
import FromWho from "../pages/Loan/Child/FromWho";
import Money from "../pages/Loan/Child/Money";
import Period from "../pages/Loan/Child/Period";
import Message from "../pages/Loan/Child/Message";
import Complete from "../pages/Loan/Child/Complete";
import LoanHistory from "../pages/Loan/Child/LoanHistory";
import LoanDetail from "../pages/Loan/Child/DetailRequest.jsx";
import LoanDetailOnGoing from "../pages/Loan/Child/DetailAccept.jsx";
import SelectAccount from "../pages/Account/SelectAccount.jsx";
import AccountMoney from "../pages/Account/Money.jsx";
import Send from "../pages/Account/Send.jsx";
import SendMoneyComplete from "../pages/Account/SendComplete.jsx";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "notification", element: <Notification /> },
      {
        path: "mypage",
        children: [
          { path: "", element: <MyPage /> },
          { path: "member", element: <MemberManagement /> },
        ],
      },
      {
        path: "allowance",
        children: [
          { path: "management", element: <AllowanceManagement /> },
          { path: "registration", element: <AllowanceRegistration /> },
          { path: "history", element: <AllowanceHistory /> },
          { path: "history-parent", element: <AllowanceHistoryP /> },
          {
            path: "irregular",
            children: [
              { path: "", element: <AllowanceRequest /> },
              { path: "create", element: <NewAllowanceRequest /> },
              { path: "history", element: <AllowanceRequestHistory /> },
            ],
          },
        ],
      },
      {
        path: "mission",
        children: [
          { path: "", element: <Mission /> },
          { path: "detail", element: <MissionDetail /> },
          { path: "history", element: <MissionHistory /> },
          { path: "create", element: <CreateMission /> },
          { path: "amount", element: <CreateMissionPrice /> },
          { path: "member", element: <CreateMissionMember /> },
          { path: "complete", element: <CreateMissionComplete /> },
          { path: "request/send/detail", element: <MissionSendDetail /> },
          { path: "request/request/detail", element: <MissionReceiveDetail /> },
        ],
      },
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
            path: "select",
            element: <SelectAccount />,
          },
          {
            path: "money",
            element: <AccountMoney />,
          },
          {
            path: "send",
            element: <Send />,
          },
          {
            path: "complete",
            element: <SendMoneyComplete />,
          },
        ],
      },
    ],
  },
]);

export default MainRouter;
