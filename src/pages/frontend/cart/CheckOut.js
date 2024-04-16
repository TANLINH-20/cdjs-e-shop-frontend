import { useNavigate } from "react-router-dom";
import { urlImage } from "../../../config";
import { useCart } from "../../../utils/Cart";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderService from "../../../services/OrderService";
import OrderDetailService from "../../../services/OrderDetailService";

const CheckOut = () => {
  const { cart, updateCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [dataOrder, setDataOrder] = useState({
    user_id: "7",
    deliveryaddress: "",
    deliveryname: "",
    deliveryphone: "",
    deliveryemail: "",
    note: "",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDataOrder((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const order = new FormData();
    order.append("user_id", dataOrder.user_id);
    order.append("deliveryaddress", dataOrder.deliveryaddress);
    order.append("deliveryname", dataOrder.deliveryname);
    order.append("deliveryphone", dataOrder.deliveryphone);
    order.append("deliveryemail", dataOrder.deliveryemail);
    order.append("note", dataOrder.note);
    order.append("status", dataOrder.status);
    //Service them
    (async () => {
      const result = await OrderService.store(order);
      // Tạo một Promise mới để lưu trữ orderId
      const getOrderIdPromise = new Promise(async (resolve, reject) => {
        const orderLatest = await OrderService.getLatest();
        resolve(orderLatest.order.id);
      });
      const orderId = await getOrderIdPromise;

      if (result.status === true) {
        cart.forEach(async (item) => {
          const orderDetail = new FormData();
          orderDetail.append("order_id", orderId);
          orderDetail.append("product_id", item.id);
          orderDetail.append("price", item.price);
          orderDetail.append("qty", item.qty);
          orderDetail.append("amount", item.qty * item.price);
          await OrderDetailService.store(orderDetail);
        });
        toast.success("Đặt hàng thành công");
        setDataOrder({
          user_id: "7",
          deliveryaddress: "",
          deliveryname: "",
          deliveryphone: "",
          deliveryemail: "",
          note: "",
          status: "1",
        });
        clearCart();
        navigate("/");
      } else {
        toast.error("Đặt hàng thất bại");
      }
    })();
  };
  return (
    <div className="my-5">
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <h2 className="mb-4 text-secondary-emphasis">
                Thông Tin Giao Hàng
              </h2>
              <div className="row">
                <div className="col-md-12 my-2">
                  <div className="form-group">
                    <label for="firstname">
                      Tên người nhận(<strong className="text-danger">*</strong>)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="deliveryname"
                      value={dataOrder.deliveryname}
                      onChange={handleChange}
                      placeholder="Nhập tên"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <div className="form-group">
                    <label for="address">
                      Địa chỉ người nhận(
                      <strong className="text-danger">*</strong>)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="deliveryaddress"
                      value={dataOrder.deliveryaddress}
                      onChange={handleChange}
                      id="address"
                      placeholder="Nhập địa chỉ"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label for="phone">
                      Số Điện Thoại(<strong className="text-danger">*</strong>)
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="deliveryphone"
                      value={dataOrder.deliveryphone}
                      onChange={handleChange}
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 my-2">
                  <div className="form-group">
                    <label for="email">
                      Email(<strong className="text-danger">*</strong>)
                    </label>
                    <input
                      type="email"
                      name="deliveryemail"
                      value={dataOrder.deliveryemail}
                      onChange={handleChange}
                      className="form-control"
                      id="email"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <div className="form-group">
                    <label for="note">Ghi Chú</label>
                    <textarea
                      className="form-control"
                      name="note"
                      value={dataOrder.note}
                      onChange={handleChange}
                      id="note"
                      rows="3"
                      placeholder="Nhập ghi chú"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12 my-2">
                  <button
                    className="btn btn-outline-dark float-end text-uppercase"
                    type="submit"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="mb-4 text-primary">Thanh Toán</h2>
              <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
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
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((item, index) => (
                        <tr key={item.id}>
                          <td className="text-center align-middle">
                            {index + 1}
                          </td>
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
                                min="0"
                                onChange={(e) =>
                                  updateCart(item.id, parseInt(e.target.value))
                                }
                                style={{ width: "60px" }}
                              />
                            </div>
                          </td>
                          <td className="text-center align-middle">
                            {(item.qty * item.price).toLocaleString()}đ
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
                      <td colSpan="7" className="text-end">
                        <strong>
                          Tổng tiền: {cartTotal().toLocaleString()}đ
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <table class="table table-borderless mt-5">
                <tr>
                  <th>Tạm tính</th>
                  <td class="text-end">{cartTotal().toLocaleString()}đ</td>
                </tr>
                <tr>
                  <th>Phí vận chuyển</th>
                  <td class="text-end">0</td>
                </tr>
                <tr>
                  <th>Giảm giá</th>
                  <td class="text-end">0</td>
                </tr>
                <tr>
                  <th>Tổng cộng</th>
                  <td class="text-end">{cartTotal().toLocaleString()}đ</td>
                </tr>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
