import React from "react";
import withIntl from "../scripts/withIntl";

import IconButton from "@material-ui/core/IconButton";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store.authStore;
  }

  render() {
    const { getAuth } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            <FormattedMessage id="app.appTitle" />
          </Typography>
          {getAuth ? (
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
