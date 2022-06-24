import React, { useState } from 'react'
import logo from "../Images/logo.jpg"
import logo1 from "../Images/logo1.jpg"
import Badge from '@mui/material/Badge'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import { CardContent, FormControl, Grid, MenuItem, NativeSelect, Select, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import axios from "axios"
import Plot from "react-plotly.js";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {

    // Declaring a Value to Store API Data
    let [APIdata, setData] = useState(null)

    //Intializing X and Y values to use them as x-axis and y-axis for Graph
    let X = []
    let Y = []
    if (APIdata) {
        for (var a in APIdata) {
            X.push(APIdata[a].counts)
            Y.push(APIdata[a].CLINICIAN_NAME)
        }
    }

    // This is the value  is going to be used in Graph <plot>-layout-width and we use innerWidth of browser to change layout width value for Responsive Websites
    const [mediaWidth, setmediaWidth] = useState(window.innerWidth)

    //defaultLayOutWidth starting takes 600 width which is suitable for default responsive desktop page
    let defaultLayOutWidth = 600
    
    useEffect(() => {
        //Getting the Data from API using Axios
        const fetchData = async () => {
            const data1 = await axios.get("https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users-count").
                then((response) => { setData(response.data) }).catch((err) => { console.log(err.message) })
        }
        fetchData()

        //Here we use this function to catch the change in media-width and we will store that value in the mediaWidth state.
        function handlemediaWidth(){
            setmediaWidth(window.innerWidth)
        }
        window.addEventListener("resize",handlemediaWidth)
    }, [])

    return (

        <Grid id="container" container>
            {/* NAVBAR */}
            <div id="nav">
                <ul>
                    <li><a href='#'><img src={logo1} id="logo1" /></a></li>
                    <li className='textLi'>
                        <select>
                            <option value="1">Clinical</option>
                        </select>
                    </li>
                    <li className='textLi'>
                        <select>
                            <option value="2">Business Developmnet</option>
                        </select>
                    </li>
                    <li className='textLi' >
                        <select id='colorLi'>
                            <option value="0">Admin</option>
                            <option value="1">Client</option>
                        </select>
                    </li>

                    {/* Making to float few li's to Right Side */}
                    <li id='navright'>
                        <a href='#'><img src={logo} id="logo" /></a>
                    </li>
                    <li li id='navright'>
                        <Badge badgeContent={4} color="primary">
                            <CircleNotificationsIcon color="action" fontSize='large' />
                        </Badge>
                    </li>
                    <li id='navright'>
                        <Grid container>
                            <InputLabel id="demo-simple-select-helper-label">
                                <AccountCircleIcon color="action" fontSize='large' />
                            </InputLabel>
                            <ArrowDropDownIcon color="action" fontSize='large' />
                        </Grid>
                    </li>
                </ul>
            </div>

            {/* second part after Navbar */}
            <Grid container mt={2} mb={2}>
                <Typography variant='h6' sx={{ margin: "0px 10px" }} id="secondPart" >Admin</Typography>
                <ArrowForwardIcon color="action" fontSize='large'/>
                <Typography variant="h5" sx={{color: "blue"}} id="secondPart">PendingOrders</Typography>
            </Grid>
            <Grid container>
                <Typography variant="h3" id="secondPart">Pending Orders</Typography>
            </Grid>

            {/* Before Working with Graphs we will take the present mediaWidth value and based on the mediawidth 
            we'll change our defaultLatOutWidth and we'll store it in <Plot>-layout width for responsive Page*/}
            {
                (console.log(mediaWidth),mediaWidth<700 ? defaultLayOutWidth = 300 : defaultLayOutWidth=600)
            }

            {/* Third part of Task : Cards Block*/}
            <Grid container id="cards">

                {/* FirstCard which contains Grap */}
                <CardContent id="card1">
                    {APIdata ?
                        <Grid>
                            <Grid id="graph">
                                <RemoveRedEyeIcon color="action" fontSize='large' />
                                <VisibilityOffIcon color="action" fontSize='large' />
                                <ChangeCircleIcon color="action" fontSize='large' />
                                <span style={{fontWeight: "bold"}}><button>HIstogram</button></span>
                            </Grid>
                            <Plot
                                id="plot"
                                data={[{ x: X, y: Y, type: "bar", orientation: 'h', autosize: "false" }]}
                                 layout={{
                                    height: 900,width:defaultLayOutWidth,
                                    margin: {l: 110, r: 0, t: 0, b: 0 }
                                 }}   
                            />
                        </Grid> : ""}</CardContent>



                {/* Second Card which contains Some data*/}
                <CardContent id="card2">

                   <Grid id="card2Margin">
                     {/* Card2 First Part Date And Time */}
                     <Grid>
                        <TextField className="date1" label="StartDate" type="date" InputLabelProps={{ shrink: true }} />
                        <TextField className="date1" label="EndDate" type="date" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* card2 Second part */}
                    <Grid container>
                        <Grid  className="card2Text">
                            <Typography variant='h4'>Pending Orders</Typography>
                            <Typography variant='h5'>90</Typography>
                        </Grid>
                        <Grid className="card2Text">
                            <Typography variant='h4'>Revenue On Hold</Typography>
                            <Typography variant='h5'>$3000</Typography>
                        </Grid>
                    </Grid>

                    {/* card 2 Third Part */}
                    <Grid container className="card2SubcardsMain">
                        <Grid className='card2subcards'>
                            <Typography variant='h5'>In House Preprocessing</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$1000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{color:"blue"}}>View Details</a>
                            </Grid>
                        </Grid>

                        <Grid className='card2subcards'>
                            <Typography variant='h5'>Pending Signatures</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$1000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{ color: "blue" }}>View Details</a>
                            </Grid>
                        </Grid>
                    </Grid>


                    {/* card2 Fourth Part */}
                    <Grid container className="card2SubcardsMain">
                        <Grid className='card2subcards'>
                            <Typography variant='h5'>To Be Sent</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>20</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>30</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$5000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{ color: "blue" }}>View Details</a>
                            </Grid>
                        </Grid>

                        <Grid className='card2subcards'>
                            <Typography variant='h5'>Recieved Orders</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>18</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>21</Typography>
                                </Grid>
                                <Grid className='card2subcardstext'>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$8000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{ color: "blue" }}>View Details</a>
                            </Grid>
                        </Grid>
                    </Grid>
                   </Grid>

                </CardContent>
            </Grid>

        </Grid>
    )
}

export default Header