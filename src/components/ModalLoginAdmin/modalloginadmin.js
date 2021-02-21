import React from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal,
  Button,
} from "rsuite";
import css from "./modalloginadmin.module.css";

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
    <Modal show={show} onHide={onClose} className={css.container}>
      <Modal.Header>
        <Modal.Title className={css.modal_title}>
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
      <Modal.Footer className={css.modal_footer}>
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
