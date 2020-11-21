import {
  Grid,
  Item,
  Label,
  Segment,
  Button,
  Icon,
  Header,
} from "semantic-ui-react";
import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false, advts: [] };
  }

  componentDidMount() {
    axios.get(`http://82.146.46.106/server/all_advts`).then((res) => {
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
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>{" "}
          <Grid.Column width={8}>
            <Button
              icon
              labelPosition="left"
              color={this.state.isStart ? "red" : "green"}
              onClick={this.startStopParsing}
            >
              <Icon name={this.state.isStart ? "pause" : "play"} />
              {this.state.isStart ? "Стоп" : "Старт"}
            </Button>

            {advts.map((advt) => (
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image src={advt.image} size="medium" rounded />
                    <Item.Content>
                      <Header
                        verticalAlign="top"
                        className="header-advt"
                        size="large"
                      >
                        {advt.model} {advt.series} {advt.generation}
                      </Header>
                      <Item.Meta>
                        <Label color="blue">
                          {advt.price}
                          <Label.Detail>{advt.priceusd}</Label.Detail>
                        </Label>
                        {"  "}
                        <span>{advt.year}</span>
                      </Item.Meta>
                      <Item.Meta>
                        <Label>{advt.date}</Label>
                        <Label>{advt.engcapacity}</Label>
                        <Label>{advt.mileage}</Label>
                      </Item.Meta>
                      <Item.Description>
                        {advt.model} {advt.series} {advt.generation}{" "}
                        {advt.price} {advt.priceusd} {advt.year} {advt.date}{" "}
                        {advt.engcapacity} {advt.mileage}
                      </Item.Description>
                      <Item.Extra>
                        <Label>{advt.engtype}</Label>
                        <Label icon="globe" content={advt.fueltype} />
                      </Item.Extra>
                      <Label
                        attached="bottom right"
                        icon="linkify"
                        as="a"
                        href={advt.urlad}
                        target="_blank"
                      >
                        {advt.urlad}
                      </Label>
                    </Item.Content>
                    <div>
                      <Label color="orange" ribbon="right">
                        {advt.location}
                      </Label>
                    </div>
                  </Item>
                </Item.Group>
              </Segment>
            ))}
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
