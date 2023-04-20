import React, { useState, useEffect } from "react";
import style from "./filter.module.css";
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";

const contentDetailsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
};
const Filter = ({
  type,
  dataType,
  content,
  geography,
  setGeography,
  geographies,
  setGeographies,
  countries,
  states,
  cities,
  setShowFilter,
  callApply,
}) => {
  const handleClose = () => {
    callApply();
    setShowFilter(false);
  };

  return (
    <div style={{ marginLeft: "144px", marginRight: "144px" }}>
      <Card
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "15px",
        }}
      >
        <Box className="pt-20">
          {dataType === "list" ? (
            <>
              <Box
                sx={
                  type === "categories"
                    ? {
                        width: "100%",
                      }
                    : { width: "100%", ...contentDetailsStyle }
                }
              >
                {content?.map((acc) => {
                  return (
                    <Box className="text-left">
                      <Typography
                        sx={{
                          marginLeft: "12px",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        {acc.title}
                      </Typography>
                      <Box
                        sx={type === "categories" ? contentDetailsStyle : {}}
                      >
                        {acc?.details?.map((detail, index) => (
                          <Box key={index}>{detail}</Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </>
          ) : (
            <Box className="d-flex justify-content-between">
              <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
                <InputLabel id="test-select-label">Select Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={geography?.country?.name}
                  onChange={(e) => {
                    setGeography((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }));
                    if (geographies.includes(e.target.value.name)) {
                      let tempGeo = [...geographies];
                      tempGeo.push(e.target.value.name);
                      setGeographies(tempGeo);
                    } else {
                      setGeographies(
                        geographies.filter(
                          (item) => item.name !== e.target.value.name
                        )
                      );
                    }
                  }}
                  sx={{
                    textAlign: "left",
                    "&.MuiInputBase-root": {
                      height: "56px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                  }}
                  label="Select Country"
                  placeholder="Select Country"
                >
                  {countries?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
                <InputLabel id="test-select-label">Select State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={geography?.state?.name}
                  onChange={(e) => {
                    setGeography((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }));
                    if (geographies.includes(e.target.value.name)) {
                      let tempGeo = [...geographies];
                      tempGeo.push(e.target.value.name);
                      setGeographies(tempGeo);
                    } else {
                      setGeographies(
                        geographies.filter(
                          (item) => item.name !== e.target.value.name
                        )
                      );
                    }
                  }}
                  sx={{
                    textAlign: "left",
                    "&.MuiInputBase-root": {
                      height: "56px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                  }}
                  label="Select State"
                  placeholder="Select State"
                >
                  {states?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ width: "330px" }} className="mt-30">
                <InputLabel id="test-select-label">Select City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={geography?.city?.name}
                  onChange={(e) => {
                    setGeography((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }));
                    if (geographies.includes(e.target.value.name)) {
                      let tempGeo = [...geographies];
                      tempGeo.push(e.target.value.name);
                      setGeographies(tempGeo);
                    } else {
                      setGeographies(
                        geographies.filter(
                          (item) => item.name !== e.target.value.name
                        )
                      );
                    }
                  }}
                  sx={{
                    textAlign: "left",
                    "&.MuiInputBase-root": {
                      height: "56px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#919EAB",
                    },
                  }}
                  label="Select City"
                  placeholder="Select City"
                >
                  {cities?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Box className="text-right mt-20 mb-20 mr-20">
            <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "14px",
                width: "86px",
                height: "36px",
                background: "#00AB55",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#00AB55",
                  color: "#fffff",
                },
              }}
              variant="contained"
              onClick={() => handleClose()}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default Filter;
