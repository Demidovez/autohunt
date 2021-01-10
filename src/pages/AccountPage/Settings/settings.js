import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Content,
  Input,
  Icon,
  InputGroup,
  Button,
  FlexboxGrid,
} from "rsuite";
import css from "./settings.module.css";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowChangePassword: false,
    };
  }

  toggleShowChangePassword = () => {
    this.setState({
      isShowChangePassword: !this.state.isShowChangePassword,
    });
  };

  render() {
    const { isShowChangePassword } = this.state;

    return (
      <Container className={css.container}>
        <Content>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={12} className={css.form}>
              <div>
                <span>Имя</span>
                <Input />
              </div>
              <div>
                <span>Фамилия</span>
                <Input />
              </div>
              <div>
                <span>Отчество</span>
                <Input />
              </div>
              <br />
              <br />
              <div>
                <span>E-mail</span>
                <Input />
              </div>
              <div>
                <span>Пароль</span>
                {!isShowChangePassword && (
                  <Button
                    appearance="link"
                    onClick={this.toggleShowChangePassword}
                  >
                    Изменить
                  </Button>
                )}
              </div>
              {isShowChangePassword && (
                <div className={css.password_wrapper}>
                  <div>
                    <span>Текущий пароль</span>
                    <Input />
                  </div>
                  <div>
                    <span>Новый пароль</span>
                    <Input />
                  </div>
                  <div>
                    <span>Повторите новый пароль</span>
                    <Input />
                  </div>
                  <div>
                    <span></span>
                    <Button appearance="primary" size="sm">
                      Изменить
                    </Button>
                    <Button
                      appearance="link"
                      size="sm"
                      onClick={this.toggleShowChangePassword}
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              )}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} className={css.other_options}>
              <p>
                Ссылка на телеграм-бота <b>(@autohunt_bot)</b>, гды Вы можете
                получать уведомления о новых объявлениях:
              </p>
              <a
                href="https://t.me/autohunt_bot"
                target="_blank"
                rel="noreferrer"
              >
                https://t.me/autohunt_bot
              </a>

              <p>Ваш личный код авторизации в боте:</p>
              <div className={css.code_bot}>
                <div>
                  <InputGroup>
                    <Input value="RF-4567" />
                    <InputGroup.Addon>
                      <Icon icon="copy-o" />
                    </InputGroup.Addon>
                  </InputGroup>
                </div>
                <span>* - код изменится при использовании</span>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    );
  }
}

export default Settings;
