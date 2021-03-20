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

function FilterSaveModal({ onSave, onClose, show }) {
  const [formValue, setFormValue] = React.useState({
    name: "",
    color: "",
  });

  const handleChange = (value) => setFormValue(value);

  const onSaveFilter = () => {
    onSave(formValue);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} className="modal-login-admin-component">
      <Modal.Header>
        <Modal.Title className="modal-title">Сохранение фильтра</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={handleChange} formValue={formValue}>
          <FormGroup>
            <ControlLabel>Название</ControlLabel>
            <FormControl name="name" type="text" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Цветовая пометка</ControlLabel>
            <FormControl name="color" type="text" />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button onClick={onSaveFilter} appearance="primary">
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterSaveModal;
