import React from "react";
import axios from "axios";
import { Container } from "rsuite";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import FilterPage from "./pages/FilterPage/filterpage";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false, advts: [] };
  }

  componentDidMount() {
    axios.get(`https://server.autohunt.by/all_advts`).then((res) => {
      const advts = res.data;
      this.setState({ advts });
    });
  }

  startStopParsing = () => {
    this.setState((state) => ({
      isStart: !state.isStart,
    }));
  };

  render() {
    const { advts } = this.state;

    return (
      <Container>
        <Header />
        <FilterPage advts={advts} />
        <Footer />
      </Container>
    );
  }
}

export default App;
