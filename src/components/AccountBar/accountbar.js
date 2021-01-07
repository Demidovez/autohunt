import React from "react";
import { Sidenav, Nav, Icon, Modal, Button, Panel } from "rsuite";
import { Link } from "react-router-dom";
import css from "./accountbar.module.css";

class AccountBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeKey: null, show: false };
  }

  handleSelect = (eventKey) => {
    this.setState({
      activeKey: eventKey || this.state.activeKey,
    });
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  openModal = () => {
    this.setState({ show: true });
  };

  confirmModal = () => {
    this.setState({ show: false }, () => this.props.logout());
  };

  render() {
    const { activeKey } = this.state;

    return (
      <div>
        <Panel bodyFill className={css.panel}>
          <Sidenav
            activeKey={activeKey}
            onSelect={this.handleSelect}
            className={css.sidenav}
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Item
                  eventKey="filtres"
                  componentClass={Link}
                  to="/account/filtres"
                  icon={<Icon icon="filter" />}
                >
                  <span>Мои фильтры</span>
                </Nav.Item>
                <Nav.Item
                  eventKey="auto"
                  componentClass={Link}
                  to="/account/auto"
                  icon={<Icon icon="car" />}
                >
                  <span>Найденные авто</span>
                </Nav.Item>
                <Nav.Item
                  eventKey="settings"
                  componentClass={Link}
                  to="/account/settings"
                  icon={<Icon icon="wrench" />}
                >
                  <span>Настройки</span>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <Panel onClick={this.openModal} className={css.logout}>
            <Icon icon="sign-out" /> <span>Выйти</span>
          </Panel>
        </Panel>

        <Modal show={this.state.show} onHide={this.closeModal} size="xs">
          <Modal.Body className={css.modal}>
            <Icon icon="remind" />
            Вы уверены, что хотите выйти?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.confirmModal} appearance="primary">
              Да
            </Button>
            <Button onClick={this.closeModal} appearance="subtle">
              Нет
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AccountBar;
