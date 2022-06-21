import React, { useState } from 'react'
import logo from "../Images/logo.jpg"
import logo1 from "../Images/logo1.jpg"
import Badge from '@mui/material/Badge'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import { CardContent, Grid, NativeSelect, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import axios from "axios"
import Plot from "react-plotly.js";

const Header = () => {
    let [APIdata, setData] = useState(null)
    //To Store x values of graph
    let X = []
    //To Store y values of graph
    let Y = []

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
            <Grid container m={3}>
                <Typography variant='h6' sx={{ margin: "0px 20px" }}>Admin</Typography>
                <ArrowForwardIcon color="action" fontSize='large' />
                <Typography variant="h5" sx={{ marginLeft: "20px", color: "blue" }}>PendingOrders</Typography>
            </Grid>
            <Grid container ml={3}>
                <Typography variant="h3">Pending Orders</Typography>
            </Grid>



            {/* Third part Cards*/}
            <Grid container m={2}>
                {/* Let's Intialize x and y values before developing graph */}
                {APIdata && APIdata.map((user) =>{
                    X.push(user.CLINICIAN_NAME)
                })}
                {console.log("X",X)}
                <CardContent
                    sx={{ border: "1px solid white", width: "48%", marginRight: "20px", backgroundColor: "snow" }}
                >
                    {APIdata ? <Plot
                        data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: "bar",
                                orientation: 'h'
                            }
                        ]}
                        layout={{ width: "80%", height: "80%", title: "Histogram" }}

                    /> : ""}
                    {/* <Typography variant="h5" component="div">
                        benevolent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography> */}

                </CardContent>

                <CardContent
                    sx={{ border: "1px solid white", width: "48%", marginRight: "20px", backgroundColor: "snow" }}
                >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        benevolent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
            </Grid>

        </Grid>
    )
}

export default Header