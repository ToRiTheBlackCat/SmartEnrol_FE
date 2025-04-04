import React from "react";
import BannerZero from "../../assets/Banner1.jpg";
import BannerOne from "../../assets/Banner 2.jpg";
import BannerTwo from "../../assets/Banner4.jpg";

interface BannerIndicatorProps {
  index: number;
  active: boolean;
}

const BannerIndicator: React.FC<BannerIndicatorProps> = ({ index, active }) => {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={index}
      className={active ? "active" : ""}
      aria-current={active}
    />
  );
};

interface BannerImageProps {
  image: string;
  active: boolean;
}

const BannerImage: React.FC<BannerImageProps> = ({ image, active }) => {
  return (
    <div className={`carousel-item ${active ? "active" : ""}`} data-bs-interval="3000">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          maxHeight: "100%",
          width: "100%",
          overflow: "hidden",
        }}
          >
        <img
          className="d-block w-100"
          alt="Banner"
          src={image}
          style={{
            objectFit: "cover", // Giữ tỷ lệ ảnh, không bị kéo giãn
            maxHeight: "100%",
          }}
        />
      </div>
      {/* <div className="carousel-caption d-none d-lg-block" style={{color: "blue"}}>
        <h5>Smart Enrol</h5>
        <p>Nền tảng hướng dẫn tuyển sinh đại học cho học sinh trung học phổ thông</p>
      </div>  */}
    </div>
    
  );
};

const Banner: React.FC = () => {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-indicators">
        <BannerIndicator index={0} active={true} />
        <BannerIndicator index={1} active={false} />
        <BannerIndicator index={2} active={false} />
      </div>
      <div className="carousel-inner">
        <BannerImage image={BannerZero} active={true} />
        <BannerImage image={BannerOne} active={false} />
        <BannerImage image={BannerTwo} active={false} />
      </div>
    </div>
  );
};

export default Banner;
