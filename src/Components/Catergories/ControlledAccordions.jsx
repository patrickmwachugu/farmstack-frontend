import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import global_styles from "../../Assets/CSS/global.module.css";
import EditIcon from "@mui/icons-material/Edit";
export default function ControlledAccordions(props) {
  const {
    data,
    Component,
    index,
    heading,
    accordionDelete,
    isHeadEditing,
    handleEditHeading,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="accordions_in_onboarding" style={{ margin: "10px 0px" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        id="condtrolled_accordion"
        sx={{
          // margin: expanded === "panel1" ? "20px 0px" : "10px 0px",
          boxShadow:
            expanded === "panel1"
              ? "0px 20px 40px -4px rgba(145, 158, 171, 0.16)"
              : "",
          borderRadius: expanded === "panel1" ? "8px" : "",
          border: expanded === "panel1" ? "1px solid #919EAB" : "",
          // "&.MuiAccordionSummary-content": {
          //   alignItems: "center",
          // },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          onClick={(e) => handleEditHeading(false, e, index)}
          sx={{}}
        >
          <Typography
            className={global_styles.bold600 + " " + global_styles.size24}
            sx={{
              width: "95%",
              flexShrink: 0,
              textAlign: "left",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: "20px",
              alignItems: "center",
            }}
          >
            {heading}{" "}
            {isHeadEditing ? (
              <EditIcon
                fontSize="small"
                onClick={(e) => handleEditHeading(true, e, index)}
              />
            ) : (
              ""
            )}
          </Typography>
          <DeleteOutlineIcon onClick={(e) => accordionDelete(e, index)} />
        </AccordionSummary>
        <AccordionDetails>
          {Component && <Component data={data} index={index} />}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
