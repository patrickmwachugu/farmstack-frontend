import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LocalStyle from "./GuestUsetParticipants.module.css";
import GlobalStyle from "../../Assets/CSS/global.module.css";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { FarmStackContext } from "../../Components/Contexts/FarmStackContext";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import CoStewardAndParticipantsCard from "../../Components/CoStewardAndParticipants/CostewardAndParticipants";

function GuestUserParticipants(props) {
  const { title } = props;
  const { callLoader, callToast } = useContext(FarmStackContext);
  const [coStewardOrParticipantsList, setCoStewardOrParticipantsList] =
    useState([]);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [searcParticipantsName, setSearcParticipantsName] = useState();

  const getParticipants = () => {
    let url = UrlConstant.base_url + "microsite/participant/";
    let params = "";
    if (title) {
      params = { co_steward: "True" };
    }
    callLoader(true);
    HTTPService("GET", url, params, false, false)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        if (response?.data?.results)
          setCoStewardOrParticipantsList(response.data.results);
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
      });
  };

  const getListOnClickOfLoadMore = () => {
    callLoader(true);
    HTTPService("GET", loadMoreUrl, "", false, false)
      .then((response) => {
        callLoader(false);
        if (response?.data?.next == null) {
          setLoadMoreButton(false);
        } else {
          setLoadMoreButton(true);
          if (response?.data?.next) setLoadMoreUrl(response.data.next);
        }
        let datalist = coStewardOrParticipantsList;
        // if (response?.data?.results) {
        let finalDataList = [...datalist, ...response.data.results];
        setCoStewardOrParticipantsList(finalDataList);
        // }
      })
      .catch((e) => {
        callLoader(false);
        let error = GetErrorHandlingRoute(e);
        console.log("Error obj", error);
        callToast(error.message, "error", true);
        console.log(e);
      });
  };
  const handleSearch = (name, isLoadMore) => {
    setSearcParticipantsName(name);
    if (name.trim().length > 2) {
      let data = {};
      // data["user_id"] = getUserLocal();
      // data["org_id"] = getOrgLocal();
      // data["name__icontains"] = name.trim();

      // setFilterState(data);
      let guestUsetFilterUrl =
        // UrlConstant.base_url + UrlConstant.search_dataset_end_point_guest;
        HTTPService("POST", guestUsetFilterUrl, data, false, false)
          .then((response) => {
            if (response.data.next == null) {
              // setFilterState({});
              setLoadMoreButton(false);
            } else {
              setLoadMoreUrl(response.data.next);
              setLoadMoreButton(true);
            }
            let finalDataList = [];
            if (isLoadMore) {
              finalDataList = [
                ...coStewardOrParticipantsList,
                ...response.data.results,
              ];
            } else {
              finalDataList = [...response.data.results];
            }
            console.log(finalDataList, "fdlist");
            coStewardOrParticipantsList(finalDataList);
          })
          .catch((e) => {
            console.log(e);
          });
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return (
    <Container>
      <Row className={LocalStyle.titleContainer}>
        <div className={LocalStyle.title}>{title ?? "Our participants"}</div>
        <div className="d-flex justify-content-center">
          <div className={LocalStyle.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
            tellus scelerisque, imperdiet augue id, accumsan dolor. Integer ac
            neque quis metus pretium tempus.
          </div>
        </div>
      </Row>
      {/* <Row className={LocalStyle.title2}>
        <Typography className={`${GlobalStyle.size24} ${GlobalStyle.bold600}`}>
          Our terms are
        </Typography>
      </Row> */}

      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#919EAB",
            },
            "&:hover fieldset": {
              borderColor: "#919EAB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#919EAB",
            },
          },
        }}
        className="input_field"
        placeholder="Search dataset.."
        value={searcParticipantsName}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <img
                  src={require("../../Assets/Img/input_search.svg")}
                  alt="search"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Row>
        <CoStewardAndParticipantsCard
          guestUser={true}
          isCosteward={title ? true : false}
          title={title ?? "Our Participants are"}
          viewType={"grid"}
          // setViewType={setViewType}
          coStewardOrParticipantsList={coStewardOrParticipantsList}
          loadMoreButton={loadMoreButton}
          handleLoadMoreButton={getListOnClickOfLoadMore}
        />
      </Row>
    </Container>
  );
}

export default GuestUserParticipants;