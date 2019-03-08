import React from "react";
import withIntl from "../scripts/withIntl";

import IconButton from "@material-ui/core/IconButton";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { withRouter } from "next/router";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { router } = this.props;
    var token = localStorage.getItem("token");

    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            <FormattedMessage id="app.appTitle" />
          </Typography>
          {token && token.length > 0 ? (
            <div>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => {
                  localStorage.setItem("token", "");
                  router.push("/");
                }}
              >
                <ExitToApp />
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withIntl(Header));
