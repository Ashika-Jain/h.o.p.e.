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
  chatIconContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chatIcon: {
    backgroundColor: "#068fa0",
    borderRadius: "50%",
    padding: "15px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  chatText: {
    display: "none",
    backgroundColor: "#068fa0",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    marginBottom: "5px",
    fontSize: "14px",
  },
  chatIconContainerHover: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  chatIconHover: {
    "&:hover + .chatText": {
      display: "block",
    },
  },
  // Overlay for background blur
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9998,
    backdropFilter: "blur(5px)",
  },
  // Chatbot modal styling
  chatbotModal: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 10000,
    width: "400px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));
