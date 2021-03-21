import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Checkbox,
  CheckboxGroup,
  Icon,
  Popover,
  Whisper,
} from "rsuite";
import { CirclePicker } from "react-color";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./styles.scss";
import { useSelector } from "react-redux";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Слишком коротко!")
    .max(50, "Слишком длинное!")
    .required("Обязательное поле"),
});

function FilterSaveModal({ onSave, onClose, show }) {
  const { filterColors } = useSelector((state) => state.user);

  const [color, setColor] = useState({ hex: "#FFFFFF" });
  const [isActive, setIsActive] = useState(true);
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    if (show) {
      setColor({ hex: "#FFFFFF" });
      setIsActive(true);
      setIsMute(true);
    }
  }, [show]);

  const onSaveFilter = ({ name }) => {
    onSave({ name, color: color.hex, isActive, isMute });
    onClose();
  };

  const onChangeColor = (color) => setColor(color);

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xs"
      className="filter-save-modal-component"
    >
      <Modal.Header>
        <Modal.Title className="modal-title">Сохранение фильтра</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSaveFilter}
        >
          {({ errors, touched }) => (
            <Form>
              <p>Название</p>
              <Field
                name="name"
                spellCheck="false"
                placeholder="Мой фильтр..."
                className={errors.name ? "has-error" : ""}
              />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
              <p>Цветовая метка</p>
              <div className="color-wrapper">
                <CirclePicker
                  width=""
                  color={color}
                  circleSpacing={13.4}
                  onChange={onChangeColor}
                  colors={filterColors.slice(0, 8)}
                />
                <Whisper
                  trigger="active"
                  speaker={
                    <Popover>
                      <CirclePicker
                        color={color}
                        circleSize={26}
                        circleSpacing={10}
                        onChange={onChangeColor}
                        colors={filterColors.slice(8)}
                      />
                    </Popover>
                  }
                  placement="auto"
                >
                  <div className="choice-color">
                    <span>
                      <Icon icon="eyedropper" />
                    </span>
                  </div>
                </Whisper>
              </div>
              <CheckboxGroup inline>
                <Checkbox
                  checked={isActive}
                  onChange={(_, isChecked) => setIsActive(isChecked)}
                >
                  Включен
                </Checkbox>
                <Checkbox
                  checked={isMute}
                  onChange={(_, isChecked) => setIsMute(isChecked)}
                  disabled={!isActive}
                >
                  С уведомлениями
                </Checkbox>
              </CheckboxGroup>
              <div className="modal-footer">
                <Button appearance="primary" type="submit">
                  Сохранить
                </Button>
                <Button onClick={onClose} appearance="subtle">
                  Отмена
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default FilterSaveModal;
