import { Toaster } from "react-hot-toast";
import MainMenu from "./menu/MainMenu";
const Header = () => {
  return (
    <section className="header shadow bg-white position-sticky z-3 top-0 w-100">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className="container-fluid">
        <MainMenu />
      </div>
    </section>
  );
};

export default Header;
