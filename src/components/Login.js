import { Button, Grid, Modal, TextField } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  onChange = (name, e) => {
    this.setState({
      [name]: e,
    });
  };

  login = e => {
    e.preventDefault();

  }

  render() {
    const { open, onClose } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <Modal open={open} onClose={onClose}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default Login;
