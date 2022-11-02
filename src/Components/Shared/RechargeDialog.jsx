import { addPayment } from "../../Store/Actions/RechargeAction";
import AlertDialog from "./AlertDialog";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React, { Component, createRef } from "react";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import PaymentValidations from "../../Functions/Validations/PaymentValidations/PaymentValidations";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class RechargeDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      purpose: "Create",
      id: null,
      amount: "",
      name: "",
      card: "",
      cvc: "",
      exp: "",
      pay_date: "",
    };
  }

  alertDialog = createRef();

  handleClickOpenForCreate = (routes) => {
    this.setState({
      purpose: "Create",
      open: true,
      routes: routes,
    });
  };

  handleClickOpenForEdit = (payment) => {
    this.setState({
      open: true,
      purpose: "Edit",
      id: payment.id,
      amount: payment.amount,
      name: payment.name,
      card: payment.card,
      cvc: payment.cvc,
      exp: payment.exp,
      pay_date: payment.pay_date,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      purpose: "Create",
      id: null,
      amount: "",
      name: "",
      card: "",
      cvc: "",
      exp: "",
      pay_date: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = () => {
    let details = {
      amount: this.state.amount,
      name: this.state.name,
      card: this.state.card,
      cvc: this.state.cvc,
      exp: this.state.exp,
      pay_date: this.state.pay_date,
    };

    const result = PaymentValidations(details);

    if (result.status) {
      if (this.state.purpose === "Create") {
        this.props.addPayment(details, (res) => {
          if (res.status) {
            this.props.handleSnackBar({
              type: "SHOW_SNACKBAR",
              msg: "Recharged Your Account Successfully!",
            });
            this.handleClose();
          } else {
            this.alertDialog.current.handleClickOpen(
              "Error Occurred!",
              `Something Went Wrong.Please Add Payment Again`
            );
          }
        });
      }
    } else {
      this.alertDialog.current.handleClickOpen(
        "Form Validation Error!",
        result.error
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {<AlertDialog ref={this.alertDialog} />}
        <Dialog
          open={this.state.open}
          aria-labelledby="form-dialog-title"
          TransitionComponent={Transition}
          maxWidth={"md"}
          fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">
            {" "}
            Recharge Your Account
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                {/* Add Amount  */}
                <TextField
                  id="amount"
                  name="amount"
                  label="Amount Added"
                  fullWidth
                  value={this.state.amount}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Passenger Name */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="name"
                  name="name"
                  label="Passenger Name"
                  fullWidth
                  value={this.state.name}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Credit Card Number */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="card"
                  name="card"
                  label="Credit Card Number"
                  fullWidth
                  value={this.state.card}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* CVV */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="cvc"
                  name="cvc"
                  label="CVC"
                  fullWidth
                  value={this.state.cvc}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>
            </Grid>

            {/* Expiery Date */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  type={"date"}
                  id="exp"
                  name="exp"
                  label="Expiery Date"
                  fullWidth
                  value={this.state.exp}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Payment Date */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  type={"date"}
                  id="pay_date"
                  name="pay_date"
                  label="Payment Date"
                  fullWidth
                  value={this.state.pay_date}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()}>Cancel</Button>
            <Button onClick={() => this.submit()}>
              {this.state.purpose} Payments
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSnackBar: (status) => dispatch(status),
    addPayment: (details, callback) => dispatch(addPayment(details, callback)),
  };
};
export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  RechargeDialog
);
