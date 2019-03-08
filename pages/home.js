import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Layout from "../components/layout";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  }
});

class Home extends React.Component {
  render() {
    const { classes, pageContext } = this.props;

    return (
      <Layout classes={classes} pageContext={pageContext}>
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
      </Layout>
    );
  }
}

export default withStyles(styles)(Home);
