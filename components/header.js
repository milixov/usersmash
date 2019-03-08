import React from "react";
import withIntl from "../scripts/withIntl";

import IconButton from "@material-ui/core/IconButton";
import { FormattedMessage } from "react-intl";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";

import { withRouter } from "next/router";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { router, intl, basic } = this.props;
    var token = localStorage.getItem("token");

    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            <FormattedMessage id="app.appTitle" />
          </Typography>
          {!basic && token && token.length > 0 ? (
            <div>
              <Tooltip
                title={intl.formatMessage({ id: "tlp.profile" })}
                aria-label="profile"
              >
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={intl.formatMessage({ id: "tlp.signOut" })}
                aria-label="signOut"
              >
                <IconButton
                  color="inherit"
                  onClick={() => {
                    localStorage.clear();
                    router.push("/");
                  }}
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withIntl(Header));
