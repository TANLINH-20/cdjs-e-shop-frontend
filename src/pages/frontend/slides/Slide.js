import { useEffect, useState } from "react";
import BannerService from "../../../services/BannerService";
import { urlImage } from "../../../config";

const Slide = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await BannerService.slideshow("slideshow");
      setSliders(result.banners);
    })();
  }, []);
  return (
    <>
      <div
        id="carouselExampleRide"
        className="carousel slide"
        data-bs-ride="true"
      >
        <div className="carousel-inner">
          {sliders &&
            sliders.length > 0 &&
            sliders.map((slider, index) => {
                return (
                  <div className={`carousel-item ${index === 0 && "active"}`}>
                    <img src={`${urlImage}banners/${slider.image}`} className="d-block w-100" alt="..." />
                  </div>
                );
              
            })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Slide;
