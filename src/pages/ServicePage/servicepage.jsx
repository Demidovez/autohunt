import React from "react";
import { Container, Content, Grid, Row, Col } from "rsuite";
import ModalLoginAdmin from "../../components/ModalLoginAdmin/modalloginadmin";
import "./styles.scss";

function ServicePage() {
  const [showModalLoginAdmin, setShowModalLoginAdmin] = React.useState(false);

  const closeLogin = () => setShowModalLoginAdmin(false);

  const openLogin = () => setShowModalLoginAdmin(true);

  return (
    <div className="service-page-component">
      <Container>
        <Content>
          <Grid fluid className="grid">
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={12} lg={16}>
                <div className="logo-img" onClick={openLogin}>
                  <img src="/logo.svg" alt="logo" />
                </div>
                <h1>AutoHunt.by</h1>
                <h2>Сервис в процессе разработки</h2>
                <div>
                  2020 © AutoHUNT – автомобильная поисковая система. Все права
                  защищены.
                </div>
                <div>
                  <br />
                </div>
                <div>
                  Индивидуальный предприниматель Макашин Александр Евгеньевич,
                  УНП 491266969, <br />
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
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Content>
      </Container>

      <ModalLoginAdmin show={showModalLoginAdmin} onClose={closeLogin} />
    </div>
  );
}

export default ServicePage;
