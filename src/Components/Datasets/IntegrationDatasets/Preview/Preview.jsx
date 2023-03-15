import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "../dataset_integration.module.css"
import download_data from "../../../../Assets/Img/download_data.svg";
import { DataGrid } from '@mui/x-data-grid';
import NoDataAvailable from '../../../Dashboard/NoDataAvailable/NoDataAvailable';
import { Affix, Button } from 'antd';


function NoResultsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            No results in DataGrid
            {/* <pre>(rows=&#123;rowData&#125;)</pre> */}
            {/* But local filter returns no result */}
        </Stack>
    );
}
function NoRowsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            {/* No data available for preview */}
            <NoDataAvailable />
            {/* <pre>(rows=&#123;[]&#125;)</pre> */}
        </Stack>
    );
}
const Preview = (props) => {

    const { generateData, setIsDatasetIntegrationListModeOn, deleteConnector, counterForIntegrator, completeData, isEditModeOn, integrateMore, resetAll, generatedConnectorData, finalDatasetAfterIntegration, downloadDocument } = props
    const [col, setCol] = useState([])
    const [row, setRow] = useState([])
    useEffect(() => {
        if (finalDatasetAfterIntegration.length > 0) {
            let val = []

            for (let key in finalDatasetAfterIntegration[0]) {
                let obj = { field: key, headerName: key, width: 300 }
                val.push(obj)
            }
            let rowArr = []
            for (let i = 0; i < finalDatasetAfterIntegration.length; i++) {
                let obj1
                if (finalDatasetAfterIntegration[i]["id"]) {
                    obj1 = { ...finalDatasetAfterIntegration[i] }
                    //console.log(obj1)
                } else {
                    //console.log(obj1)
                    obj1 = { "id": i, ...finalDatasetAfterIntegration[i] }
                }
                rowArr.push(obj1)
            }
            //console.log(val, rowArr)
            setCol([...val])
            setRow([...rowArr])
        }
    }, [finalDatasetAfterIntegration])

    return (
        <Container className='dataset_selector_in_integration'>
            <Row id='previewTable' className={styles.select_dataset_logo}>
                <Col lg={12} sm={12} sx={12}>
                    Preview
                </Col>
            </Row>
            <Row style={{ marginBottom: "50px" }}>
                <Col lg={12} sm={12}>
                    <div style={{ height: 700, width: '100%' }}>
                        { }
                        <DataGrid
                            rows={row}
                            columns={col}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            // disableColumnFilter
                            // disableColumnMenu
                            // disableColumnSelector
                            // disableSelectionOnClick
                            // disableDensitySelector
                            components={{ NoRowsOverlay, NoResultsOverlay }}


                        />
                    </div>
                </Col>
            </Row>
            <Row className={styles.select_dataset_logo}>
                <Col lg={12}>
                    Download
                </Col>
            </Row>
            <Row style={{ textAlign: "left" }}>
                <Col lg={3} sm={12} className={styles.data_before_download}>
                    <div>File name</div>
                    {/* <div className='text-truncate' >{generatedConnectorData?.file_name}.csv</div> */}
                </Col>
                <Col lg={3} sm={12} className={styles.data_before_download}>
                    <div>Datasets</div>
                    {/* <div className='text-truncate'>{generatedConnectorData.datasets?.map((each) => `${each}, `)}</div> */}
                </Col>
                <Col lg={3} sm={12} className={styles.data_before_download}>
                    <div>No.of records</div>
                    {/* <div className='text-truncate'>{generatedConnectorData?.no_of_records}</div> */}
                </Col>
                <Col lg={3} sm={12} className={styles.generate_btn_parent_col}>
                    {/* <Affix onChange={(affixed) => console.log(affixed, "read for dowload")} style={{ backgrond: "white", transition: "all 2s", visibility: counterForIntegrator != completeData.length ? "hidden" : "visible" }} offsetBottom={20}> */}
                    {/* <div style={{ textAlign: "right" }}> */}
                    {/* <Fab onClick={() => integrateMore(1)} style={{ color: "white", background: "#c09507", }} variant="extended" aria-label="add">
                        <AddIcon /> Integrate more
                    </Fab> */}
                    <Button id='download_button' disabled={Object.keys(finalDatasetAfterIntegration).length > 0 ? false : true} className={(Object.keys(finalDatasetAfterIntegration).length > 0 ? styles.generate_data_btn : styles.generate_data_btn_dis) + " " + styles.heightwidth + " " + styles.flexForBtn} onClick={() => downloadDocument()}>
                        <img src={download_data} alt="Download" className={styles.download_btn} /> <span>Download CSV file</span>
                    </Button>
                    {/* </div> */}
                    {/* </Affix> */}
                </Col>
            </Row>
            <hr />
            <Row style={{ marginTop: "50px" }}>
                <Col lg={3}></Col>
                <Col lg={2}>
                    <Button resetAll={() => resetAll(true, true, true, true, setCol, setRow)} className={styles.cancelBtn}>Cancel</Button>
                </Col>
                <Col lg={3}>
                    <Button onClick={() => integrateMore(1)} className={styles.generate_data_btn}>Integrate more datasets</Button>
                </Col>
                <Col lg={2}>
                    {finalDatasetAfterIntegration.length > 0 &&
                        <Button onClick={() => generateData(1, "save")} className={styles.save_btn}>Save connector</Button>}
                </Col>
                <Col lg={2}>
                    {true &&
                        <Button onClick={() => deleteConnector()} className={styles.delete_btn}>Delete connector</Button>}
                </Col>
            </Row>
        </Container >
    )
}

export default Preview