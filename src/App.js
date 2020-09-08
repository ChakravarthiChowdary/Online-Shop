import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Main from "./Components/Main";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0275d8",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
