import React from "react";
import { Container } from "rsuite";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import FilterPage from "./pages/FilterPage/filterpage";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <FilterPage />
        <Footer />
      </Container>
    );
  }
}

export default App;
