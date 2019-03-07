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

import { observer, inject } from "mobx-react";

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
    showPassword: false
  };

  handleChangeText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  login(email, password) {
    this.store.login(email, password);
  }

  componentDidMount = () => {
    this.store.reset();
  };

  render() {
    const { intl } = this.props;
    const { getAuth, getLoading, getFailed, getMessage } = this.store;

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
            disabled={getLoading}
            color="primary"
          >
            {getLoading ? (
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

export default withIntl(Login);
