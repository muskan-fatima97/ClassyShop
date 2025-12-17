import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

export default function HeroCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 600,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slides = [
        { img: "/car5.jpg" },
        { img: "/car2.jpg" },
        { img: "/car3.jpg" },
    ];

    return (
        <Box
            className="hero-slide"
            sx={{
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                mt: 5,
                px: { xs: 2, sm: 3, md: 5 },
            }}
        >
            <Slider {...settings}>
                {slides.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "relative",
                            width: "100%",
                            borderRadius: "16px",
                            overflow: "hidden",
                            height: { xs: 250, sm: 350, md: 450, lg: 500 },
                            boxSizing: "border-box",
                        }}
                    >
                        <img
                            src={item.img}
                            alt="slide"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
