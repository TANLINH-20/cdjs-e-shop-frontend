import React from "react";
import Slide from "../slides/Slide";
import Post from "../blogs/PostHome";
import ProductNew from "../products/ProductNew";
import ProductSale from "../products/ProductSale";
import { FcFlashOn } from "react-icons/fc";

const Home = () => {
  return (
    <>
      <div className="mt-1">
        <Slide />
      </div>
      <div className="container-fluid mt-4">
        <div className="row py-3 justify-content-evenly px-5">
          <h1 className="py-2">Sản phẩm mới</h1>
          <ProductNew />
        </div>
        <div className="row py-3 justify-content-evenly px-5">
          <h1 className="py-2"><FcFlashOn />Flash Sale</h1>
          <ProductSale />
        </div>
        <div className="row py-3 justify-content-evenly px-5 bg-primary-subtle">
          <h1 className="py-2">Bài viết mới</h1>
          <Post />
        </div>
      </div>
    </>
  );
};

export default Home;
