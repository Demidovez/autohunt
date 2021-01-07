import React from "react";
import { Content, Grid, Row, Col, Breadcrumb, FlexboxGrid } from "rsuite";
import { Switch, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import userStore from "../../stores/userStore";
import LoginForm from "../../components/LoginForm/loginform";
import MyFiltres from "../../components/MyFiltres/myfiltres";
import FoundedAuto from "../../components/FoundedAuto/foundedauto";
import Settings from "../../components/Settings/settings";
import css from "./accountpage.module.css";
import AccountBar from "../../components/AccountBar/accountbar";

const AccountPage = observer(
  class extends React.Component {
    render() {
      const {
        isLogined,
        tryLogin,
        trySignin,
        tryRestore,
        tryLogout,
      } = userStore;

      return (
        <div>
          {isLogined && (
            <div>
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
                  <AccountBar logout={tryLogout} />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={19}>
                  <Switch>
                    <Route path="/account/filtres" component={MyFiltres} />
                    <Route path="/account/auto" component={FoundedAuto} />
                    <Route path="/account/settings" component={Settings} />
                  </Switch>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </div>
          )}

          {!isLogined && (
            <LoginForm
              login={tryLogin}
              signin={trySignin}
              forgot={tryRestore}
            />
          )}
        </div>
      );
    }
  }
);

export default AccountPage;
