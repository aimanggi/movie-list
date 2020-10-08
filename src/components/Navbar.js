import React, { Component } from "react";
import { AppBar, Button, Grid, TextField, Toolbar } from "@material-ui/core";
import Login from "./Login";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be 5 characters at minimum")
    .required("Password is required"),
});

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <TextField
      {...field}
      {...props}
      error={!!touched[field.name] && !!errors[field.name]}
      helperText={
        touched[field.name] && errors[field.name] ? errors[field.name] : ""
      }
      fullWidth
    />
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token: localStorage.getItem("token"),
      data: {},
      email: "",
      password: "",
      image: {
        file: {},
        url: "",
      },
    };
  }

  componentDidMount() {
    const { token } = this.state;

    if (token) {
      this.getCurrentUser();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { token } = this.state;

  //   if (token !== prevState.token) {
  //     if (token) {
  //       this.getCurrentUser();
  //     }
  //   }
  // }

  getCurrentUser = async () => {
    try {
      const { token, id } = this.state;
      console.log("token", token);

      const fetch = await Axios.get(`https://new-server-movie.herokuapp.com/user/id/${id}`, {
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

  handleFileUpload = (event) => {
    const file = event.currentTarget.files[0];
    this.setState({
      image: {
        file: event.currentTarget.files[0],
        url: URL.createObjectURL(file),
      },
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

      console.log("submit", submit);
      localStorage.setItem("token", submit.data.data.token);
      this.setState({
        token: submit.data.data.token,
        data: submit.data.data,
        open: false,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  register = async (values, image) => {
    console.log("test", values, image );
    

    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('fullname', values.fullname);
      formData.append('image', image.file);
      formData.append('password', values.password);

      console.log('data', formData)

      const submit = await Axios({
        method: 'post',
        url: 'https://new-server-movie.herokuapp.com/register',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
      });

      console.log("submit", submit);
      localStorage.setItem("token", submit.data.acces_token);
      this.setState({
        token: submit.data.acces_token,
        // data: submit.data.data,
        open: false,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  logout = () => {
    localStorage.clear();
    this.setState({
      open: false,
      token: null,
      data: {},
    });
  };

  render() {
    const { open, data, token, email, password } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span>Ini Navbar</span>
              {/* {token && <span>Hello, {data.username}</span>}  */}
              {token ? (
                <span style={{ marginLeft: 16 }}>Hello, {data.username}</span>
              ) : null}
            </div>
            {token ? (
              <Button color="inherit" onClick={this.logout}>
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => this.onChange("open", true)}
              >
                Register
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {open && (
          <Login
            open={open}
            onChange={this.onChange}
            onClose={() => this.onChange("open", false)}
          >
            <div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  fullname: "",
                  image: "",
                }}
                onSubmit={(values, actions) => {
                  console.log("values", values);
                  console.log("image", this.state.image);
                  this.register(values, this.state.image)
                }}
                validationSchema={schemaLogin}
                validateOnBlur
              >
                {({ handleSubmit }) => {
                  return (
                    <Form onSubmit={handleSubmit}>
                      <div className="modal">
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <Field
                              label="Email"
                              name="email"
                              type="email"
                              component={CustomInputComponent}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              label="Fullname"
                              name="fullname"
                              type="text"
                              component={CustomInputComponent}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              label="Image"
                              name="image"
                              type="file"
                              // value={this.state.image.file.name}
                              onChange={(e) => this.handleFileUpload(e)}
                              component={CustomInputComponent}
                            />
                            {this.state.image.file.name && (
                              <span>{this.state.image.file.name}</span>
                            )}
                            {this.state.image.url && (
                              <img
                                width="50"
                                height="50"
                                src={this.state.image.url}
                                alt={this.state.image.file.name}
                              />
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              label="Password"
                              name="password"
                              type="password"
                              component={CustomInputComponent}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </Login>
        )}
      </div>
    );
  }
}

export default Navbar;
