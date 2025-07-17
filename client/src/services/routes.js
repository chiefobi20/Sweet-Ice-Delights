import App from "./components/App";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/Home";
import FlavorList from "../components/FlavorList";
import { Children } from "react";

const routes = [
  {
    path: "/",
    element: <App />,
    children: []
  },
  {
    path: "/flavors",
    element: <FlavorList />,
  },
];

export default routes;
