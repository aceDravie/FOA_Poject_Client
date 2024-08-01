import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

const Slideshow = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [food, setFood] = useState([]);

const fooddata = [
  {id: 1, name: "Banku", price: 10, image: "https://img.freepik.com/free-photo/fresh-grill-bbq-chicken_144627-7526.jpg?t=st=1722491792~exp=1722495392~hmac=7c0f85fc1d00698e68c3faa3eb73ac34ae4e6a4411333ceacccbb0743e2d635c&w=1060"},
  {id: 1, name: "rice", price: 10, image: ""},
  {id: 1, name: "Beans", price: 10, image: ""},
  {id: 1, name: "Yam", price: 10,  image: ""}
]

  
  const handleImageClick = (food) => {
    setSelectedFood(food);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedFood(null);
  };
  
  return (
    <div className="container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {fooddata.map((food) => (
          <SwiperSlide key={food.id}>
            <Box
              className="slide-content"
              onClick={() => handleImageClick(food)}
            >
              <img src={food.image} alt={food.name} />
              <Typography variant="h6" className="food-name">
                {food.name}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>

      {selectedFood && (
        <FoodDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          title={selectedFood.name}
          rating={selectedFood.rating}
          price={selectedFood.price}
          imageSrc={selectedFood.image}
          description={selectedFood.description}
          id={selectedFood.id}
        />
      )}
    </div>
  );
};

export default Slideshow;
