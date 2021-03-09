import React, { useState } from "react";
import {
  Grid,
  Row,
  Col,
  Navbar,
  Nav,
  Icon,
  Header,
  Badge,
  Whisper,
  Popover,
} from "rsuite";
import { Link } from "react-router-dom";
import Notification from "../Notification/notification";
import css from "./header.module.css";
import { useSelector } from "react-redux";

function HeaderSite() {
  const [activeKey, setActiveKey] = useState(null);
  const [isHaveNotification, setIsHaveNotification] = useState(true);

  const { name, isLogined } = useSelector((state) => state.user);

  const handleSelect = (eventKey) => setActiveKey(eventKey);

  return (
    <div className={css.container}>
      <Header>
        <Navbar appearance="inverse">
          <Grid fluid>
            <Row>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
              <Col xs={24} sm={24} md={16} lg={16}>
                <Navbar.Body>
                  <Nav onSelect={handleSelect} activeKey={activeKey}>
                    <Nav.Item
                      eventKey="1"
                      icon={<Icon icon="home" />}
                      componentClass={Link}
                      to="/"
                    >
                      Главная
                    </Nav.Item>
                    <Nav.Item eventKey="2" componentClass={Link} to="/news">
                      Новости
                    </Nav.Item>
                    <Nav.Item eventKey="3" componentClass={Link} to="/about">
                      О нас
                    </Nav.Item>
                    <Nav.Item eventKey="4" componentClass={Link} to="/contacts">
                      Контакты
                    </Nav.Item>
                  </Nav>
                  <Nav pullRight onSelect={handleSelect} activeKey={activeKey}>
                    {isLogined && (
                      <Whisper
                        placement="bottomEnd"
                        trigger="click"
                        enterable
                        speaker={
                          <Popover>
                            <div className={css.notifications}>
                              <Notification />
                              <Notification />
                              <Notification />
                              <Notification />
                            </div>
                            <div>Закрыть все</div>
                          </Popover>
                        }
                      >
                        <Nav.Item className={css.notification_icon}>
                          {isHaveNotification ? (
                            <Badge>
                              <Icon icon="bell" size="lg" />
                            </Badge>
                          ) : (
                            <Icon icon="bell-o" size="lg" />
                          )}
                        </Nav.Item>
                      </Whisper>
                    )}
                    <Nav.Item
                      icon={<Icon icon="avatar" />}
                      componentClass={Link}
                      eventKey="5"
                      to="/account"
                    >
                      {isLogined ? name : "Войти"}
                    </Nav.Item>
                  </Nav>
                </Navbar.Body>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4}></Col>
            </Row>
          </Grid>
        </Navbar>
      </Header>
    </div>
  );
}

export default HeaderSite;
