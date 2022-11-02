import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { green, red, orange, blue } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import DirectionsIcon from "@material-ui/icons/Directions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paperTop: {
    position: "relative",
    width: "70px",
    height: "70px",
    zIndex: 2,
    color: "white",
    marginLeft: theme.spacing(3),
    padding: theme.spacing(2),
  },
  paper: {
    position: "relative",
    zIndex: 1,
    marginTop: -theme.spacing(8),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(5),
  },
}));

function DashboardItem(props) {
  const classes = useStyles();

  let accountinfo = props.accountinfo;
  let bookaseat = props.bookaseat;
  let travelhistory = props.travelhistory;
  let rechargeaccount = props.rechargeaccount;

  const Redirect = (path) => {
    props.history.push(`/dashboard/${path}`);
  };

  if (!isLoaded(accountinfo && bookaseat && travelhistory && rechargeaccount)) {
    return (
      <Backdrop open={true}>
        <CircularProgress style={{ color: "#fff" }} />
      </Backdrop>
    );
  } else {
    if (props.type == "accountinfo") {
      return (
        <React.Fragment>
          <div className="box" style={{ marginTop: "46px" }}>
            <Paper
              onClick={() => {
                Redirect("accountinfo");
              }}
              style={{ backgroundColor: orange[500] }}
              elevation={5}
              className={classes.paperTop + " hoverable"}
            >
              <Grid container justify={"center"} alignItems={"center"}>
                <DirectionsBusIcon fontSize={"large"} />
              </Grid>
            </Paper>
            <div className="colo" style={{ marginTop: "-95px" }}>
              <Paper
                style={{ backgroundColor: orange[500] }}
                onClick={() => {
                  Redirect("profile");
                }}
                elevation={5}
                className={classes.paper + " hoverable"}
              >
                <Grid container justify={"flex-end"}>
                  <Grid item>
                    <Typography
                      variant={"body1"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      Account Info
                    </Typography>
                    <Typography
                      variant={"h5"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      {accountinfo && accountinfo.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (props.type == "bookaseat") {
      return (
        <React.Fragment>
          <div className="box" style={{ marginTop: "46px" }}>
            <Paper
              onClick={() => {
                Redirect("bookaseat");
              }}
              style={{ backgroundColor: green[500] }}
              elevation={5}
              className={classes.paperTop + " hoverable"}
            >
              <Grid container justify={"center"} alignItems={"center"}>
                <DirectionsIcon fontSize={"large"} />
              </Grid>
            </Paper>
            <div className="colo" style={{ marginTop: "-95px" }}>
              <Paper
                style={{ backgroundColor: green[500] }}
                onClick={() => {
                  Redirect("seat");
                }}
                elevation={5}
                className={classes.paper + " hoverable"}
              >
                <Grid container justify={"flex-end"}>
                  <Grid item>
                    <Typography
                      variant={"body1"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      Book a Seat
                    </Typography>
                    <Typography
                      variant={"h5"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      {bookaseat && bookaseat.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (props.type == "travelhistory") {
      return (
        <React.Fragment>
          <div className="box" style={{ marginTop: "46px" }}>
            <Paper
              onClick={() => {
                Redirect("travelhistory");
              }}
              style={{ backgroundColor: red[500] }}
              elevation={5}
              className={classes.paperTop + " hoverable"}
            >
              <Grid container justify={"center"} alignItems={"center"}>
                <EventAvailableIcon fontSize={"large"} />
              </Grid>
            </Paper>
            <div className="colo" style={{ marginTop: "-95px" }}>
              <Paper
                style={{ backgroundColor: red[500] }}
                onClick={() => {
                  Redirect("history");
                }}
                elevation={5}
                className={classes.paper + " hoverable"}
              >
                <Grid container justify={"flex-end"}>
                  <Grid item>
                    <Typography
                      variant={"body1"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      Travel History
                    </Typography>
                    <Typography
                      variant={"h5"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      {travelhistory && travelhistory.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="box" style={{ marginTop: "46px" }}>
            <Paper
              onClick={() => {
                Redirect("rechargeaccount");
              }}
              style={{ backgroundColor: blue[500] }}
              elevation={5}
              className={classes.paperTop + " hoverable"}
            >
              <Grid container justify={"center"} alignItems={"center"}>
                <GroupIcon fontSize={"large"} />
              </Grid>
            </Paper>
            <div className="colo" style={{ marginTop: "-95px" }}>
              <Paper
                style={{ backgroundColor: blue[500] }}
                onClick={() => {
                  Redirect("recharge");
                }}
                elevation={5}
                className={classes.paper + " hoverable"}
              >
                <Grid container justify={"flex-end"}>
                  <Grid item>
                    <Typography
                      variant={"body1"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      Recharge Account
                    </Typography>
                    <Typography
                      variant={"h5"}
                      style={{ color: "#fff" }}
                      align={"right"}
                    >
                      {rechargeaccount && rechargeaccount.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    accountinfo: state.firestore.ordered.accountinfo,
    bookaseat: state.firestore.ordered.bookaseat,
    travelhistory: state.firestore.ordered.travelhistory,
    rechargeaccount: state.firestore.ordered.rechargeaccount,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "accountinfo",
      },
      {
        collection: "bookaseat",
      },
      {
        collection: "travelhistory",
      },
      {
        collection: "rechargeaccount",
      },
    ];
  })
)(withRouter(DashboardItem));
