import React from "react";
import {Form, FormGroup, ControlLabel, FormControl, Modal, Button} from "rsuite";
import css from "./modalloginadmin.module.css";

class ModalLoginAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: {
                name: "",
                email: "",
                password: "",
                textarea: "",
            },
        };
    }

    handleChange = (value) => {
        this.setState({
            formValue: value,
        });
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} className={css.container}>
                <Modal.Header>
                    <Modal.Title className={css.modal_title}>Вход только для администраторов!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={this.handleChange} formValue={this.state.formValue}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl name="email" type="email"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Пароль</ControlLabel>
                            <FormControl name="password" type="password"/>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={css.modal_footer}>
                    <Button onClick={this.props.onClose} appearance="primary">
                        Войти
                    </Button>
                    <Button onClick={this.props.onClose} appearance="subtle">
                        Отмена
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalLoginAdmin;
