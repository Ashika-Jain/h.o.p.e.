import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent } from "../../actions/events";
import { Container, Grid, Paper, Typography, Button } from "@material-ui/core";
import { questions } from "./qData";
import useStyles from "./styles";

const Quiz = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);
  let [taskId, setTaskId] = useState("");
  let [emojiId, setEmojiId] = useState("");
  let [rewardId, setRewardId] = useState("");

  const handleSubmitOptions = (i) => {
    let nextQ = currentQ + 1;
    if (questions[currentQ].emoji) {
      setEmojiId(i);
    }
    if (questions[currentQ].reward) {
      setRewardId(i);
    }
    if (questions[currentQ].task) {
      setTaskId(i);
    }
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
    }
  };

  const handleSubmit = () => {
    const eventData = { emotion: emojiId, task: taskId, reward: rewardId };
    dispatch(createEvent(eventData, history));
  };
  return (
    <Container className={classes.quiz} component="main" maxWidth="xs">
      <Grid className={classes.paper}>
        {showResult ? (
          <Paper className={classes.final}>
            <Typography className={classes.quizTitle}>Ready for your task?</Typography>
            {questions[1].answerOptions[taskId - 1].points.map((item, index) => (
              <Typography className={classes.points} key={index}>
                {item}
              </Typography>
            ))}
            <img
              className={classes.img}
              alt={questions[1].answerOptions[taskId - 1].answerText}
              src={questions[1].answerOptions[taskId - 1].ansImg}
              title={questions[1].answerOptions[taskId - 1].answerText}
            />
            <Button className={classes.acceptBtn} variant="contained" onClick={() => handleSubmit()}>
              I Accept
            </Button>
          </Paper>
        ) : (
          <>
            <Typography className={classes.quizTitle}>{questions[currentQ].questionText}</Typography>
            {questions[currentQ].answerOptions.map((option) => (
              <Button variant="outlined" key={option.id} className={classes.option} onClick={() => handleSubmitOptions(option.id)}>
                {option.ansEmo} {option.answerText}
              </Button>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Quiz;