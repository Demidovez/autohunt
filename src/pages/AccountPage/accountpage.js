import React from "react";
import { Content, Grid, Row, Col, Breadcrumb, Button } from "rsuite";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import userStore from "../../stores/userStore";
import LoginForm from "../../components/LoginForm/loginform";
import css from "./accountpage.module.css";

const AccountPage = observer(
  class extends React.Component {
    render() {
      const { isLogined, name, tryLogin, trySignin, tryRestore } = userStore;

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
                  <p>Добрый день, {name}</p>
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
