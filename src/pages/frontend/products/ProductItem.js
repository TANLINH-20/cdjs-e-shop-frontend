import { RiShoppingCartLine } from "react-icons/ri";
import { urlImage } from "../../../config";
import { Link } from "react-router-dom";
const ProductItem = (props) => {
  const product = props.product;
  return (
    <>
      <div className="border mb-3">
        <Link to={`/san-pham/${product.slug}`}>
          <img
            src={`${urlImage}products/${product.image}`}
            alt={product.name}
            className="w-100"
          />
        </Link>
        <div className="m-2">
          <Link
            to={`/san-pham/${product.slug}`}
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            {product.pricesale === 0 ? (
              <div>
                <strong className="fs-5">{product.pricesale}đ</strong>
              </div>
            ) : (
              <div>
                <strong className="fs-5">{product.pricesale}đ</strong>
                <span className="text-decoration-line-through ms-1 text-body-tertiary">
                  <small>{product.price}đ</small>
                </span>
              </div>
            )}

            <button className="btn btn-dark">
              <RiShoppingCartLine />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
