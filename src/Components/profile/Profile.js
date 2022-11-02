import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import ProfileImg from "../../Images/profile.png"
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {

    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <Paper elevation={5} style={{ height: "700px", width: "800px", marginLeft: "300px" }}>
      <Typography align={"center"} variant={"h4"} gutterBottom
        style={{ marginTop: "60px", marginRight: "20px", marginBottom: "60px", color: "White" }}>
        <h3>Account Info</h3>
      </Typography>

      <List className={classes.root} elevation={5} style={{ marginTop: "20px", marginLeft: "80px" }}>
        <img src={ProfileImg} style={{ marginLeft: "100px" }} />
        <ListItem>
          <ListItemAvatar >
            <Avatar style={{ backgroundColor: "lightblue" }}>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="NAME : " secondary="Bihini Pabasara" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "lightblue" }}>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="TYPE" secondary="Local" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "lightblue" }}>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="EMAIL" secondary="bihiniamarasingha98@gmail.com" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "lightblue" }}>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="DATE OF BIRTH" secondary="01 Aug 1999" />
        </ListItem>
        <Button variant="contained" disableElevation style={{ marginLeft: "500px" }}>
          Update
        </Button>
      </List>
      <List elevation={5} style={{ marginTop: "-470px", marginLeft: "480px" }}>
        <ListItem>
          <ListItemText primary="TOKEN NO : " secondary="36456787" />
        </ListItem>
        <ListItem>
          <ListItemText primary="TOKEN BALANCE : " secondary="1457 LKR" />
        </ListItem>
        <ListItem>
          <ListItemText primary="LAST RECHARGED : " secondary="2021/07/20" />
        </ListItem>
      </List>
    </Paper>

  );
}