import React, { useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import Backdrop from "@material-ui/core/Backdrop";
import Bookseat from "../Shared/Bookseat";
import BookSeatView from "./BookSeatView";
import CircularProgress from "@material-ui/core/CircularProgress";
import { compose } from "redux";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

function BookContainer(props) {
  const classes = useStyles();
  let { routes, bookseat } = props;

  //Add a booking
  const addBookseatRef = useRef();
  return (
    <React.Fragment>
      {!isLoaded(bookseat && routes) ? (
        <Backdrop open={true}>
          <CircularProgress style={{ color: "#fff" }} />
        </Backdrop>
      ) : (
        <Container
          maxWidth="lg"
          style={{ marginBottom: "50px", marginTop: "50px" }}
        >
          <Bookseat ref={addBookseatRef} route={routes} />
          <Grid container style={{ marginTop: "50px" }}>
            <Grid xs={12} item>
              <Typography align={"center"} variant={"h4"} gutterBottom>
                All Book Seats
              </Typography>
            </Grid>
          </Grid>

          <Grid container direction={"row"}>
            {bookseat &&
              bookseat.map((book) => {
                return (
                  <BookSeatView key={book.id} book={book} routes={routes} />
                );
              })}
          </Grid>

          <Tooltip title="Add Route." arrow>
            <Fab
              size="small"
              className={classes.fab}
              color={"primary"}
              onClick={() => {
                addBookseatRef.current.handleClickOpenForCreate(routes);
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Container>
      )}
    </React.Fragment>
  );
}

// Database connection
const mapStateToProps = (state) => {
  return {
    bookseat: state.firestore.ordered.bookseat,
    routes: state.firestore.ordered.routes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "bookseat",
      },
      {
        collection: "routes",
      },
    ];
  })
)(withRouter(BookContainer));
