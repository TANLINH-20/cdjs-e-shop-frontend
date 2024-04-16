import Home from '../pages/frontend/home';
import ProductDetail from '../pages/frontend/products/ProductDetail';
import ProductList from '../pages/frontend/products/ProductList';
import CartClient from '../pages/frontend/cart/CartClient';
import Contact from '../pages/frontend/contact';
import NotFound from '../pages/NotFound';
import PageDetail from '../pages/frontend/about/PageDetail';
import PostDetail from '../pages/frontend/blogs/PostDetail';
import PostList from '../pages/frontend/blogs/PostList';
import CheckOut from '../pages/frontend/cart/CheckOut';
const FrontendRouter = [
    {path:"/",component: Home},
    {path:"/tat-ca-san-pham",component:ProductList},
    {path:"/tat-ca-bai-viet",component:PostList},
    {path:"/thuong-hieu/:slug",component:ProductList},
    {path:"/danh-muc/:slug",component:ProductList},
    {path:"/timkiem",component:ProductList},
    {path:"/san-pham/:slug",component:ProductDetail},
    {path:"/gio-hang",component:CartClient},
    {path:"/lien-he",component:Contact},
    {path:"/about/:slug",component:PageDetail},
    {path:"/bai-viet/:slug",component:PostDetail},
    {path:"/chu-de/:slug",component:PostList},
    {path:"/thanh-toan",component:CheckOut},
    {path:"/*/*",component:NotFound},
    {path:"/*",component:NotFound}
];
export default FrontendRouter;