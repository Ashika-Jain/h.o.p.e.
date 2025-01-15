import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEvents } from "../../actions/events";
import Events from "../Events/Events";
import useStyles from "./styles";
import EventsTable from "../EventsTable/EventsTable";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);
  useEffect(() => {
    dispatch(getEvents()); // eslint-disable-next-line
  }, []);

  return (
    <Grid className={classes.gridContainer} container justify="center" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={11} md={8} lg={7}>
        <Container className={classes.box}>
          <Grid className={classes.gridContainer} container justify="center" alignItems="stretch">
            <Grid item xs={12}>
              <Box textAlign="center">
                <Typography style={{ color: "#0a4849" }} variant="h4" display="inline" className={classes.title}>
                  Hello {user.result.name}, <br /> How are you feeling Today?
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button component={Link} to="/quiz" className={classes.button} size="small" variant="contained">
                  Start Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid item xs={12} sm={11} md={8} lg={7}>
        <Events />
      </Grid>

      <Grid item xs={12} sm={11} md={8} lg={7}>
        <EventsTable />
      </Grid>
    </Grid>
  );
};

export default Home;