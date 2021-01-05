import React from "react";
import {
  Content,
  Grid,
  Row,
  Col,
  Breadcrumb,
  FlexboxGrid,
  Sidenav,
  Nav,
  Icon,
} from "rsuite";
import { Switch, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import userStore from "../../stores/userStore";
import LoginForm from "../../components/LoginForm/loginform";
import MyFiltres from "../../components/MyFiltres/myfiltres";
import FoundedAuto from "../../components/FoundedAuto/foundedauto";
import Settings from "../../components/Settings/settings";
import css from "./accountpage.module.css";

const AccountPage = observer(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { activeKey: null };
    }

    handleSelect = (eventKey) => {
      this.setState({
        activeKey: eventKey,
      });
    };

    render() {
      const {
        isLogined,
        tryLogin,
        trySignin,
        tryRestore,
        tryLogout,
      } = userStore;
      const { activeKey } = this.state;

      return (
        <Content className={isLogined ? css.container : css.flex_container}>
          {isLogined && (
            <Grid fluid>
              <Row>
                <Col xs={24} sm={24} md={4} lg={4}></Col>
                <Col xs={24} sm={24} md={12} lg={16}>
                  {/* TODO: Надо хлебные крошки вынести в отдельный компонент из вне, так как они на каждой странице */}
                  <div className={css.breadcrumb}>
                    <Breadcrumb>
                      <Breadcrumb.Item componentClass={Link} to="/">
                        Главная
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>Аккаунт</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <h1 className={css.header1}>Аккаунт</h1>
                  <FlexboxGrid align="top">
                    <FlexboxGrid.Item colspan={5}>
                      <Sidenav
                        activeKey={activeKey}
                        onSelect={this.handleSelect}
                        className={css.sidenav}
                      >
                        <Sidenav.Body>
                          <Nav>
                            <Nav.Item
                              eventKey="1"
                              componentClass={Link}
                              to="/account/filtres"
                              icon={<Icon icon="filter" />}
                            >
                              <span>Мои фильтры</span>
                            </Nav.Item>
                            <Nav.Item
                              eventKey="2"
                              componentClass={Link}
                              to="/account/auto"
                              icon={<Icon icon="car" />}
                            >
                              <span>Найденные авто</span>
                            </Nav.Item>
                            <Nav.Item
                              eventKey="3"
                              componentClass={Link}
                              to="/account/settings"
                              icon={<Icon icon="wrench" />}
                            >
                              <span>Настройки</span>
                            </Nav.Item>
                            <Nav.Item
                              onClick={tryLogout}
                              icon={<Icon icon="sign-out" />}
                            >
                              <span>Выйти</span>
                            </Nav.Item>
                          </Nav>
                        </Sidenav.Body>
                      </Sidenav>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={19}>
                      <Switch>
                        <Route path="/account/filtres" component={MyFiltres} />
                        <Route path="/account/auto" component={FoundedAuto} />
                        <Route path="/account/settings" component={Settings} />
                      </Switch>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4}></Col>
              </Row>
            </Grid>
          )}

          {!isLogined && (
            <LoginForm
              login={tryLogin}
              signin={trySignin}
              forgot={tryRestore}
            />
          )}
        </Content>
      );
    }
  }
);

export default AccountPage;
