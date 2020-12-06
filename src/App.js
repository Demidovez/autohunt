import { Grid, Button, Icon } from "semantic-ui-react";
import React from "react";
import axios from "axios";
import AdvtCard from "./components/AdvtCard";
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
    const advts = this.state.advts;

    return (
      <Grid verticalAlign="middle" id="my-container">
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>{" "}
          <Grid.Column width={8}>
            <div>
              <Button
                icon
                labelPosition="left"
                color={this.state.isStart ? "red" : "green"}
                onClick={this.startStopParsing}
              >
                <Icon name={this.state.isStart ? "pause" : "play"} />
                {this.state.isStart ? "Стоп" : "Старт"}
              </Button>
              {advts.map((advt, indx) => (
                <AdvtCard key={indx} advt={advt} />
              ))}
            </div>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}></Grid.Column>{" "}
          <Grid.Column width={4}></Grid.Column>{" "}
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
