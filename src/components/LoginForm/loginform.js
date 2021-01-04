import React from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Panel,
  FlexboxGrid,
} from "rsuite";
import css from "./loginform.module.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "login",
      loginValue: {
        email: "",
        password: "",
      },
      signinValue: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      forgotValue: {
        email: "",
      },
    };
  }

  setActive = (active) => {
    this.setState({
      active,
    });
  };

  loginChange = (value) => {
    this.setState({
      loginValue: value,
    });
  };

  signinChange = (value) => {
    this.setState({
      signinValue: value,
    });
  };

  forgotChange = (value) => {
    this.setState({
      forgotValue: value,
    });
  };

  tryLogin = () => {
    this.props.login(this.state.loginValue);
  };

  trySignin = () => {
    this.props.signin(this.state.signinValue);
  };

  tryRestore = () => {
    this.props.forgot(this.state.forgotValue);
  };

  cancelInput = () => {
    this.setState({
      loginValue: {
        email: "",
        password: "",
      },
      signinValue: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      forgotValue: {
        email: "",
      },
      active: "login",
    });
  };

  render() {
    const { active, signinValue, loginValue, forgotValue } = this.state;

    // TODO: Нету проверок на ввод!

    return (
      <div className={css.container}>
        <Panel shaded>
          <FlexboxGrid justify="space-between" className={css.header}>
            <FlexboxGrid.Item
              colspan={8}
              className={active !== "signin" ? css.active : ""}
              onClick={() => this.setActive("login")}
            >
              Авторизация
            </FlexboxGrid.Item>
            <FlexboxGrid.Item
              colspan={8}
              className={active === "signin" ? css.active : ""}
              onClick={() => this.setActive("signin")}
            >
              Регистрация
            </FlexboxGrid.Item>
          </FlexboxGrid>
          {active === "login" && (
            <Form fluid onChange={this.loginChange} formValue={loginValue}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" type="email" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Пароль</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={this.tryLogin}>
                    Войти
                  </Button>
                  <Button
                    appearance="link"
                    onClick={() => this.setActive("forgot")}
                  >
                    Забыли пароль?
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          )}
          {active === "signin" && (
            <Form fluid onChange={this.signinChange} formValue={signinValue}>
              <FormGroup>
                <ControlLabel>Имя</ControlLabel>
                <FormControl name="name" type="text" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" type="email" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Пароль</ControlLabel>
                <FormControl name="password" type="password" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Повторите пароль</ControlLabel>
                <FormControl name="password2" type="password" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={this.trySignin}>
                    Зарегистрироваться
                  </Button>
                  <Button appearance="link" onClick={this.cancelInput}>
                    Отмена
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          )}
          {active === "forgot" && (
            <Form fluid onChange={this.forgotChange} formValue={forgotValue}>
              <FormGroup>
                <ControlLabel>Email для отправки пароля</ControlLabel>
                <FormControl name="email" type="email" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={this.tryRestore}>
                    Отправить
                  </Button>
                  <Button appearance="link" onClick={this.cancelInput}>
                    Отмена
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          )}
        </Panel>
      </div>
    );
  }
}

export default LoginForm;
