import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import ProductService from "../../../services/ProductService";
import { toast } from "react-hot-toast";
import CategoryService from "../../../services/CategoryService";
import BrandService from "../../../services/BrandService";
const ProductEdit = () => {
  const { id } = useParams();
  console.log(id);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    detail: "",
    description: "",
    brand_id: "",
    category_id: "",
    image: "",
    price: "100000",
    pricesale: "0",
    qty: "1",
    status: "1",
  });

  useEffect(() => {
    (async () => {

      const result = await ProductService.show(id);
      if (result.status) {
        setData(result.product);
      } else {
        toast.error("Không tìm thấy sản phẩm");
      }

      const listcate = await CategoryService.get_list();
      setCategory(listcate.category);
      const listBrand = await BrandService.get_list();
      setBrand(listBrand.brand);
 
    })();
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const image = document.querySelector("#image");
    const product = new FormData();
    product.append("name", data.name);
    product.append("detail", data.detail);
    product.append("description", data.description);
    product.append("brand_id", data.brand_id);
    product.append("category_id", data.category_id);
    product.append("price", data.price);
    product.append("pricesale", data.pricesale);
    product.append("qty", data.qty);
    product.append("status", data.status);
    product.append("image", image.files.length === 0 ? data.image : image.files[0]);
    //Service them
    (async () => {
      const result = await ProductService.update(id, product);
      if (result.status === true) {
        toast.success("Cập nhật thành công");
        setData({
          name: "",
          detail: "",
          image: "",
          description: "",
          brand_id: "",
          category_id: "",
          price: "100000",
          pricesale: "0",
          qty: "1",
          status: "1",
        });
        image.value = null;
        navigate("/admin/product"); //chuyen trang
      } else {
        console.log(data);
        toast.error("Cập nhật thất bại");
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-6">
              <strong className="fs-4">Thêm sản phẩm mới</strong>
            </div>
            <div className="col-6 text-end">
              <Link
                to="/admin/product"
                className="btn btn-sm btn-info text-white me-2"
              >
                <FaArrowLeft className="me-1" />
                Về danh sách
              </Link>

              <button type="submit" className="btn btn-sm btn-success">
                <FaSave className="me-1" />
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  <strong>Tên sản phẩm (*)</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDetail" className="form-label">
                  <strong>Chi tiết (*)</strong>
                </label>
                <textarea
                  rows={10}
                  id="inputDetail"
                  className="form-control"
                  name="detail"
                  value={data.detail}
                  onChange={handleChange}
                  placeholder="Nhập chi tiết sản phẩm"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="inputDes" className="form-label">
                  <strong>Mô tả (*)</strong>
                </label>
                <textarea
                  rows={6}
                  id="inputDes"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Nhập mô tả"
                ></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  <strong>Thương hiệu (*)</strong>
                </label>
                <select
                  className="form-select"
                  name="brand_id"
                  value={data.brand_id}
                  onChange={handleChange}
                >
                  <option>Chọn thương hiệu</option>
                  {brand &&
                    brand.length > 0 &&
                    brand.map((brand) => {
                      return (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Danh mục (*)</strong>
                </label>
                <select
                  className="form-select"
                  name="category_id"
                  value={data.category_id}
                  onChange={handleChange}
                >
                  <option>Chọn danh mục</option>
                  {category &&
                    category.length > 0 &&
                    category.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputPrice" className="form-label">
                  <strong>Giá (*)</strong>
                </label>
                <input
                  type="number"
                  name="price"
                  min={0}
                  value={data.price || 100000}
                  onChange={handleChange}
                  className="form-control"
                  id="inputPrice"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPriceSale" className="form-label">
                  <strong>Giá khuyến mãi</strong>
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="inputPriceSale"
                  name="pricesale"
                  value={data.pricesale || 0}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputQty" className="form-label">
                  <strong>Số lượng (*)</strong>
                </label>
                <input
                  type="number"
                  min={0}
                  name="qty"
                  value={data.qty || 1}
                  onChange={handleChange}
                  className="form-control"
                  id="inputQty"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Hình ảnh đại diện (*)</strong>
                </label>
                <input type="file" className="form-control" id="image" />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <strong>Trạng thái</strong>
                </label>
                <select
                  className="form-select"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductEdit;
