import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
import ProductService from "../../../services/ProductService";
import ProductItem from "./ProductItem";
import Pagination from "../../../utils/Pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const location = useLocation();
  const [slugName, setSlugName] = useState([]);
  const itemPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [lengthPro, setLengthPro] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("q");
  useEffect(() => {
    setCurrentPage(1); // Reset current page to 1 when changing location
  }, [location]);

  useEffect(() => {
    (async () => {
      if (pathname === "/timkiem" && searchTerm.trim() !== "" && searchTerm.indexOf("/") === -1 && searchTerm.indexOf("\\") === -1) {
        const result = await ProductService.list_product_search_by_page(
          searchTerm,
          currentPage,
          itemPage
        );
        setProducts(result.products);
        const temp = await ProductService.list_product_search(searchTerm.trim());
        setLengthPro(temp.products);
        setTotalPages(Math.ceil(lengthPro.length / itemPage));
      } else if (pathname === "/tat-ca-san-pham") {
        const result = await ProductService.list(currentPage, itemPage);
        setProducts(result.products);
        const temp = await ProductService.get_list();
        setLengthPro(temp.products);
        setTotalPages(Math.ceil(lengthPro.length / itemPage));
      } else if (pathname.startsWith("/danh-muc/")) {
        try {
          const res = await CategoryService.get_name(slug);
          setSlugName(res.category);
          const result = await ProductService.list_product_category(
            slugName.id,
            currentPage,
            itemPage
          );
          setProducts(result.products);
          const temp = await ProductService.get_list_categoryAll(slugName.id);
          setLengthPro(temp.products);
          setTotalPages(Math.ceil(lengthPro.length / itemPage));
        } catch (error) {
          console.log("error", error);
        }
      } else if (pathname.startsWith("/thuong-hieu/")) {
        try {
          const res = await BrandService.get_name(slug);
          setSlugName(res.brand);
          const result = await ProductService.list_product_brand(
            slugName.id,
            currentPage,
            itemPage
          );
          setProducts(result.products);
          const temp = await ProductService.get_list_brandAll(slugName.id);
          setLengthPro(temp.products);
          setTotalPages(Math.ceil(lengthPro.length / itemPage));
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [location, slugName.id, currentPage, lengthPro.length, slug, searchTerm]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center my-3">
        {location.pathname === "/timkiem"
          ? `Kết quả tìm kiếm cho từ khóa: "${searchTerm}"`
          : location.pathname === "/tat-ca-san-pham"
          ? "Tất cả sản phẩm"
          : slugName.name}
      </h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mx-5">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="col">
              <ProductItem product={product} />
            </div>
          ))}
      </div>
      <div className="text-center my-3">
        {totalPages === 0 ? (
          <p className="fs-4 my-5">Không tìm thấy sản phẩm phù hợp !</p>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
