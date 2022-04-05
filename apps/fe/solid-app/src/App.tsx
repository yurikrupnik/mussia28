import { Component, lazy } from "solid-js";
import { Routes, Route } from "solid-app-router";

import { Header } from "./components/Header";

const Login = lazy(() => import("./components/Login"));
const HomePage = lazy(() => import("./components/HomePage"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));

const App: Component = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
