import React from "react";
import {Form, FormGroup, ControlLabel, FormControl, Modal, Button} from "rsuite";
import css from "./modallogin.module.css";

class ModalLogin extends React.Component {
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
                    <Modal.Title className={css.modal_title}>Войдите в свой аккаунт!</Modal.Title>
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
                    Зарегистрироваться
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalLogin;
