import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./layouts/frontend";
import BackendLayout from "./layouts/backend";
import AppRouter from "./router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontendLayout/>}>
          {AppRouter.FrontendRouter.map((route, index) =>{
          const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />;
          })}
        </Route>
        <Route path="/admin" element={<BackendLayout/>}>
          {AppRouter.BackendRouter.map((route, index) =>{
          const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
