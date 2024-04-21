import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ProductService from "../../../services/ProductService";
import { Link, useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notResult, setNotResult] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const searchResultRef = useRef(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true); // Hiển thị danh sách kết quả khi nhập liệu
    setNotResult(""); // Xóa thông báo không có kết quả tìm kiếm
  };
  const handleFocus = () => {
    setShowResults(true); // Hiển thị danh sách kết quả khi click vào input
    setNotResult(""); // Xóa thông báo không có kết quả tìm kiếm
  };
  const handleSearchBtn = () => {
    if (searchTerm.trim() !== "") {
      setSearchTerm('');
      setNotResult(""); // Xóa thông báo không có kết quả tìm kiếm
      navigate(`/timkiem?q=${searchTerm.trim()}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSearchBtn();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm !== "") {
        try {
          const getSearchResult = new Promise(async (resolve, reject) => {
            const data = await ProductService.list_product_search(searchTerm);
            resolve(data);
          });
          const searchResultData = await getSearchResult;
          setSearchResult(searchResultData.products);
          setNotResult("No results found"); // Không có kết quả tìm kiếm
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResult(null);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target)
      ) {
        setShowResults(false); // Ẩn danh sách kết quả khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative" style={{ minWidth: "300px" , maxWidth: "500px"}}>
      <div className="">
      <button
          type="button"
          style={{borderColor: "transparent"}}
          onClick={handleSearchBtn}
          className="btn btn-outline-none rounded-0 rounded-start-3 position-absolute top-0 start-0"
        >
          <BsSearch />
        </button>
        <input
          className="form-control rounded-3"
          style={{paddingLeft: "44px"}}
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          aria-label="Search"
          value={searchTerm}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {showResults && (
        <div
          ref={searchResultRef}
          style={{ maxHeight: "378px" }}
          className="position-absolute top-100 end-0 start-0 overflow-y-auto shadow mt-1 bg-white"
        >
          {searchResult && searchResult.length > 0 ? (
            searchResult.map((product) => {
              return (
                <Link
                  to={`/san-pham/${product.slug}`}
                  className="d-flex justify-content-center align-items-center text-dark text-decoration-none border-dark-subtle border border-bottom-0"
                >
                  <div className="col-md-4 p-3">
                    <img
                      src={`${urlImage}products/${product.image}`}
                      alt="..."
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-8 p-0">
                    <p>{product.name}</p>
                    {product.pricesale === 0 ? (
                      <p>
                        <strong>{product.price}đ</strong>
                      </p>
                    ) : (
                      <p>
                        <strong>{product.pricesale}đ</strong>
                        <small className="ms-2 text-decoration-line-through text-secondary">
                          {product.price}đ
                        </small>
                      </p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p
              className={`p-3 m-0 text-center border-dark-subtle border ${
                notResult === "" ? "d-none" : "d-block"
              }`}
            >
              {notResult}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
