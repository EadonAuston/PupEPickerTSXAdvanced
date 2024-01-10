import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FunctionalApp } from "./Functional/FunctionalApp.tsx";
import { Home } from "./Home.tsx";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Playground } from "./Playground.tsx";
import { DogDataProvider } from "./Providers/DogDataProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/functional",
    element: <FunctionalApp />,
  },
  // {
  //   path: "/class",
  //   element: <ClassApp />,
  // },
  {
    path: "/playground",
    element: <Playground />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DogDataProvider>
      <Toaster />
      <RouterProvider router={router} />
    </DogDataProvider>
  </React.StrictMode>
);
