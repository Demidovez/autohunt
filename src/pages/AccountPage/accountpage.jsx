import React from "react";
import { FlexboxGrid } from "rsuite";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../../components/LoginForm/loginform";
import MyFilters from "./MyFilters/myfilters";
import FoundAuto from "./FoundAuto/foundauto";
import Settings from "./Settings/settings";
import "./styles.scss";
import AccountBar from "../../components/AccountBar/accountbar";
import { useDispatch, useSelector } from "react-redux";
import {
  tryLoginUserAction,
  trySigninUserAction,
  tryLogoutUserAction,
} from "../../actions/creators/userActionCreators";

function AccountPage() {
  const { isLogined } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const tryLogin = (loginValue) => dispatch(tryLoginUserAction(loginValue));
  const trySignin = (signinValue) => dispatch(trySigninUserAction(signinValue));
  const tryRestore = () => {};
  const tryLogout = () => dispatch(tryLogoutUserAction());

  return (
    <div className="account-page-component">
      {isLogined && (
        <div>
          <h1 className="h1">Аккаунт</h1>
          <FlexboxGrid align="top">
            <FlexboxGrid.Item colspan={5}>
              <AccountBar logout={tryLogout} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={19}>
              <Switch>
                <Route path="/account/filters" component={MyFilters} />
                <Route path="/account/auto" component={FoundAuto} />
                <Route path="/account/settings" component={Settings} />
              </Switch>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      )}

      {!isLogined && (
        <LoginForm login={tryLogin} signin={trySignin} forgot={tryRestore} />
      )}
    </div>
  );
}

export default AccountPage;
