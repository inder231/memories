import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Allroutes from "./components/Routes/Allroutes";

const App = () => {
  return (
    <Container maxidth="lg">
      <Navbar />
      <Allroutes/>
    </Container>
  );
};

export default App;
