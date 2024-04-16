import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const BackendLayout = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <section className="main-content py-2 flex-grow-1">
          <div className="container-fluid">
            <Outlet />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default BackendLayout;
