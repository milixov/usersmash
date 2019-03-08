import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "../components/layout";

import withIntl from "../scripts/withIntl";
import { withSnackbar } from "notistack";
import { withRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    padding: 24
  },
  paper: {
    marginTop: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  saveIcon: {
    marginLeft: theme.spacing.unit
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: false,
      firstName: "",
      lastName: ""
    };
  }

  handleSave = () => {
    const { enqueueSnackbar, router } = this.props;
    const { firstName, lastName } = this.state;
    try {
      this.setState({ loading: true });
      var data = JSON.parse(localStorage.getItem("data"));
      var arr = data["data"];
      arr.push({
        id: "id_" + firstName.trim() + Math.random(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        avatar: "https://picsum.photos/100/100/?random"
      });
      data["data"] = arr;
      localStorage.setItem("data", JSON.stringify(data));
      enqueueSnackbar("ثبت با موفقیت انجام شد", { variant: "success" });
      router.push("/home");
      this.setState({ loading: false });
    } catch (e) {
      enqueueSnackbar("عملیات با خطا مواجه شد", { variant: "warn" });
      this.setState({ loading: false });
    }
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  componentWillMount = () => {
    const { router } = this.props;
    var token = localStorage.getItem("token");
    if (!(token && token.length > 0)) {
      this.setState({ auth: false });
      router.push("/");
    } else {
      this.setState({ auth: true });
    }
  };

  render() {
    const { classes, pageContext, router } = this.props;
    const { firstName, lastName } = this.state;

    return (
      <Layout classes={classes} pageContext={pageContext}>
        {this.state.auth ? (
          <Grid container direction="column">
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: 24 }}
            >
              <Typography variant="h5" style={{ flexGrow: 1 }}>
                کاربر جدید
              </Typography>
              <Button
                style={{ marginLeft: 24 }}
                onClick={() => router.push("/home")}
                color="primary"
              >
                انصراف
              </Button>
              <Button
                onClick={() => this.handleSave()}
                disabled={!(firstName.length > 1 && lastName.length > 1)}
                size="large"
                variant="contained"
                color="primary"
              >
                ذخیره
                <SaveIcon className={classes.saveIcon} />
              </Button>
            </Grid>
            <Grid
              container
              item
              direction="column"
              xs={12}
              sm={8}
              md={6}
              lg={4}
              xl={4}
            >
              <TextField
                id="name"
                label="نام"
                placeholder="حداقل دو حرف"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="name"
                label="نام خانوادگی"
                type="text"
                placeholder="حداقل دو حرف"
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        ) : null}
      </Layout>
    );
  }
}

export default withRouter(withSnackbar(withIntl(withStyles(styles)(User))));
