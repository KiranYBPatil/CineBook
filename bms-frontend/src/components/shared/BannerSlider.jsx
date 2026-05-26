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
    <div className="w-full bg-[var(--bg-primary)] py-6 transition-colors duration-200">
      <div className="mx-auto px-4">
        <Slider {...settings}>
          {banners.map((banner, i) => (
            <div key={i} className="px-3">
              
              {/* ASPECT RATIO CONTAINER */}
              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={banner}
                  alt={`banner-${i}`}
                  className="absolute inset-0 w-full h-full object-cover"
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
