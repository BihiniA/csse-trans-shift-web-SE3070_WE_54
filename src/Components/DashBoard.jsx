import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import DashboardItem from "./DashboardItem";
import Grid from "@material-ui/core/Grid";
// import ReportsContainer from "./Reports/ReportsContainer";
import Typography from "@material-ui/core/Typography";

export default class DashBoard extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Grid container style={{ marginTop: "75px" }}>
            {/* Redirect to the Passenger dashboard */}
            <Grid xs={12} item>
              <Typography align={"center"} variant={"h4"} gutterBottom>
                <h1> Passenger Dashboard </h1>
              </Typography>
            </Grid>

            {/* Redirect to the Account Informations */}
            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "25px" }}>
              <DashboardItem type={"accountinfo"} />
            </Grid>

            {/* Redirect to the seat booking */}
            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "25px" }}>
              <DashboardItem type={"bookaseat"} />
            </Grid>

            {/* Redirect to the Travel History */}
            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "25px" }}>
              <DashboardItem type={"travelhistory"} />
            </Grid>

            {/* Redirect to the Recharge account */}
            <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: "25px" }}>
              <DashboardItem type={"rechargeaccount"} />
            </Grid>
            <Grid item xs={12}>
              {/* <ReportsContainer /> */}
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
