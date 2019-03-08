import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Layout from "../components/layout";

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

class Home extends React.Component {
  render() {
    const { classes, pageContext } = this.props;

    return (
      <Layout classes={classes} pageContext={pageContext}>
        <div className={styles.root}>
          <Typography variant="h4" gutterBottom>
            Material-UI
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Home page
          </Typography>
          <Typography gutterBottom>
            <Link href="/">
              <a>Go to the main page</a>
            </Link>
          </Typography>
          <Button variant="contained" color="primary">
            Do nothing button
          </Button>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(Home);
