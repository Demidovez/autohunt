import {
  Grid,
  Item,
  Label,
  Segment,
  Button,
  Icon,
  Header,
  Image,
  Container
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
    const isService = true;

    return (
      <Grid verticalAlign="middle" id="my-container">
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>{" "}
          <Grid.Column width={8}>
            {!isService && <div>
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
            </div>}
            {isService && <Container textAlign="center">
              <Image src='/logo.jpg' size='small' circular inline/>
              <Header as='h1'>AutoHunt.by</Header>
              <Header as='h2'>Сервис в процессе разработки</Header>
              <div>2020 © AutoHUNT – автомобильная поисковая система. Все права защищены.</div>
              <div><br/></div>
              <div>Индивидуальный предприниматель Макашин Александр Евгеньевич, УНП 491266969, <br/>
          Государственная регистрация от 16.08.2017г. произведена Светлогорским районным исполнительным комитетом. <br/>
          Юр. адрес: 247431, г. Светлогорск, ул.Шоссейная 19/46<br/>
          Время работы: 9:00—21:00 пн—пт.<br/>
          Телефон: +375 (29) 329-21-75<br/>
          E-mail: malexoff@gmail.com<br/></div>
              </Container>}
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}>
          
          </Grid.Column>{" "}
          <Grid.Column width={4}></Grid.Column>{" "}
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
