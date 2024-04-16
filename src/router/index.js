import BackendRouter from "./BackendRouter";
import FrontendRouter from "./FrontendRouter";
import httpAxios from "./httpAxios";


const AppRouter ={
    FrontendRouter:FrontendRouter,
    BackendRouter: BackendRouter,
    httpAxios:httpAxios,
}
export default AppRouter;