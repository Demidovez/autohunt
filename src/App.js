import { Grid, Item, Label, Segment, Button, Icon } from "semantic-ui-react";
import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStart: false };
  }

  startStopParsing = () => {
    this.setState((state) => ({
      isStart: !state.isStart,
    }));
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}></Grid.Column>{" "}
          <Grid.Column width={6}>
            <Button
              icon
              labelPosition="left"
              color={this.state.isStart ? "red" : "green"}
              onClick={this.startStopParsing}
            >
              <Icon name={this.state.isStart ? "pause" : "play"} />
              {this.state.isStart ? "Stop" : "Start"}
            </Button>
            <Item.Group divided>
              <Segment>
                <Item>
                  <Item.Image
                    src="https://avcdn.av.by/advertbig/0000/0978/5567.jpeg"
                    size="small"
                  />
                  <Item.Content>
                    <Item.Header as="a">12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className="cinema">Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>Union Square 14</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon="globe" content="Additional Languages" />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Segment>

              <Segment>
                <Item>
                  <Item.Image
                    src="https://avcdn.av.by/advertbig/0000/0978/5567.jpeg"
                    size="small"
                  />
                  <Item.Content>
                    <Item.Header as="a">12 Years a Slave</Item.Header>
                    <Item.Meta>
                      <span className="cinema">Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>Union Square 14</Item.Description>
                    <Item.Extra>
                      <Label>IMAX</Label>
                      <Label icon="globe" content="Additional Languages" />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Segment>
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
