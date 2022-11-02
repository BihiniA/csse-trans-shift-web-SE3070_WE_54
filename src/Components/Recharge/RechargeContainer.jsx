import React, {useRef} from "react";
import AddIcon from '@material-ui/icons/Add';
import Backdrop from "@material-ui/core/Backdrop";
import RechargeDialog from "../Shared/RechargeDialog";
import RechargeSmallView from "./RechargeSmallView";
import CircularProgress from "@material-ui/core/CircularProgress";
import {compose} from "redux";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import {withRouter} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));


function RechargeContainer(props) {
    const classes = useStyles();
    let { payments} = props;

    const addPaymentsDialogRef = useRef();
    return (


        <React.Fragment>
            {(!isLoaded(payments))
                ? <Backdrop open={true}>
                    <CircularProgress style={{color: "#fff"}}/>
                </Backdrop>
                :
                <Container
                    maxWidth="lg"
                    style={{marginBottom: "50px", marginTop: "50px"}}
                >
                    <RechargeDialog ref={addPaymentsDialogRef} />
                    <Grid container style={{marginTop: "50px"}}>
                        <Grid xs={12} item>
                            <Typography align={"center"} variant={"h4"} gutterBottom>
                                All Recharge Payments
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction={"row"}>
                        {payments && payments.map(payment => {
                            return <RechargeSmallView key={payment.id} payment={payment} />
                        })}
                    </Grid>

                    <Tooltip title="Add Payment" arrow>
                        <Fab
                            size="small"
                            className={classes.fab}
                            color={"primary"}
                            onClick={() => {
                                addPaymentsDialogRef.current.handleClickOpenForCreate();
                            }}
                        >
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </Container>
            }
        </React.Fragment>

    )
}
// Database connection
const mapStateToProps = (state) => {
    return {
        payments: state.firestore.ordered.Payments,
        
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        return [
            {
                collection: 'Payments',
            }
            
        ]
    })
)(withRouter(RechargeContainer))