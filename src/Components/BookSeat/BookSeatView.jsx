import React, { useRef } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import Bookseat from "../Shared/Bookseat";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import ConfirmDialog from "../Shared/ConfirmDialog";
import { connect } from "react-redux";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import { deleteBookSeat } from "../../Store/Actions/BookSeatActions";
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

// View Booking details
function BookSeatView(props) {
  const classes = useStyles();
  const confirmDialogRef = useRef();
  const updateBookseatRef = useRef();
  const book = props.book;
  const routes = props.routes;

  // Delete Booking
  const deleteBookSeat = () => {
    props.deleteBookSeat(book.id, (res) => {
      if (res.status) {
        props.handleSnackBar({
          type: "SHOW_SNACKBAR",
          msg: "Booking Seat Deleted Successfully!",
        });
      } else {
        props.handleSnackBar({
          type: "SHOW_SNACKBAR",
          msg: "Something Went Wrong.Please Delete Booking Again!",
        });
      }
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} container justify={"center"}>
      <ConfirmDialog ref={confirmDialogRef} deleteBookSeat={deleteBookSeat} />
      <Bookseat ref={updateBookseatRef} book={book} />
      <Card className={classes.root + " hoverable"}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography color={"primary"} align={"center"} variant={"h5"}>
                {book.bookNumber}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Route Number - ${book.routeNumber}`}
                icon={<TimelineIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Condition - ${book.type}`}
                icon={<AssignmentLateIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Sheets - ${book.sheets}`}
                icon={<AirlineSeatReclineNormalIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Pass Code - ${book.passcode}`}
                icon={<DeveloperModeIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Chip
                variant="outlined"
                size={"small"}
                label={`Driver - ${book.driver}`}
                icon={<AccountBoxIcon />}
              />
            </Grid>
          </Grid>
          <hr />
        </CardContent>
        <CardActions disableSpacing style={{ marginTop: "-30px" }}>
          <IconButton
            aria-label="add to favorites"
            style={{ color: "green", marginLeft: "auto" }}
            onClick={() => {
              updateBookseatRef.current.handleClickOpenForEdit(book, routes);
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              confirmDialogRef.current.handleClickOpen(
                `Do you need to delete the Booking : ${book.bookNumber}?`,
                `By confirming this, You give permission to delete Booking.Note that this process can not be revert!`,
                "deleteBookSeat"
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
    deleteBookSeat: (id, callback) => dispatch(deleteBookSeat(id, callback)),
  };
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  BookSeatView
);
