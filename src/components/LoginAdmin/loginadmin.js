import React from "react";
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock } from "rsuite";
import css from "./loginadmin.module.css";

class LoginAdmin extends React.Component {
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
      <Form fluid onChange={this.handleChange} formValue={this.state.formValue}>
        <FormGroup>
          <ControlLabel>Login</ControlLabel>
          <FormControl name="name" />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" type="email" />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl name="password" type="password" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Textarea</ControlLabel>
          <FormControl rows={5} name="textarea" componentClass="textarea" />
        </FormGroup>
      </Form>
    );
  }
}

export default LoginAdmin;
