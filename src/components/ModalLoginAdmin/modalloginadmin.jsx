import React from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal,
  Button,
} from "rsuite";
import "./styles.scss";

function ModalLoginAdmin(props) {
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
    password: "",
    textarea: "",
  });

  const handleChange = (value) => setFormValue(value);

  const { show, onClose } = props;

  return (
    <Modal show={show} onHide={onClose} className="modal-login-admin-component">
      <Modal.Header>
        <Modal.Title className="modal-title">
          Вход только для администраторов!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={handleChange} formValue={formValue}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Пароль</ControlLabel>
            <FormControl name="password" type="password" />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button onClick={onClose} appearance="primary">
          Войти
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLoginAdmin;
