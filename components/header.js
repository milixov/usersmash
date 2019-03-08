import React from "react";
import withIntl from "../scripts/withIntl";

import IconButton from "@material-ui/core/IconButton";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { auth } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            <FormattedMessage id="app.appTitle" />
          </Typography>
          {auth && auth.length > 0 ? (
            <div>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit">
                <ExitToApp />
              </IconButton>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withIntl(Header);
