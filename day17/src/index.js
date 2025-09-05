import React from "react";
//  JSX 문법 등 React의 핵심 기능을 사용하기 위해 React 라이브러리를 불러옵니다.

import ReactDOM from "react-dom/client";
// React 컴포넌트를 실제 웹페이지(HTML)에 연결하고 그려주는 역할을 하는 ReactDOM 라이브러리를 불러옵니다.
// React 18에는 서버에서도 React 컴포넌트를 미리 렌더링해서 보내주는 강력한 기능
import "./index.css"
import App from "../App"
import BoardsDetail from "./routes/boards/detail"
import BoardNews from "./routes/boards/new/BoardsNew"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './re';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';// react-router에서 교체 
import BoardsNew from "./routes/boards/new/BoardsNew";
const pagecontent = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards/new", element:  <BoardsNew /> },
  { path: "/boards/detail", element: <BoardsDetail /> }
]);

function Root() {
  return <RouterProvider router={router} />;
}





reportWebVitals();
/* 웹사이트 성능지표  */
reportWebVitals(console.log);
/* 개발자 도구 콘솔에서 성능 지표를 볼 수 있습니다.*/