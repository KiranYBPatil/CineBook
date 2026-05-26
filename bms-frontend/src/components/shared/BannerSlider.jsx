import React from "react";
import Slider from "react-slick";
import { banners } from "../../utils/constants";

const BannerSlider = () => {
  const settings = {
    centerMode: true,
    centerPadding: "200px",
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-purple-50/20 py-6">
      <div className="mx-auto px-4">
        <Slider {...settings}>
          {banners.map((banner, i) => (
            <div key={i} className="px-3">
              
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-xl shadow-purple-200/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-300/40">
                <img
                  src={banner}
                  alt={`banner-${i}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSlider;
