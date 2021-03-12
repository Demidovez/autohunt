import React, { useState, useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";
import Notification from "../Notification/notification";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkIsLoginUserAction } from "../../actions/creators/userActionCreators";

function HeaderSite() {
  const [activeKey, setActiveKey] = useState(null);
  const [isHaveNotification] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const { firstname, isLogined } = useSelector((state) => state.user);

  const handleSelect = (eventKey) => setActiveKey(eventKey);

  // TODO: Подумать об авторизации...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(checkIsLoginUserAction()), [location.pathname]);

  return (
    <div className="header-site-component">
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
                            <div className="notifications">
                              <Notification />
                              <Notification />
                              <Notification />
                              <Notification />
                            </div>
                            <div>Закрыть все</div>
                          </Popover>
                        }
                      >
                        <Nav.Item className="notification-icon">
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
                      {isLogined ? firstname : "Войти"}
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
