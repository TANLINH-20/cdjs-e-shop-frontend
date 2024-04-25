import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { CartProvider } from "../../utils/Cart";

const FrontendLayout = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
};

export default FrontendLayout;
