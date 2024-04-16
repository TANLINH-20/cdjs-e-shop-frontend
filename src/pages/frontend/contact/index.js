import { FaLocationDot, FaPaperPlane, FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo_tanlinh_clother-01.png";
import { useState } from "react";
import ContactService from "../../../services/ContactService";
import toast from "react-hot-toast";
const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    content: "",
    status: "1",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = new FormData();
    contact.append("name", data.name);
    contact.append("email", data.email);
    contact.append("phone", data.phone);
    contact.append("title", data.title);
    contact.append("content", data.content);
    contact.append("status", data.status);
    //Service them
    (async () => {
      const result = await ContactService.store(contact);
      if (result.status === true) {
        toast.success("Gửi thành công");
        setData({
          name: "",
          email: "",
          phone: "",
          title: "",
          content: "",
          status: "1",
        });
      } else {
        toast.error("Gửi thất bại");
      }
    })();
  };
  return (
    <>
      <section class="bg-body-tertiary my-5">
        <div class="container">
          <div class="row d-flex mb-5">
            <div class="col-md-3 d-flex">
              <div class=" bg-white border p-4">
                <p>
                  <span className="pe-2 fs-5">
                    <FaLocationDot />
                  </span>
                  73H, Phường Hiệp Phú, Quận 9, TP. HCM
                </p>
              </div>
            </div>
            <div class="col-md-3 d-flex">
              <div class=" bg-white border p-4">
                <p>
                  <span className="pe-2 fs-5">
                    <FaPhoneVolume />
                  </span>
                  <Link
                    className="text-decoration-none text-dark"
                    to="tel:0343970915"
                  >
                    0343970915
                  </Link>
                </p>
              </div>
            </div>
            <div class="col-md-3 d-flex">
              <div class=" bg-white border p-4">
                <p>
                  <span className="pe-2 fs-5">
                    <FaPaperPlane />
                  </span>
                  <Link
                    className="text-decoration-none text-dark"
                    to="mailto:linhnguyentan24@gmail.com"
                  >
                    linhnguyentan24@gmail.com
                  </Link>
                </p>
              </div>
            </div>
            <div class="col-md-3 d-flex">
              <div class=" bg-white border  p-4">
                <p>
                  <strong>Website:</strong>{" "}
                  <Link className="text-decoration-none text-dark" to="/">
                    http://localhost:3000
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 bg-body-tertiary order-md-last">
              <form
                class="bg-white mx-5 bg-body-tertiary"
                onSubmit={handleSubmit}
              >
                <div class="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div class="mb-4">
                  <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div class="mb-4">
                  <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Your Phone"
                    required
                  />
                </div>
                <div class="mb-4">
                  <textarea
                    name="content"
                    value={data.content}
                    onChange={handleChange}
                    cols="30"
                    rows="6"
                    class="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div class="mb-4 d-flex justify-content-end">
                  <button class="btn btn-primary py-3 px-5">Send Message</button>
                </div>
              </form>
            </div>

            <div class="col-md-6">
              <div class="bg-white border">
                <img src={logo} alt="logo" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
