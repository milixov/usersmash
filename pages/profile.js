import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditlIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
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
    marginTop: 24
  },
  saveIcon: {
    marginLeft: theme.spacing.unit
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
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

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      edit: false,
      firstName: "",
      lastName: ""
    };
  }

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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    const { router } = this.props;
    try {
      const storage = JSON.parse(localStorage.getItem("data"));
      const data = storage["data"];
      console.log("milix", router.query.id);
      this.setState({
        data: data.find(item => item.id.toString() === router.query.id)
      });
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };

  render() {
    const { classes, pageContext, router } = this.props;
    const { data, edit, loading } = this.state;

    return (
      <Layout classes={classes} pageContext={pageContext}>
        {data ? (
          <Grid container justify="center">
            <Grid container direction="row" alignItems="center">
              <Typography style={{ flexGrow: 1 }} variant="h5">
                پروفایل
              </Typography>
              {!edit ? (
                <div>
                  <Button
                    style={{ marginLeft: 24 }}
                    onClick={() => router.push("/home")}
                    color="primary"
                  >
                    بازگشت
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ edit: true })}
                  >
                    ویرایش
                    <EditlIcon className={classes.saveIcon} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    style={{ marginLeft: 24 }}
                    onClick={() => this.setState({ edit: false })}
                    color="primary"
                  >
                    انصراف
                  </Button>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ edit: true })}
                  >
                    ذخیره
                    <SaveIcon className={classes.saveIcon} />
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
              <Paper container className={classes.paper}>
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Grid container style={{ padding: 24 }} direction="column">
                    <Grid container direction="row" alignItems="center">
                      <Avatar
                        alt="profile_pic"
                        src={data.avatar}
                        style={{ margin: 10, width: 100, height: 100 }}
                      />
                      <Typography style={{ flexGrow: 1 }} variant="h6">{`${
                        data.first_name
                      } ${data.last_name}`}</Typography>
                    </Grid>
                    <Collapse in={edit}>
                      <Grid container direction="column">
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
                    </Collapse>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h3">کاربری یافت نشد</Typography>
        )}
      </Layout>
    );
  }
}

export default withRouter(withSnackbar(withIntl(withStyles(styles)(Profile))));
