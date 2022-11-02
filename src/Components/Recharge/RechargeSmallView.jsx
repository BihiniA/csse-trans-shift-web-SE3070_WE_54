import React, { useRef } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import RechargeDialog from "../Shared/RechargeDialog";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import ConfirmDialog from "../Shared/ConfirmDialog";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import { deletePayment } from "../../Store/Actions/RechargeAction";
import { deepPurple } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: deepPurple[500],
    color: "#fff",
  },
}));

function RechargeSmallView(props) {
  const classes = useStyles();
  const confirmDialogRef = useRef();
  const updatePassengersDialogRef = useRef();
  const payment = props.payment;

  // Delete Payment
  const deletePayment = () => {
    props.deletePayment(payment.id, (res) => {
      if (res.status) {
        props.handleSnackBar({
          type: "SHOW_SNACKBAR",
          msg: "Payment Deleted Successfully!",
        });
      } else {
        props.handleSnackBar({
          type: "SHOW_SNACKBAR",
          msg: "Something Went Wrong.Please Delete Payment Again!",
        });
      }
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
      <ConfirmDialog ref={confirmDialogRef} deletePayment={deletePayment} />
      <Card className={classes.root + " hoverable"}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={15}>
              <Typography color={"primary"} align={"center"} variant={"h5"}>
                {payment.amount}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Name - ${payment.name}`}
                icon={<TimelineIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Card Number - ${payment.card}`}
                icon={<AssignmentLateIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`CVC - ${payment.cvc}`}
                icon={<AirlineSeatReclineNormalIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Expiery Date - ${payment.exp}`}
                icon={<AccountBoxIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Payed Date - ${payment.pay_date}`}
                icon={<DeveloperModeIcon />}
              />
            </Grid>
          </Grid>
          <hr />
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: "-30px" }}>
          <IconButton
            onClick={() => {
              confirmDialogRef.current.handleClickOpen(
                `Do you need to delete the Payment : ${payment.amount}?`,
                `By confirming this, You give permission to delete Payment.Note that this process can not be revert!`,
                "deletePayment"
              );
            }}
            aria-label="share"
            color={"secondary"}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

// Database connection
const mapDispatchToProps = (dispatch) => {
  return {
    handleSnackBar: (status) => dispatch(status),
    deletePayment: (id, callback) => dispatch(deletePayment(id, callback)),
  };
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  RechargeSmallView
);
