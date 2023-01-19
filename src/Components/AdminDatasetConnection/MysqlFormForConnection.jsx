import { Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, TextField, List, IconButton, Snackbar, Alert, Chip, Paper, Divider, Tooltip, Skeleton } from '@mui/material'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import StorageIcon from '@mui/icons-material/Storage';
import FaceIcon from '@mui/icons-material/Face';
import PasswordIcon from '@mui/icons-material/Password';
import LanguageIcon from '@mui/icons-material/Language';
import CableIcon from '@mui/icons-material/Cable';
import NoDatasetCard from '../Datasets/NoDatasetCard';
import Connection from './ConnectionProgressGif';
import HTTPService from '../../Services/HTTPService';
import Loader from '../Loader/Loader';
import UrlConstant from '../../Constants/UrlConstants';
import { useEffect } from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { GetErrorHandlingRoute, getTokenLocal, validateInputField } from '../../Utils/Common';
import RegexConstants from '../../Constants/RegexConstants';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import databasegif from "../../Assets/Img/database.gif"
import bellboygif from "../../Assets/Img/bellboy.gif"
import Axios from 'axios';
const MysqlFormForConnection = ({ isDatasetEditModeOn, handleMetadata, localUploaded, setAllFiles, datasetname, allFiles, setPostgresFileList, setMysqlFileList, mysqlFileList, postgresFileList, deleteFunc, cancelForm }) => {
  const history = useHistory();
  //exported file name
  const [exportedFileName, setExportedFileName] = useState("")
  console.log(localUploaded.length, "LOCAL")

  //states for the alert if any error occurs at any point in the form of snackbar
  const [messageForSnackBar, setMessageForSnackBar] = useState("")
  const [errorOrSuccess, setErrorOrSuccess] = useState("error") //options --> "error", "info", "success", "warning"
  //loaders states
  const [loader, setLoader] = useState(true)
  const [spinner, setSpinner] = useState(true)


  //connection details
  const [connectionData, setConnectionData] = useState({
    db_name: "",
    user_name: "",
    db_password: "",
    host_address: "",
    port: ""
  })

  //state to toggle the form to export state
  const [isConnected, setIsConnected] = useState(false)
  const [isExported, setIsExported] = useState(false)
  const [exportedFiles, setExportedFiles] = useState([
  ])

  //List of tables after successfull connection to DB
  const [dbData, setDbData] = useState([])

  //selected table name
  const [selectedTable, setSelectedTable] = useState("")

  //columns of selected table name after making a http request
  const [allColumns, setAllColumns] = useState([])

  //A function to create the object with status of checked on the basis of selection accepting the data as a list of columns
  const generateColumns = (data) => {
    let newCol = []
    for (let i = 0; i < data.length; i++) {
      let eachColumn = { checked: false, value: data[i] }
      newCol.push(eachColumn)
    }
    setAllColumns([...newCol])
  }

  //Connection establishment to the given database details
  const tryToConnect = () => {
    setLoader(true)
    setSpinner(true)

    //building the body for request object
    let bodyData = {
      database: connectionData.db_name,
      username: connectionData.user_name,
      password: connectionData.db_password,
      host: connectionData.host_address,
      port: connectionData.port,
      "database_type": "mysql"
    }

    //Making the post request for getting all the table list
    HTTPService('POST',
      UrlConstant.base_url + UrlConstant.connection_to_db_end_point,
      bodyData,
      false,
      true,
      false).then((res) => {
        console.log(res)
        setDbData([...res.data])
        setIsConnected(true)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Connection establishment done!")
        setErrorOrSuccess("success")
        handleClick()
        setLoader(false)
        setSpinner(false)


      }).catch((err) => {
        //if any error occurs displaying the error toast 
        console.log(err)
        setLoader(false)
        setSpinner(false)

        //setting the cookies upon the successfull response with the validity of 1 hour or till the time metadata and dataset upload done
        let dataForReset = {
          db_name: "",
          user_name: "",
          db_password: "",
          host_address: "",
          port: ""
        }

        //clear input fields
        setConnectionData({
          ...connectionData, ...dataForReset
        })

        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Connection establishment failed!")
        setErrorOrSuccess("error")
        handleClick() //toggling toast
        setIsConnected(false) // move to table form
      })
  }

  //toast for error
  const [open, setOpen] = React.useState(false);
  //handling toast
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //action for toast
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



  //on change of table name from a particular table name from select drop down
  const handleChange = (event) => {

    //making a get request for a particular table name to get the list of columns for rendering and selecting purpose
    let query = event.target.value;
    let method = 'POST'
    setLoader(true)
    setSelectedTable(query);

    let token = getTokenLocal();
    Axios({
      method: method,
      url: UrlConstant.base_url + UrlConstant.get_column_from_table_name,
      data: { table_name: query },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res, "changed")
        generateColumns([...res.data])
        setLoader(false)
      }).catch((err) => {
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Columns fetching failed. Please try again!") //error message set
        setErrorOrSuccess("error") //error type set 
        handleClick() //toggling toast
        setLoader(false)
      })
  };

  //sending the list of columns selected by admin/participant along with the xlsx/xls name (btn:export to xls)
  const sendingColumnsSelected = () => {

    let query = exportedFileName;
    let method = 'POST'
    let table_name = selectedTable
    setLoader(true)
    let selectedColumns = [];
    for (let i = 0; i < allColumns.length; i++) {
      if (allColumns[i].checked) selectedColumns.push(allColumns[i].value)
    }

    let newFormData = new FormData()

    newFormData.append("col", JSON.stringify(selectedColumns))
    newFormData.append("file_name", query)
    newFormData.append("dataset_name", datasetname)
    newFormData.append("source", "mysql")
    newFormData.append("table_name", table_name)

    let token = getTokenLocal();

    let url = ""
    if (isDatasetEditModeOn) {
      url = UrlConstant.base_url + UrlConstant.send_columns_to_export + "?dataset_exists=True"
    } else {
      url = UrlConstant.base_url + UrlConstant.send_columns_to_export
    }
    Axios({
      method: method,
      url,
      data: newFormData,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        setAllColumns([])
        generateColumns([])
        console.log(res)
        setExportedFileName("")
        setSelectedTable("")

        setExportedFiles([...res.data])
        setMysqlFileList([...res.data])
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File exported successfully!")
        setErrorOrSuccess("success")
        handleClick()
        setLoader(false)
        setIsExported(true)


      }).catch((err) => {
        //after suucess
        // setExportedFiles([...exportedFiles, query])
        setIsExported(false)
        setLoader(false)
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File export failed!")
        setErrorOrSuccess("error")
        handleClick()
      })
  }

  //handling connection details
  const handleConnectionData = (e) => {
    setConnectionData({ ...connectionData, [e.target.name]: e.target.value })
    console.log(connectionData)
  }

  //handling check for columns
  const handleCheckBoxCheck = (e, eachCol) => {
    let newColObj = { checked: e.target.checked, value: eachCol.value }
    let newAllCol = []
    for (let i = 0; i < allColumns.length; i++) {
      if (eachCol.value == allColumns[i].value) {
        newAllCol.push(newColObj)
      } else {
        newAllCol.push(allColumns[i])
      }
    }
    setAllColumns([...newAllCol])
  }

  //deleting the file uploaded/exported
  const handleDeleteDatasetList = (filename, source, datasetname) => {
    var bodyFormData = new FormData();

    bodyFormData.append("file_name", filename)
    bodyFormData.append("dataset_name", datasetname)
    bodyFormData.append("source", source)
    HTTPService(
      "DELETE",
      UrlConstant.base_url + UrlConstant.dataseteth,
      bodyFormData,
      true,
      true
    )
      .then((response) => {
        console.log("FILE DELETED!");
        if (response.status === 204) {
          console.log("file deleted")
          var filteredArray = mysqlFileList.filter((item) => item.name !== filename)
          setExportedFiles(filteredArray)
          setMysqlFileList(filteredArray)
        }
      })
      .catch((e) => {
        setLoader(false);
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      }
      );
  };



  // disconnect the databse and remove the creds from cookies
  const disconnectTheDatabase = () => {
    setIsConnected(false)

  }



  //delete the exported filesf
  function handleDeleteExportedFile(item) {
    let method = "DELETE"
    let query = item
    //taking token for authorization
    let token = getTokenLocal();
    Axios({
      method: method,
      url: UrlConstant.base_url + UrlConstant.send_columns_to_export,
      data: { xls_file_name: query },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        setExportedFiles([...res.data])

        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("File deleted successfully!")
        setErrorOrSuccess("success")
        handleClick()
        setLoader(false)
      }).catch((err) => {
        //after suucess
        // setExportedFiles([...exportedFiles, query])
        setLoader(false)
        console.log(err)
        //if error occurs Alert will be shown as Snackbar
        setMessageForSnackBar("Deletion failed!")
        setErrorOrSuccess("error")
        handleClick()
      })
  }

  //accordion change handler
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {

    setLoader(false)
  }, [])
  return (
    <>
      {loader && isConnected ? <Loader /> : ""}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
      >
        <Alert autoHideDuration={4000} onClose={handleClose} sx={{ width: '100%' }} severity={errorOrSuccess}>{messageForSnackBar}</Alert>
      </Snackbar>

      <Row >
        <Col lg={6} sm={12} style={{ textAlign: "left" }}>
          Please provide the database credentials
        </Col>
        <Col lg={6} sm={12} style={{ textAlign: "center" }}>
          <>
            <Tooltip title={isConnected ? `Connected to ${connectionData.db_name}` : ""}>
              <span>
                {isConnected ? `Connected to ${connectionData.db_name}` : `Not connected`}
                <img style={{ height: "30px", width: "30px" }} src={bellboygif} alt="database" />
                <span style={{ textDecoration: "line-through", color: isConnected ? "green" : "red", transition: "all 3s", background: isConnected ? "green" : "red", minWidth: isConnected ? "90px" : "10px", display: "inline-block", minHeight: "3px" }}></span>
                {isConnected ? <CheckIcon color='success' /> : <ClearIcon color='warning' />}
                <span style={{ textDecoration: "line-through", color: isConnected ? "green" : "red", transition: "all 3s", background: isConnected ? "green" : "red", minWidth: isConnected ? "10px" : "90px", display: "inline-block", minHeight: "3px" }}></span>
                <img style={{ height: "30px", width: "30px" }} src={databasegif} alt="database" />
              </span>
            </Tooltip>
          </>
        </Col>

      </Row>
      {!isConnected ? <> <Row className='textfield_row'>
        <Col lg={6} sm={12}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StorageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="db_name" value={connectionData.db_name} onChange={handleConnectionData} label="Database name" variant="standard" name='db_name' />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaceIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="user_name" label="User name" value={connectionData.user_name} onChange={handleConnectionData} name='user_name' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="db_password" name="db_password" value={connectionData.db_password} onChange={handleConnectionData} label="Password" type={"password"} variant="standard" />

          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="host_address" value={connectionData.host_address} onChange={handleConnectionData} label="Host/IP address" name='host_address' variant="standard" />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CableIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: "80%" }} id="port" value={connectionData.port} onChange={handleConnectionData} label="Port" name='port' variant="standard" />
        </Col>
        <Col lg={6} sm={12}> <Connection deleteFunc={deleteFunc} datasetname={datasetname} deleteMysqlFile={handleDeleteDatasetList} mysqlFileList={mysqlFileList} postgresFileList={postgresFileList} localUploaded={localUploaded} loader={loader} isConnected={isConnected} /></Col>
      </Row>
        <Row className='textfield_row' >
          <Col lg={6} sm={12}>
            {/* {localUploaded?.length > 0 && <Button onClick={(e) => handleMetadata(e, '2')} className='connect_btn'>Add metadata</Button>} */}
            <Button
              id='connect_btn_id'
              disabled={(connectionData.db_name.trim() != "" && connectionData.db_password.trim() != "" && connectionData.host_address.trim() != "" && connectionData.port.trim() != "" && connectionData.user_name.trim() != "" && datasetname != "") ? false : true}
              className='connect_btn green_btn_for_connect' onClick={tryToConnect}>Connect </Button>
            {/* <Button id='cancel_btn_id' className='connect_btn' onClick={() => cancelForm()}> Cancel </Button> */}
          </Col>
        </Row></> : <>
        <Row className='textfield_row'>
          <Col lg={6} sm={12} >
            <FormControl style={{ width: "80%" }}>
              <InputLabel id="demo-simple-select-label">Table name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="select_table_name"
                value={selectedTable}
                label="Table name"
                onChange={handleChange}
              >
                {dbData?.map((eachtableName, index) => {
                  return <MenuItem id={eachtableName + index} key={index} value={eachtableName}> {eachtableName}</MenuItem>
                })}
              </Select>
            </FormControl>
            {selectedTable ? <label htmlFor="">Select the columns:</label> : ""}
            <FormGroup style={{ height: "160px", overflow: "scroll", width: "80%" }}>
              {allColumns.length > 0 && allColumns.map((eachCol, index) => {
                console.log(eachCol)
                return <FormControlLabel control={<Checkbox key={index} onChange={(e) => handleCheckBoxCheck(e, eachCol)} checked={eachCol.checked} />} label={eachCol.value} />
              })}
            </FormGroup>
            <label htmlFor="">Columns selected :</label>
            <div style={{ width: "400px", overflowX: "scroll", margin: "5px 0px", height: "65px" }}>
              {allColumns?.map((eachColSelected) => {
                return (eachColSelected.checked ? <Chip label={eachColSelected.value} /> : "")
              })}
            </div>
            <TextField style={{ width: "80%" }} id="exportedFileName" value={exportedFileName} onChange={(e) => {
              validateInputField(e.target.value, RegexConstants.NO_SPACE_REGEX)
                ? setExportedFileName(e.target.value)
                : e.preventDefault()
            }} label="Export file name" variant="standard" />

          </Col>
          <Col lg={6} sm={12} style={{ textAlign: "center" }} >
            {isConnected && loader ? <>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
              <Skeleton variant="rectangular" width={210} height={60} />
            </>
              : ""}
            {!isExported ? <Connection datasetname={datasetname} deleteFunc={deleteFunc} postgresFileList={postgresFileList} isConnected={isConnected} mysqlFileList={mysqlFileList} localUploaded={localUploaded} /> :
              <Connection datasetname={datasetname} deleteFunc={deleteFunc} postgresFileList={postgresFileList} isConnected={isConnected} mysqlFileList={mysqlFileList} localUploaded={localUploaded} />
            }
          </Col>
        </Row>
        <Row className='textfield_row'>

          {(!isExported) ?
            <Col lg={6} sm={12}>
              {/* {localUploaded?.length > 0 && <Button onClick={(e) => handleMetadata(e, '2')} className='connect_btn'>Add metadata</Button>} */}
              <Button disabled={(exportedFileName != "" && selectedTable.name != "" && datasetname != "") ? false : true} onClick={() => {
                sendingColumnsSelected()
              }} className='connect_btn'>Export to XLS</Button>
              <Button onClick={(e) => { disconnectTheDatabase() }} className='disconnect_btn'>Disconnect</Button>
            </Col> :
            <Col lg={6} sm={12}>
              {/* <Button onClick={(e) => handleMetadata(e, '2')} className='connect_btn'>Add metadata</Button> */}
              <Button disabled={(exportedFileName != "" && selectedTable != "" && datasetname != "") ? false : true} onClick={() => {
                sendingColumnsSelected()
              }} className='connect_btn'>Export to XLS</Button>
              <Button onClick={(e) => { disconnectTheDatabase() }} className='disconnect_btn'>Disconnect</Button>
            </Col>}
        </Row>
      </>}
    </>
  )
}

export default MysqlFormForConnection 