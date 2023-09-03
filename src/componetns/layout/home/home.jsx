import React, { useState } from "react";
import { Link } from "react-router-dom";
import Products from "./componetns/layout/Products/Product.jsx";
import "../../../App.css";
import "./slides.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Metadata  from "./componetns/layout/Metadata.jsx";
import NewArival from "./componetns/layout/newArival.jsx";
import Example from "../../../newsLetter/newsLetter.jsx";
import OfferPage from "../../../acttion/addnews.jsx";
import image1 from './1.jpg'
import image2 from './2.jpg'
import image3 from './3.png'

const images =[
  image1,
  image2,
  image3
]

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000, 
    autoplay: true, 
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <div>
      <Metadata title="Homepage"/>
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <strong className="flex justify-center text-5xl sm:text-8xl font-extrabold text-green-600">
               Featured Product
              </strong>
     <Products product={Products} />

     <NewArival/>
     <OfferPage/>

     <Example/>


     
    </div>
  );
};
export default Home;
