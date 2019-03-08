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
    const { classes, pageContext, children } = this.props;
    const { drawer } = this.state;
    return (
      <div>
        <CssBaseline />
        <Header
          classes={classes.appBar}
          pageContext={pageContext}
          drawerOpen={this.handleDrawerOpen}
          drawerClose={this.handleDrawerClose}
          drawer={drawer}
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
