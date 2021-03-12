import React, { useState } from "react";
import {
  Container,
  Content,
  Input,
  Icon,
  InputGroup,
  Button,
  FlexboxGrid,
} from "rsuite";
import "./styles.scss";

function Settings() {
  const [isShowChangePassword, setIsShowChangePassword] = useState(false);

  const toggleShowChangePassword = () =>
    setIsShowChangePassword(!isShowChangePassword);

  return (
    <Container className="settings-component">
      <Content>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={12} className="form">
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
                <Button appearance="link" onClick={toggleShowChangePassword}>
                  Изменить
                </Button>
              )}
            </div>
            {isShowChangePassword && (
              <div className="password-wrapper">
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
                    onClick={toggleShowChangePassword}
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            )}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12} className="other-options">
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
            <div className="code-bot">
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

export default Settings;
