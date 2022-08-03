/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GuestUserBanner from "../../Components/GuestUser/GuestUserBanner";
import GuestUserDescription from "../../Components/GuestUser/GuestUserDescription";
import Loader from "../../Components/Loader/Loader";
import GuestUserNavBar from "../../Components/Navbar/GuestUserNavbar";
import Success from "../../Components/Success/Success";
import THEME_COLORS from "../../Constants/ColorConstants";
import './GuestUserHome.css'

const useStyles = {
  btncolor: {
    color: "white",
    "border-color": THEME_COLORS.THEME_COLOR,
    "background-color": THEME_COLORS.THEME_COLOR,
    float: "right",
    "border-radius": 0,
  },
  marginrowtop: { "margin-top": "20px" },
  marginrowtop8px: { "margin-top": "0px" },
};

export default function GuestUserHome(props) {
  //   loader
  const [isLoader, setIsLoader] = useState(false);

  return (
    <>
      {isLoader ? <Loader /> : ""}
      <GuestUserNavBar />
      <GuestUserBanner />
      <GuestUserDescription />
    </>
  );
}