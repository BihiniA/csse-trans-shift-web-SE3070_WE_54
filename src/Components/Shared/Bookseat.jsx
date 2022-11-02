import { addBookseat } from "../../Store/Actions/BookSeatActions";
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

class Bookseat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      purpose: "Create",
      id: null,
      name: "",
      destination: "",
      time: "",
      date: "",
      route: "",
      noofseats: "",
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

  handleClickOpenForEdit = (book) => {
    this.setState({
      open: true,
      purpose: "Edit",
      id: book.id,
      name: book.name,
      destination: book.destination,
      time: book.time,
      date: book.date,
      route: book.route,
      noofseats: book.noofseats,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      purpose: "Create",
      id: null,
      name: "",
      destination: "",
      time: "",
      date: "",
      route: "",
      noofseats: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submit = () => {
    let details = {
      name: this.state.name,
      destination: this.state.destination,
      time: this.state.time,
      date: this.state.date,
      route: this.state.route,
      noofseats: this.state.noofseats,
    };

    const result = PaymentValidations(details);

    if (result.status) {
      if (this.state.purpose === "Create") {
        this.props.addBookseat(details, (res) => {
          if (res.status) {
            this.props.handleSnackBar({
              type: "SHOW_SNACKBAR",
              msg: "Booking Successfully!",
            });
            this.handleClose();
          } else {
            this.alertDialog.current.handleClickOpen(
              "Error Occurred!",
              `Something Went Wrong.Please Add Booking Again`
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
          <DialogTitle id="form-dialog-title"> Add Booking</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={12} md={4}>
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
              </Grid> */}

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

              {/* Destination */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="destination"
                  name="destination"
                  label="Destination"
                  fullWidth
                  value={this.state.destination}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Time */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="time"
                  name="time"
                  label="Time"
                  fullWidth
                  value={this.state.time}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>
            </Grid>

            {/* Booking Date */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  type={"date"}
                  id="date"
                  name="date"
                  label="Booking Date"
                  fullWidth
                  value={this.state.date}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Route */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="route"
                  name="route"
                  label="Route"
                  fullWidth
                  value={this.state.route}
                  onChange={(e) => {
                    this.handleInput(e);
                  }}
                />
              </Grid>

              {/* Number Of Seats */}
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="noofseats"
                  name="noofseats"
                  label="Number Of Seats"
                  fullWidth
                  value={this.state.noofseats}
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
              {this.state.purpose} bookseat
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
    addBookseat: (details, callback) =>
      dispatch(addBookseat(details, callback)),
  };
};
export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  Bookseat
);
