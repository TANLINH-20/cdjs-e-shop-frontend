import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ContactService from "../../../services/ContactService";
import { toast } from "react-hot-toast";
const ContactList = () => {
  const [contact, setContact] = useState([]);
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?");
      if (confirmed === true) {
        await ContactService.delete(id);
        setContact(contact.filter((b) => b.id !== id));
        toast.success('Xóa thành công!'); // Hiển thị thông báo thành công
      }
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi khi xóa.'); // Hiển thị thông báo lỗi
    }
  };
  useEffect(() => {
    (async () => {
      const result = await ContactService.get_list();
      setContact(result.contact);
    })();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <strong className="text-danger">Tất cả liên hệ</strong>
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
              <th scope="col">Họ và tên</th>
              <th scope="col">Email</th>
              <th scope="col">Điện thoại</th>
              <th scope="col">Chức năng</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {contact.length > 0 &&
              contact.map((contact, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <Link
                        className="btn btn-sm btn-success me-2 mb-1"
                        to={"/admin/contact/show/" + contact.id}
                      >
                        <IoEye className="m-1 fs-5" />
                        Show
                      </Link>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="btn btn-sm btn-danger mb-1">
                        <MdDelete className="m-1 fs-5" />
                        Delete
                      </button>
                    </td>
                    <td>{contact.id}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
