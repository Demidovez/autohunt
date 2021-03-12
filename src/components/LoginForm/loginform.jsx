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
import "./styles.scss";

function LoginForm(props) {
  const [active, setActive] = React.useState("login");

  const [loginValue, setLoginValue] = React.useState({
    email: "",
    password: "",
  });

  const [signinValue, setSigninValue] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const [forgotValue, setForgotValue] = React.useState({
    email: "",
  });

  const handleActive = (active) => setActive(active);

  const loginChange = (value) => setLoginValue(value);

  const signinChange = (value) => setSigninValue(value);

  const forgotChange = (value) => setForgotValue(value);

  const tryLogin = () => props.login(loginValue);

  const trySignin = () => props.signin(signinValue);

  const tryRestore = () => props.forgot(forgotValue);

  const cancelInput = () => {
    setLoginValue({
      email: "",
      password: "",
    });

    setSigninValue({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
    });

    setForgotValue({
      email: "",
    });

    setActive("login");
  };

  // TODO: Нету проверок на ввод!

  return (
    <div className="login-form-component">
      <Panel shaded>
        <FlexboxGrid justify="space-between" className="header">
          <FlexboxGrid.Item
            colspan={8}
            className={active !== "signin" ? "active" : ""}
            onClick={() => handleActive("login")}
          >
            Авторизация
          </FlexboxGrid.Item>
          <FlexboxGrid.Item
            colspan={8}
            className={active === "signin" ? "active" : ""}
            onClick={() => handleActive("signin")}
          >
            Регистрация
          </FlexboxGrid.Item>
        </FlexboxGrid>
        {active === "login" && (
          <Form fluid onChange={loginChange} formValue={loginValue}>
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
                <Button appearance="primary" onClick={tryLogin}>
                  Войти
                </Button>
                <Button
                  appearance="link"
                  onClick={() => handleActive("forgot")}
                >
                  Забыли пароль?
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        )}
        {active === "signin" && (
          <Form fluid onChange={signinChange} formValue={signinValue}>
            <FormGroup>
              <ControlLabel>Имя</ControlLabel>
              <FormControl name="firstname" type="text" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Фамилия</ControlLabel>
              <FormControl name="lastname" type="text" />
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
                <Button appearance="primary" onClick={trySignin}>
                  Зарегистрироваться
                </Button>
                <Button appearance="link" onClick={cancelInput}>
                  Отмена
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        )}
        {active === "forgot" && (
          <Form fluid onChange={forgotChange} formValue={forgotValue}>
            <FormGroup>
              <ControlLabel>Email для отправки пароля</ControlLabel>
              <FormControl name="email" type="email" />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" onClick={tryRestore}>
                  Отправить
                </Button>
                <Button appearance="link" onClick={cancelInput}>
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

export default LoginForm;
