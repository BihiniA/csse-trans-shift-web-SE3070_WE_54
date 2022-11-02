import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Components/Login";
import DashBoard from "./Components/DashBoard";
import BookContainer from "./Components/BookSeat/BookContainer";
import EmployeePrivateRoute from "./Components/EmployeePrivateRoute";
import NavigationBar from "./Components/Shared/NavigationBar";
import Profile from './Components/profile/Profile';
import Recharge from './Components/Recharge/RechargeContainer'
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import SnackBar from "./Components/Shared/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import "./App.css"
import { Warning } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';


function App({ location, snackBar, backdrop }) {
    const [currentPath, setCurrentPath] = useState(location.pathname);
    const navBarVisibility = () => {
        if (
            currentPath === "/home"
        ) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);
    const Theme = responsiveFontSizes(createMuiTheme({
        palette: {
            primary: grey,
            type: "dark",
        },
    }));

    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline />
            {(navBarVisibility()) ? <NavigationBar /> : <div />}

            {(snackBar.isShow)
                ? <SnackBar msg={snackBar.msg} />
                : <React.Fragment />
            }

            <Backdrop style={{ zIndex: "2500" }} open={backdrop.isShow}>
                <CircularProgress style={{ color: "#fff" }} />
            </Backdrop>

            {/* Create Router path */}
            <Switch>
                <EmployeePrivateRoute exact path="/dashboard/profile">
                    <Profile />
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard/recharge">
                    <Recharge />
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard/seat">
                    <BookContainer />
                </EmployeePrivateRoute>
                <EmployeePrivateRoute exact path="/dashboard">
                    <DashBoard />
                </EmployeePrivateRoute>

                <Route exact path={"/home"} component={Login} />
            </Switch>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {
        backdrop: state.isShow,
        snackBar: state.snackBar,
    }
};

export default compose(
    connect(mapStateToProps),
    withRouter
)(App)
