import { Button, Grid, Modal, TextField } from "@material-ui/core";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (name, e) => {
    this.setState({
      [name]: e,
    });
  };

  render() {
    const { open, onClose } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <Modal open={open} onClose={onClose}>
          <div className="modal">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => this.onChange("email", e.target.value)}
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  type="password"
                  onChange={(e) => this.onChange("password", e.target.value)}
                  label="Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;
