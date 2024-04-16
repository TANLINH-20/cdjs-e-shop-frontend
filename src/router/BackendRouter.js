import Dashboard from "../pages/backend/dashboard/Dashboard";
import {
  ProductCreate,
  ProductDetail,
  ProductEdit,
  ProductList,
} from "../pages/backend/product";
import {
  BannerCreate,
  BannerDetail,
  BannerEdit,
  BannerList,
} from "../pages/backend/banner";
import {
  PageList,
  PageCreate,
  PageEdit,
  PageDetail,
} from "../pages/backend/page";
import {
  PostCreate,
  PostList,
  PostEdit,
  PostDetail,
} from "../pages/backend/post";
import {
  UserCreate,
  UserDetail,
  UserEdit,
  UserList,
} from "../pages/backend/user";
import { BrandList, BrandEdit, BrandDetail } from "../pages/backend/brand";
import {
  CategoryList,
  CategoryEdit,
  CategoryDetail,
} from "../pages/backend/category";
import { TopicList, TopicEdit, TopicDetail } from "../pages/backend/topic";
import {
  CustomerCreate,
  CustomerDetail,
  CustomerEdit,
  CustomerList,
} from "../pages/backend/customer";
import { ContactList } from "../pages/backend/contact";
import { OrderDetail, OrderList } from "../pages/backend/order";
import { MenuCreate, MenuEdit, MenuList } from "../pages/backend/menu";
import ContactDetail from "../pages/backend/contact/ContactDetail";
import MenuDetail from "../pages/backend/menu/MenuDetail";
import NotFound from "../pages/NotFound";
const BackendRouter = [
  { path: "/admin", component: Dashboard },
  //Product
  { path: "/admin/product", component: ProductList },
  { path: "/admin/product/create", component: ProductCreate },
  { path: "/admin/product/edit/:id", component: ProductEdit },
  { path: "/admin/product/show/:id", component: ProductDetail },
  //Banner
  { path: "/admin/banner", component: BannerList },
  { path: "/admin/banner/create", component: BannerCreate },
  { path: "/admin/banner/edit/:id", component: BannerEdit },
  { path: "/admin/banner/show/:id", component: BannerDetail },
  //Page
  { path: "/admin/page", component: PageList },
  { path: "/admin/page/create", component: PageCreate },
  { path: "/admin/page/edit/:id", component: PageEdit },
  { path: "/admin/page/show/:id", component: PageDetail },
  //Contact
  { path: "/admin/contact", component: ContactList },
  { path: "/admin/contact/show/:id", component: ContactDetail },
  //Post
  { path: "/admin/post", component: PostList },
  { path: "/admin/post/create", component: PostCreate },
  { path: "/admin/post/edit/:id", component: PostEdit },
  { path: "/admin/post/show/:id", component: PostDetail },
  //User
  { path: "/admin/user", component: UserList },
  { path: "/admin/user/create", component: UserCreate },
  { path: "/admin/user/edit/:id", component: UserEdit },
  { path: "/admin/user/show/:id", component: UserDetail },
  //Customer
  { path: "/admin/customer", component: CustomerList },
  { path: "/admin/customer/create", component: CustomerCreate },
  { path: "/admin/customer/edit/:id", component: CustomerEdit },
  { path: "/admin/customer/show/:id", component: CustomerDetail },
  //Menu
  { path: "/admin/menu", component: MenuList },
  { path: "/admin/menu/create", component: MenuCreate },
  { path: "/admin/menu/edit/:id", component: MenuEdit },
  { path: "/admin/menu/show/:id", component: MenuDetail },
  //Brand
  { path: "/admin/brand", component: BrandList },
  { path: "/admin/brand/edit/:id", component: BrandEdit },
  { path: "/admin/brand/show/:id", component: BrandDetail },
  //Category
  { path: "/admin/category", component: CategoryList },
  { path: "/admin/category/edit/:id", component: CategoryEdit },
  { path: "/admin/category/show/:id", component: CategoryDetail },
  //Topic
  { path: "/admin/topic", component: TopicList },
  { path: "/admin/topic/edit/:id", component: TopicEdit },
  { path: "/admin/topic/show/:id", component: TopicDetail },
  //Order
  { path: "/admin/order", component: OrderList },
  { path: "/admin/order/show/:id", component: OrderDetail },
  //not found
  { path: "/admin/*/*", component: NotFound },
  { path: "/admin/*", component: NotFound },
];
export default BackendRouter;
