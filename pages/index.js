import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withSnackbar } from "notistack";
import withIntl from "../scripts/withIntl";

import Login from "./login";
import Layout from "../components/layout";

import { withRouter } from "next/router";

const styles = theme => ({
  root: {
    display: "flex"
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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth: false };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount = () => {
    const { router } = this.props;
    var token = localStorage.getItem("token");
    if (token && token.length > 0) {
      this.setState({ auth: true });
      router.push("/home");
    } else {
      this.setState({ auth: false });
    }
  };

  render() {
    const { classes, pageContext } = this.props;

    return (
      <Layout classes={classes} pageContext={pageContext} basic>
        {!this.state.auth ? (
          <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
              <Paper className={classes.paper}>
                <Login classes={classes} />
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Layout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withIntl(withSnackbar(withStyles(styles)(Index))));
