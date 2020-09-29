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

  login = async (e) => {
    e.preventDefault();
    console.log("test");
    try {
      const { email, password } = this.state;
      const submit = await Axios.post(
        "http://appdoto.herokuapp.com/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', submit.data.data.token);
      this.props.onChange('token', submit.data.data.token);
      window.alert('Yeay sudah berhasil login')
      this.props.onClose();

      console.log("submit", submit);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { open, onClose } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <Modal open={open} onClose={onClose}>
          <form onSubmit={this.login}>
            <div className="modal">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    name="email"
                    onChange={(e) => this.onChange(e.target.name, e.target.value)}
                    label="Email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={password}
                    type="password"
                    name="password"
                    onChange={(e) => this.onChange(e.target.name, e.target.value)}
                    label="Password"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Login;
