import Header from "./header";
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
    const { classes, pageContext, children, auth } = this.props;
    const { drawer } = this.state;
    return (
      <div>
        <CssBaseline />
        <Header
          pageContext={pageContext}
          drawerOpen={this.handleDrawerOpen}
          drawerClose={this.handleDrawerClose}
          drawer={drawer}
          auth={auth}
        />
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}

export default Layout;
