import React from "react";
import { Sidenav, Nav, Icon, Modal, Button, Panel } from "rsuite";
import { Link } from "react-router-dom";
import css from "./accountbar.module.css";

function AccountBar(props) {
  const [activeKey, setActiveKey] = React.useState();
  const [countFoundedAuto] = React.useState(12);
  const [showModalQuit, setShowModalQuit] = React.useState(false);

  const handleSelect = (eventKey) => setActiveKey(eventKey || activeKey);

  const closeModal = () => setShowModalQuit(false);

  const openModal = () => setShowModalQuit(true);

  const confirmModal = () => {
    setShowModalQuit(false);
    props.logout();
  };

  return (
    <div>
      <Panel bodyFill className={css.panel}>
        <Sidenav
          activeKey={activeKey}
          onSelect={handleSelect}
          className={css.sidenav}
        >
          <Sidenav.Body>
            <Nav>
              <Nav.Item
                eventKey="filters"
                componentClass={Link}
                to="/account/filters"
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
                <span>
                  Найденные авто <span>({countFoundedAuto})</span>
                </span>
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
        <Panel onClick={openModal} className={css.logout_link}>
          <Icon icon="sign-out" /> <span>Выйти</span>
        </Panel>
      </Panel>

      <Modal show={showModalQuit} onHide={closeModal} size="xs">
        <Modal.Body className={css.modal}>
          <Icon icon="remind" />
          Вы уверены, что хотите выйти?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmModal} appearance="primary">
            Да
          </Button>
          <Button onClick={closeModal} appearance="subtle">
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountBar;
