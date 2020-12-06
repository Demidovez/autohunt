import { Grid, Header, Image, Container } from "semantic-ui-react";
import React from "react";

class Development extends React.Component {
  render() {
    return (
      <Grid verticalAlign="middle" id="my-container">
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>{" "}
          <Grid.Column width={8}>
            <Container textAlign="center">
              <Image src="/logo.jpg" size="small" circular inline />
              <Header as="h1">AutoHunt.by</Header>
              <Header as="h2">Сервис в процессе разработки</Header>
              <div>
                2020 © AutoHUNT – автомобильная поисковая система. Все права
                защищены.
              </div>
              <div>
                <br />
              </div>
              <div>
                Индивидуальный предприниматель Макашин Александр Евгеньевич, УНП
                491266969, <br />
                Государственная регистрация от 16.08.2017г. произведена
                Светлогорским районным исполнительным комитетом. <br />
                Юр. адрес: 247431, г. Светлогорск, ул.Шоссейная 19/46
                <br />
                Время работы: 9:00—21:00 пн—пт.
                <br />
                Телефон: +375 (29) 329-21-75
                <br />
                E-mail: malexoff@gmail.com
                <br />
              </div>
            </Container>
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

export default Development;
