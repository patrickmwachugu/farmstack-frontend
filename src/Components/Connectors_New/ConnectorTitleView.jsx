import React from "react";
import { Typography } from "@mui/material";
import style from "./Connector.module.css";
import ContainedButton from "../Button/ContainedButton";
const ConnectorTitleView = ({
  title,
  isGrid,
  setIsGrid,
  history,
  addConnector,
}) => {
  return (
    <div className="d-flex justify-content-between">
      <div className={style.boldTitle}>{title}</div>
      <div className="d-flex align-items-center mt-50">
        <div
          className="d-flex mr-30 cursor-pointer"
          onClick={() => setIsGrid(false)}
        >
          <img
            className="mr-7"
            src={require(`../../Assets/Img/${
              isGrid ? "list_view_gray.svg" : "list_view_green.svg"
            }`)}
          />
          <Typography
            sx={{
              color: !isGrid ? "#00AB55" : "#3D4A52",
            }}
          >
            List view
          </Typography>
        </div>
        <div className="d-flex cursor-pointer" onClick={() => setIsGrid(true)}>
          <img
            className="mr-7"
            src={require(`../../Assets/Img/${
              isGrid ? "grid_view_green.svg" : "grid_view_gray.svg"
            }`)}
          />
          <Typography
            sx={{
              color: isGrid ? "#00AB55" : "#3D4A52",
            }}
          >
            Grid view
          </Typography>
        </div>
        {!isGrid && (
          <div className="d-flex">
            <ContainedButton
              text={"+ New connector"}
              fontWeight={"700"}
              fontSize={"15px"}
              width={"166px"}
              height={"48px"}
              ml={"52px"}
              fontFamily={"Public Sans"}
              handleClick={() => history.push(addConnector())}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectorTitleView;