import React, { Component } from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import Login from "./Login";
import Axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token: localStorage.getItem("token"),
      data: {},
    };
  }

  componentDidMount() {
    const { token } = this.state;

    if (token) {
      this.getCurrentUser();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { token } = this.state;

    if (token !== prevState.token) {
      if (token) {
        this.getCurrentUser();
      }
    }
  }

  getCurrentUser = async () => {
    try {
      const { token } = this.state;
      console.log("token", token);

      const fetch = await Axios.get("http://appdoto.herokuapp.com/api/user", {
        headers: {
          Authorization: token,
        },
      });

      console.log("fetch", fetch);
      this.setState({
        data: fetch.data.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  logout = () => {
      localStorage.clear();
      this.setState({
        open: false,
        token: null,
        data: {},
      })
  }

  render() {
    const { open, data, token } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span>Ini Navbar</span>
              {/* {token && <span>Hello, {data.username}</span>}  */}
              {token ? <span>Hello, {data.username}</span> : null}
            </div>
            {token ? (
              <Button
                color="inherit"
                onClick={this.logout}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => this.onChange("open", true)}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {open && (
          <Login
            open={open}
            onChange={this.onChange}
            onClose={() => this.onChange("open", false)}
          />
        )}
      </div>
    );
  }
}

export default Navbar;
