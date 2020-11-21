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

            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image
                    src="https://avcdn.av.by/advertbig/0000/0978/5567.jpeg"
                    size="medium"
                    rounded
                  />
                  <Item.Content>
                    <Header
                      verticalAlign="top"
                      className="header-advt"
                      size="large"
                    >
                      Opel Zafira A Рестайлинг
                    </Header>
                    <Item.Meta>
                      <Label color="blue">
                        8 805 р.
                        <Label.Detail>3 450 $</Label.Detail>
                      </Label>
                      {"  "}
                      <span>2004 г.</span>
                    </Item.Meta>
                    <Item.Meta>
                      <Label>опубликовано вчера</Label>
                      <Label>2.0 л</Label>
                      <Label>342 500 км</Label>
                    </Item.Meta>
                    <Item.Description>
                      минивэн, передний привод, синий
                    </Item.Description>
                    <Item.Extra>
                      <Label>автомат</Label>
                      <Label icon="globe" content="дизель" />
                    </Item.Extra>
                    <div>
                      <Icon></Icon>
                    </div>
                    <Label
                      attached="bottom right"
                      icon="linkify"
                      as="a"
                      href="https://cars.av.by/opel/zafira/100092901"
                      target="_blank"
                    >
                      https://cars.av.by/opel/zafira/100092901
                    </Label>
                  </Item.Content>
                  <div>
                    <Label color="orange" ribbon="right">
                      Минск
                    </Label>
                  </div>
                </Item>
              </Item.Group>
            </Segment>

            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image
                    src="https://avcdn.av.by/advertbig/0000/0978/5567.jpeg"
                    size="medium"
                    rounded
                  />
                  <Item.Content>
                    <Header
                      verticalAlign="top"
                      className="header-advt"
                      size="large"
                    >
                      Opel Zafira A Рестайлинг
                    </Header>
                    <Item.Meta>
                      <Label color="blue">
                        8 805 р.
                        <Label.Detail>3 450 $</Label.Detail>
                      </Label>
                      {"  "}
                      <span>2004 г.</span>
                    </Item.Meta>
                    <Item.Meta>
                      <Label>опубликовано вчера</Label>
                      <Label>2.0 л</Label>
                      <Label>342 500 км</Label>
                    </Item.Meta>
                    <Item.Description>
                      минивэн, передний привод, синий
                    </Item.Description>
                    <Item.Extra>
                      <Label>автомат</Label>
                      <Label icon="globe" content="дизель" />
                    </Item.Extra>
                    <div>
                      <Icon></Icon>
                    </div>
                    <Label
                      attached="bottom right"
                      icon="linkify"
                      as="a"
                      href="https://cars.av.by/opel/zafira/100092901"
                      target="_blank"
                    >
                      https://cars.av.by/opel/zafira/100092901
                    </Label>
                  </Item.Content>
                  <div>
                    <Label color="orange" ribbon="right">
                      Минск
                    </Label>
                  </div>
                </Item>
              </Item.Group>
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
