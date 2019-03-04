import Header from "./header";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";

class Layout extends React.Component {
  state = {
    drawer: false
  };

  handleDrawerOpen = () => {
    this.setState({ drawer: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawer: false });
  };

  render() {
    const { classes, pageContext, children } = this.props;
    const { drawer } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header
          classes={classes}
          pageContext={pageContext}
          drawerOpen={this.handleDrawerOpen}
          drawerClose={this.handleDrawerClose}
          drawer={drawer}
        />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: drawer
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}

export default Layout;
