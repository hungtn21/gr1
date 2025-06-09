import React from "react";
import "./BT2.css";

const BT2 = ({ cols }) => {
  const images = [
    "/images/1d83a6d88d8be5b041a9a98fd5048311.jpeg",
    "/images/947edbbf6ced34863fc8702ed29ef79f.jpg",
    "/images/avatar-anh-meo-cute-3.jpg",
    "/images/b99177bc57b7628dd564c8b96f686c74.jpg",
    "/images/hinh-nen-con-meo.jpg",
    "/images/Hinh-Nen-Meo-Ngao-38.jpg",
    "/images/Hinh-Nen-Meo-Ngao-38.jpg",
    "/images/1d83a6d88d8be5b041a9a98fd5048311.jpeg",
    "/images/947edbbf6ced34863fc8702ed29ef79f.jpg",
    "/images/avatar-anh-meo-cute-3.jpg",
    "/images/b99177bc57b7628dd564c8b96f686c74.jpg",
    "/images/hinh-nen-con-meo.jpg",
  ];

  return (
    <div
      className="grid-container"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {images.map((imgSrc, index) => (
        <div className="grid-item">
          <img
            key={index}
            src={imgSrc}
            alt={`img-${index}`}
            className="grid-image"
          />
        </div>
      ))}
    </div>
  );
};

export default BT2;
