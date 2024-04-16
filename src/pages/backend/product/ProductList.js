import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPlus } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";
import { toast } from "react-hot-toast";
import { IoEye } from "react-icons/io5";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa này?");
      if (confirmed === true) {
        await ProductService.delete(id);
        setProducts(products.filter((b) => b.id !== id));
        toast.success('Xóa thành công!'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa.'); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await ProductService.get_list();
      setProducts(result.products); 
    })();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả sản phẩm</strong>
          </div>
          <div className="col-6 text-end">
            <Link className="btn btn-sm btn-success" to="/admin/product/create">
              <TbPlus className="me-1" />
              Thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <table class="table mb-0 table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" />
              </th>
              <th scope="col" style={{ width: "100px" }}>
                Hình ảnh
              </th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Thương hiệu</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>
                      <img
                        className="img-fluid"
                        src={`${urlImage}products/${product.image}`}
                        alt={product.name}  
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand_name}</td>
                    <td>{product.category_name}</td>
                    <td>
                    <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/product/show/" + product.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <Link
                        className="btn btn-sm btn-warning me-2 mb-1"
                        to={"/admin/product/edit/" + product.id}
                      >
                        <FaEdit className="m-1 fs-5" />
                        Edit
                      </Link>
                      <button 
                      onClick={() => {handleDelete(product.id)}} 
                      className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{product.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
