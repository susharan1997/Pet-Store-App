import React, { MouseEvent, useState } from "react";

type CarouselTypes = {
  images?: string[];
};

const Carousel: React.FC<CarouselTypes> = ({
  images = ["http://pets-images.dev-apis.com/pets/none.jpg"],
}) => {
  const [active, setActive] = useState(0);

  const handleIndexClick = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.dataset.index) {
      setActive(+event.target.dataset.index);
    }
  };
  return (
    <div className="carousel">
      <img src={images[active]} alt="animal" />
      <div className="carousel-smaller">
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            className={index === active ? "active" : ""}
            alt="animal thumbnail"
            onClick={() => handleIndexClick}
            data-index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
