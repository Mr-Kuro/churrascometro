import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Results } from "./containers/results/Results.tsx";
import { Home } from "./containers/home/Home.tsx";
import { FormData } from "./containers/form/FormData.tsx";
import { LinkedButton } from "./components/LinkedButton.tsx";

const componentDeInicio = () => {
  const data = localStorage.getItem("data");
  return data ? <Home /> : <FormData />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: componentDeInicio(),
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/settings",
        element: <FormData />,
      },
    ],
    errorElement: (
      <div>
        <h1 className="errorPage">
          404
          <br />
          Page not found
        </h1>
        <div style={{ textAlign: "center"}}>
          <LinkedButton title="Voltar" path="/" />
        </div>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
