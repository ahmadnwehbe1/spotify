import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./Layout/Layout";
import Artists from "./pages/Artists/Artists";
import Albums from "./pages/Albums/Albums";

const App = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash.substr(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      const newUrl = `${url.origin}${url.pathname}${url.search}`;
      window.location.replace(newUrl);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Layout>
                <Artists />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/:id/albums"
            element={
              <Layout>
                <Albums />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
