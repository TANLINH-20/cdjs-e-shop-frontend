import { useCart } from "../../../utils/Cart";
import { Link } from "react-router-dom";
import { urlImage } from "../../../config";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const CartClient = () => {
  const { cart, updateCart, clearCart, deleteFromCart, cartTotal } = useCart();
  const handleClearAll = () => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa tất cả sản phẩm?"
      );
      if (confirmed === true) {
        clearCart();
        toast.success("Đã xóa thành công"); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi xóa."); // Hiển thị thông báo lỗi
    }
  };
  return (
    <section className="my-5">
      <div className="container overflow-y-auto" style={{ maxHeight: "500px" }}>
        <table className="table table-bordered">
          <thead>
            <tr className="bg-dark">
              <th style={{ width: "30px" }} className="text-center">
                STT
              </th>
              <th style={{ width: "100px" }}>Hình</th>
              <th>Tên sản phẩm</th>
              <th className="text-center">Giá</th>
              <th style={{ width: "130px" }} className="text-center">
                Số lượng
              </th>
              <th className="text-center">Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center align-middle">{index + 1}</td>
                  <td>
                    <img
                      className="img-fluid"
                      src={`${urlImage}products/${item.image}`}
                      alt={item.image}
                    />
                  </td>
                  <td className="align-middle">{item.name}</td>
                  <td className="text-center align-middle">
                    {item.price.toLocaleString()}
                  </td>
                  <td className="text-center align-middle">
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        value={item.qty}
                        min="1"
                        onChange={(e) =>
                          updateCart(item.id, parseInt(e.target.value))
                        }
                        style={{ width: "60px" }}
                      />
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    {(item.qty * item.price).toLocaleString()}
                  </td>
                  <td className="text-center align-middle">
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => deleteFromCart(item.id)}
                    >
                      <IoMdClose />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Chưa có sản phẩm trong giỏ hàng
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <button
                  className={`btn btn-warning me-2 ${
                    cart.length === 0 && "disabled"
                  }`}
                  onClick={handleClearAll}
                >
                  Xoá tất cả
                </button>
                <Link
                  to="/thanh-toan"
                  className={`btn btn-outline-primary ${
                    cart.length === 0 && "disabled"
                  }`}
                >
                  Thanh toán
                </Link>
              </td>
              <td colSpan="2" className="text-end">
                <strong>Tổng tiền: {cartTotal().toLocaleString()}đ</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default CartClient;
