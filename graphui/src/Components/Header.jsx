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

const Header = () => {
    let [APIdata, setData] = useState(null)
    //To Store x values of graph
    let X = []
    //To Store y values of graph
    let Y = []
    if (APIdata) {
        for (var a in APIdata) {
            X.push(APIdata[a].counts)
            Y.push(APIdata[a].CLINICIAN_NAME)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let data1 = await axios.get("https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users-count").
                then((response) => { setData(response.data) }).catch((err) => { console.log(err.message) })
        }
        fetchData()
    }, [])

    return (
        <Grid id="container" container>
            {/*NavBar1*/}
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
                    <li id='navright'>
                        <Grid container>
                            <InputLabel id="demo-simple-select-helper-label">
                                <AccountCircleIcon color="action" fontSize='large' />
                            </InputLabel>
                            <NativeSelect defaultValue={0}>
                                <option value={0}></option>
                                <option value={10}>USER1</option>
                                <option value={20}>User2</option>
                            </NativeSelect>
                        </Grid>
                    </li>
                    <li li id='navright'>
                        <Badge badgeContent={4} color="primary">
                            <CircleNotificationsIcon color="action" fontSize='large' />
                        </Badge>
                    </li>
                    <li id='navright'>
                        <a href='#'><img src={logo} id="logo" /></a>
                    </li>
                </ul>
            </div>

            {/* Second Part */}
            <Grid container mt={2} mb={2}>
                <Typography variant='h6' sx={{ margin: "0px 20px" }}>Admin</Typography>
                <ArrowForwardIcon color="action" fontSize='large' />
                <Typography variant="h5" sx={{ marginLeft: "20px", color: "blue" }}>PendingOrders</Typography>
            </Grid>
            <Grid container>
                <Typography variant="h3">Pending Orders</Typography>
            </Grid>



            {/* Third part Cards*/}
            <Grid container m={1}>
                {/* Let's Intialize x and y values before developing graph */}

                <CardContent
                    sx={{ border: "1px solid white", width: "48%", backgroundColor: "snow" }} m={1}
                >
                    {APIdata ?
                        <Grid>
                            <Grid sx={{ float: 'right', padding: "5px" }}>
                                <RemoveRedEyeIcon color="action" fontSize='large' />
                                <VisibilityOffIcon color="action" fontSize='large' />
                                <ChangeCircleIcon color="action" fontSize='large' />
                                <span style={{ fontWeight: "bold" }}><button>HIstogram</button></span>
                            </Grid>
                            <Plot
                                id="plot"
                                data={[{ x: X, y: Y, type: "bar", orientation: 'h', autosize: "false" }]}
                                layout={{
                                    width: 600, height: 900,
                                    margin: { l: 104, r: 0, t: 0, b: 0 }
                                }}

                            />
                        </Grid> : ""}</CardContent>


                {/* Second Card */}
                <CardContent 
                    sx={{ border: "1px solid white", position:"relative",width: "48%", backgroundColor: "snow",marginLeft:"5px"
                    }}>

                   <Grid mt={10}>
                     {/* Card2 First PArt Date And Time */}
                     <Grid sx={{ margin: "auto" }} m={3}>
                        <TextField id="date" label="StartDate" type="date" InputLabelProps={{ shrink: true }}
                            sx={{ width: "49%", backgroundColor: "aliceblue", marginRight: "2px" }} />
                        <TextField id="date" label="EndDate" type="date" InputLabelProps={{ shrink: true }}
                            sx={{ width: "49%", backgroundColor: "aliceblue" }} />
                    </Grid>

                    {/* card2 SEcond part */}
                    <Grid container>
                        <Grid m={3}>
                            <Typography variant='h4'>Pending Orders</Typography>
                            <Typography variant='h5'>90</Typography>
                        </Grid>
                        <Grid m={3}>
                            <Typography variant='h4'>Revenue On Hold</Typography>
                            <Typography variant='h5'>$3000</Typography>
                        </Grid>
                    </Grid>

                    {/* card 2 Third Part */}
                    <Grid container m={1}>
                        <Grid sx={{ border: "1px solid black" }} m={1}>
                            <Typography variant='h5'>In House Preprocessing</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid m={1}>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$1000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{ color: "blue" }}>View Details</a>
                            </Grid>
                        </Grid>

                        <Grid sx={{ border: "1px solid black" }} m={1}>
                            <Typography variant='h5'>Pending Signatures</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid m={1}>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
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
                    <Grid container m={1}>
                        <Grid sx={{ border: "1px solid black" }} m={1}>
                            <Typography variant='h5'>In House Preprocessing</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid m={1}>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Revenue</Typography>
                                    <Typography variant='body'>$1000</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid>
                                <a style={{ color: "blue" }}>View Details</a>
                            </Grid>
                        </Grid>

                        <Grid sx={{ border: "1px solid black" }} m={1}>
                            <Typography variant='h5'>Pending Signatures</Typography>
                            <hr />
                            <Grid container mt={1}>
                                <Grid m={1}>
                                    <Typography variant='h6' >Orders</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
                                    <Typography variant='h6' >Episodes</Typography>
                                    <Typography variant='body'>10</Typography>
                                </Grid>
                                <Grid m={1}>
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
                   </Grid>

                </CardContent>
            </Grid>

        </Grid>
    )
}

export default Header