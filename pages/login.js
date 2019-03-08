import withIntl from "../scripts/withIntl";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

import { FormattedMessage } from "react-intl";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withSnackbar } from "notistack";

import { observer, inject } from "mobx-react";
import axios from "axios";

import { withRouter } from "next/router";

@inject("store")
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.authStore;
  }

  state = {
    email: "",
    password: "",
    showPassword: false,
    loading: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  login(email, password) {
    const { enqueueSnackbar, router } = this.props;

    this.setState({ loading: true });
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then(resp => {
        // this.store.setAuth(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        this.setState({ loading: false });
        router.push("/home");
      })
      .catch(error => {
        localStorage.setItem("token", "");
        if (error.response) {
          enqueueSnackbar(error.response.data.error, { variant: "info" });
        } else if (error.request) {
          console.log(error.request);
          enqueueSnackbar("خطای سرور", { variant: "warning" });
        } else {
          console.log(error);
          enqueueSnackbar("خطای نامشخص", { variant: "error" });
        }
        this.setState({ loading: false });
      });
  }

  componentDidMount = () => {
    // this.store.reset();
  };

  render() {
    const { intl } = this.props;

    return (
      <div style={{ padding: 24 }}>
        <Typography variant="h4">
          <FormattedMessage id="app.loginTitle" />
        </Typography>
        <Typography>
          <FormattedMessage id="app.loginMessage" />
        </Typography>
        <TextField
          id="outlined-email-input"
          label={<FormattedMessage id="app.email" />}
          placeholder={intl.formatMessage({ id: "app.emailExample" })}
          fullWidth
          type="email"
          value={this.state.email}
          onChange={this.handleChange("email")}
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label={<FormattedMessage id="app.password" />}
          style={{ textAlign: "left" }}
          type={this.state.showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Grid
          container
          direction="row"
          justify="flex-end"
          style={{ paddingTop: 32 }}
        >
          <Button
            onClick={() => this.login(this.state.email, this.state.password)}
            size="large"
            variant="contained"
            disabled={this.state.loading}
            color="primary"
          >
            {this.state.loading ? (
              <CircularProgress size={24} />
            ) : (
              <FormattedMessage id="app.login" />
            )}
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withSnackbar(withIntl(Login)));
