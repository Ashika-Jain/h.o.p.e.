import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  startGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem",
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    padding: "10px",
  },
  box: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: "5px",
    border: "1px dashed #068fa0",
  },
  button: {
    color: "#fff",
    marginTop: "0.6rem",
    marginBottom: "0.5rem",
    backgroundColor: "#068fa0",
    borderRadius: 15,
    "&:hover": {
      backgroundColor: "#468fa0",
    },
  },
}));