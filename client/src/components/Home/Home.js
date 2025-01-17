import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../actions/events";
import Events from "../Events/Events";
import useStyles from "./styles";
import EventsTable from "../EventsTable/EventsTable";
import Chatbot from "../Chatbot/Chatbot"; // Import the Chatbot component

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State for controlling chatbot visibility
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false); // State for controlling background blur

  let { events } = useSelector((state) => {
    return state.events;
  });

  useEffect(() => {
    dispatch(getEvents()); // eslint-disable-next-line
  }, []);

  events = [...events].reverse();

  let counter = 0;
  if (events.length > 0) {
    let startdate = events[0].createdAt;
    counter = events[0].status === "Completed" ? 1 : 0;
    for (let i = 1; i < events.length; i++) {
      let date = moment(new Date(events[i].createdAt)).format().split("-")[2].slice(0, 2);
      let nextdate = moment(new Date(startdate)).clone().add(1, "days").format().split("-")[2].slice(0, 2); // eslint-disable-next-line
      if (date == moment(new Date(startdate)).format().split("-")[2].slice(0, 2)) {
        continue;
      } else if (events[i].status !== "Completed") {
        continue; // eslint-disable-next-line
      } else if (date == nextdate) {
        counter += 1;
        startdate = events[i].createdAt; // eslint-disable-next-line
      } else if (date != nextdate && events[i].status === "Completed") {
        startdate = events[i].createdAt;
        counter = 1;
      } else {
        startdate = events[i].createdAt;
        counter = 0;
      }
    }
  } else {
    counter = 0;
  }

  const openChatbot = () => {
    setIsChatbotOpen(true);
    setIsBackgroundBlurred(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
    setIsBackgroundBlurred(false);
  };

  return (
    <Grid className={classes.gridContainer} container justifyContent="center" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={11} md={8} lg={7}>
        <Container className={classes.box}>
          <Grid className={classes.gridContainer} container justifyContent="center" alignItems="stretch">
            <Grid item xs={12}>
              <Box textAlign="left">
                <Typography style={{ color: "#0a4849" }} variant="h5" display="inline" className={classes.title}>
                  Hello <span style={{ color: "#068fa0" }}>{user.result.name}</span>, <br /> How are you feeling Today?
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="left">
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
        <EventsTable counter={counter} />
      </Grid>

      {/* Chatbot Icon */}
      <div className={classes.chatIconContainer} onClick={openChatbot}>
        <div className={`${classes.chatIcon} ${classes.chatIconHover}`}>
          <i className="fa fa-comments" style={{ color: "white", fontSize: "24px" }}></i>
        </div>
        <div className={classes.chatText}>Chatbot</div>
      </div>

      {/* Background blur when chatbot is open */}
      {isBackgroundBlurred && <div className={classes.overlay} onClick={closeChatbot}></div>}

      {/* Chatbot component */}
      {isChatbotOpen && (
        <div className={classes.chatbotModal}>
          <Chatbot />
        </div>
      )}
    </Grid>
  );
};

export default Home;
