import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import labels from '../../Constants/labels';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import $ from 'jquery';
import FilterCheckBox from '../../Components/Datasets/FilterCheckBox';
import { SearchSharp } from '@mui/icons-material';

export default function DataSetFilter(props) {
    const [screenlabels, setscreenlabels] = useState(labels['en']);

  return (
    <div>
        <Row className="supportfilterfirstrow">
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A">{screenlabels.dataset.filter}</span>
            {/* <span style={{"font-weight": "600","font-size": "14px","color": "#3a3a3a","left":"10px"}}>{screenlabels.dataset.filter}</span> */}
            </Col>
            
            <Col className='supportfiltertext'>
            <span className="fontweight600andfontsize14pxandcolor3A3A3A" >
                        <Button
                            style={{"font-style":"Open Sans","font-weight": "500","font-size": "13px","bottom":"4px","right":"-10px"}}
                            onClick={() => props.clearAllFilters()}
                            // variant="outlined"
                            // className="cancelbtn"
                            >
                            Clear All
                        </Button></span>
            </Col>
        </Row>
        {props.isShowAll ? 
        // <Row onClick={() => props.filterRow('all', false, 'all')} className="supportfiltersecondrow">
        <Row onClick={() => props.getAllDataSets()} className="supportfiltersecondrow">
            <span className="supportallicon">
                <img
                    src={require('../../Assets/Img/filter.svg')}
                    alt="new"
                />
            </span>
            <span className="fontweight600andfontsize14pxandcolorFFFFFF supportalltexticon">{screenlabels.support.all}</span>
        </Row> :
        // <Row onClick={() => props.filterRow('all', true, 'all')} className="supportfiltersecondrowbold">
        <Row onClick={() => props.getAllDataSets()} className="supportfiltersecondrowbold">
            <span className="supportallicon">
                <img
                    src={require('../../Assets/Img/filter_bold.svg')}
                    alt="new"
                />
            </span>
            <span className="fontweight600andfontsize14pxandcolor3D4A52 supportalltexticon">{screenlabels.support.all}</span>
        </Row>}
        <Row className={props.secondrow ? 'supportfilterthirdrowhighlight' : "supportfilterthirdrow"}>
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterthirdrowheadingtext">{screenlabels.support.date}</span>
          <span className="supportcardfromdate">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      inputFormat="dd/MM/yyyy"
                      disableFuture
                      label="From Date *"
                      value={props.fromdate}
                      onChange={(newValue) => {
                          props.settodate(null)
                          props.setfromdate(newValue);
                        //   props.setIsShowAll(false)
                          props.resetFilterState(screenlabels.dataset.geography)
                          props.resetFilterState(screenlabels.dataset.age)
                          props.resetFilterState(screenlabels.dataset.crop)
                          props.resetFilterState(screenlabels.dataset.status)
                          props.resetEnabledStatusFilter()
                          setTimeout(() => {
                              $(".supportcardtodate input.MuiInputBase-input").attr("disabled", "disabled");
                          }, 100)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
          </span>
          <span className="supportcardtodate">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      inputFormat="dd/MM/yyyy"
                      disabled={props.fromdate ? false : true}
                      disableFuture
                      label="To Date *"
                      minDate={props.fromdate}
                      value={props.todate}
                      onChange={(newValue) => {
                          props.settodate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
          </span>
          {props.fromdate && props.todate ? <span className="supportsubmitbrn">
              <Button onClick={() => props.filterByDates()} variant="contained" className="enabledatesubmitbtn">
                  Submit
          </Button>
          </span> :
              <span className="supportsubmitbrn">
                  <Button variant="outlined" className="disbaledatesubmitbtn">
                      Submit
                  </Button>
              </span>}
      </Row>
      {props.showMemberFilters && 
        <Row className="supportfiltersecondrowbold">
            <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.status}</span>
        </Row>}
        {props.showMemberFilters &&
            props.statusFilter && props.statusFilter.map((status) => (
            <FilterCheckBox
                label={status.name}
                checked={status.isChecked}
                handleCheckListFilterChange={() => props.handleFilterChange(status.index,screenlabels.dataset.status)}
            />
            ))
        }
      {props.showMemberFilters && 
        <Row className="supportfiltersecondrowbold">
            <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.datasets}</span>
        </Row>}
        {props.showMemberFilters &&
        
            <FilterCheckBox
                label={screenlabels.dataset.enabled}
                checked={props.isEnabledFilter}
                handleCheckListFilterChange={() => props.handleEnableStatusFilter(screenlabels.dataset.enabled)}
            />
        }
        {props.showMemberFilters &&
        
            <FilterCheckBox
                label={screenlabels.dataset.disbaled}
                checked={props.isDisabledFilter}
                handleCheckListFilterChange={() => props.handleEnableStatusFilter(screenlabels.dataset.disbaled)}
            />
        }
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.geography}</span>
      </Row>
      <Row className="supportfiltersecondrowbold">
          <TextField 
            style={{ "width":"100%", "margin-left":"10px","margin-right":"10px","text-align": "left", color: '#3D4A52'}}
            id="filled-basic"
            variant="filled"
            label={screenlabels.dataset.search}
            value={props.geoSearchState}
            onChange={(e) => props.handleGeoSearch(e)}
          />
      </Row>
      {/* <Row> */}
          {props.geoFilterDisplay && props.geoFilterDisplay.map((geoFilter) => (
              geoFilter.isDisplayed &&
              <FilterCheckBox
                label={geoFilter.name}
                checked={geoFilter.isChecked}
                handleCheckListFilterChange={() => props.handleFilterChange(geoFilter.index,screenlabels.dataset.geography)}
              />
              ))}
      {/* </Row> */}
      {/* <Row>
        {props.geographyList && props.geographyList.map((geography) => (
            <FilterCheckBox
                label={geography}
                checked={props.geoCheckStateList[props.geoMasterList.findIndex((geo)=> geo == geography)]}
                handleCheckListFilterChange={() => props.handleCheckListFilterChange("geography",props.geoMasterList.findIndex((geo)=> geo == geography))}
            />
        ))}  
      </Row>
       */}
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.age}</span>
      </Row>
      {/* <Row> */}
          {props.ageFilterDisplay && props.ageFilterDisplay.map((ageFilter) => (
              <FilterCheckBox
                label={ageFilter.name}
                checked={ageFilter.isChecked}
                handleCheckListFilterChange={() => props.handleFilterChange(ageFilter.index,screenlabels.dataset.age)}
              />
          ))}
      {/* </Row> */}
      {/* <Row>
        {props.ageList && props.ageList.map((age) => (
            <FilterCheckBox
                label={age}
                checked={props.ageCheckStateList[props.ageMasterList.findIndex((a)=> a == age)]}
                handleCheckListFilterChange={() => props.handleCheckListFilterChange("age",props.ageMasterList.findIndex((a)=> a == age))}
            />
        ))}  
      </Row> */}
      <Row className="supportfiltersecondrowbold">
          <span className="fontweight600andfontsize14pxandcolor3D4A52 supportfilterheadingtext">{screenlabels.dataset.crop}</span>
      </Row>
      <Row className="supportfiltersecondrowbold">
          <TextField 
            style={{ "width":"100%", "margin-left":"10px","margin-right":"10px","text-align": "left", color: '#3D4A52'}}
            id="filled-basic"
            variant="filled"
            label={screenlabels.dataset.search}
            value={props.cropSearchState}
            onChange={(e) => props.handleCropSearch(e)}
          />
      </Row>
      {/* <Row> */}
          {props.cropFilterDisplay && props.cropFilterDisplay.map((cropFilter) => (
              cropFilter.isDisplayed &&
              <FilterCheckBox
                label={cropFilter.name}
                checked={cropFilter.isChecked}
                handleCheckListFilterChange={() => props.handleFilterChange(cropFilter.index,screenlabels.dataset.crop)}
              />
          ))}
      {/* </Row> */}
      {/* <Row>
        {props.cropList && props.cropList.map((crop) => (
            <FilterCheckBox
                label={crop}
                checked={props.cropCheckStateList[props.cropMasterList.findIndex((c)=> c == crop)]}
                handleCheckListFilterChange={() => props.handleCheckListFilterChange("crop",props.cropMasterList.findIndex((c)=> c == crop))}
            />
        ))}  
      </Row> */}
      
    </div>
  )
}