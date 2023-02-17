import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Card, Alert } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
SwiperCore.use([FreeMode, Navigation, Thumbs]);
import { Swiper, SwiperSlide } from "swiper/react";
import numeral from 'numeral';
import { CashNewIcon } from "../../svg";

const EditProduct = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    // component did mount
    setDeviceWidth(window.innerWidth);
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Box className="sliderProduct">
          <Box className="firstPart">
            <Box>
              {data?.product?.images?.length &&
                data?.product?.images?.map((item) => (
                  <Box className="thump" key={item.id}>
                    <img src={item.url} />
                  </Box>
                ))}
            </Box>
            <Box className="glav">
              <img src={data?.product?.images[0].url} />
            </Box>
          </Box>
          <Box className="scndPart">
            <Box className="innerPart">
              <h3>
                  {data?.product?.name?.ru}
              </h3>
              <p className="price">   {numeral(data.price).format('0,0')} сум</p>
            </Box>
            <Box className="aaaaaa">
              <Box className="aaaaa">
                <CashNewIcon />
                <Box>
                  <span>Cashback</span>
                  <br />
                  <span className="cprice">0 сум</span>
                </Box>
              </Box>
              <Box className="aaaaa">
                <Box>
                  <span>Осталось</span>
                  <br />
                  <span className="cprice">{data.quantity}</span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 3,
        }}
      >
        <h3>Описание</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.product?.description?.ru,
          }}
        ></div>


        <Box sx={{
            pt:3
        }}>
            <Box>
            <h3>Характеристики</h3>
                <small>
                Характеристики нет
                </small>
                </Box>
            </Box>
      </Box>
    </>
  );
};

export default EditProduct;
