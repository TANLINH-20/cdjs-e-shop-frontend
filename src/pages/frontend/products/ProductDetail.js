import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import ProductService from "../../../services/ProductService";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";
import { useCart } from "../../../utils/Cart";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [productCurrent, setProductCurrent] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await ProductService.detail(slug, 4);
      setProductCurrent(res.product);
      setProducts(res.products);
      setQuantity(1);
    })();
  }, [slug]);

  const handleAddToCart = () => {
    addToCart({
      id: productCurrent.id,
      name: productCurrent.name,
      price: productCurrent.pricesale,
      image: productCurrent.image,
      qty: quantity,
    });
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row mx-3">
        <div className="col-md-5 p-0">
          <img
            className="w-100"
            src={`${urlImage}products/${productCurrent.image}`}
            alt={productCurrent.name}
          />
        </div>
        <div className="col-md mt-4 ms-4">
          <h1>{productCurrent.name}</h1>
          <div className="my-3">
            <strong className="fs-3">{productCurrent.pricesale}đ</strong>
            {productCurrent.price > 0 && (
              <span className="text-decoration-line-through ms-1 text-body-tertiary">
                <small>{productCurrent.price}đ</small>
              </span>
            )}
          </div>
          <p className="fs-4">
            Chi tiết sản phẩm:
            <span
              className="fs-6"
              dangerouslySetInnerHTML={{ __html: productCurrent.detail }}
            ></span>
          </p>
          <div>
            <button
              className="out-line-dark bg-white rounded-3 px-4 py-1"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="mx-3">{quantity}</span>
            <button
              className="out-line-dark bg-white rounded-3 px-4 py-1"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <div className="my-3">
          <button
                className={`btn btn-outline-primary me-2`}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
          </div>
        </div>
      </div>
      <div className="mx-3">
        <h1 className="my-3">Sản phẩm khác</h1>
        <div className="row">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <div key={product.id} className="col-md-3 col-sm-6">
                <ProductItem product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
