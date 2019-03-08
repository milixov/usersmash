import React from "react";

import Button from "@material-ui/core/Button";
import withIntl from "../scripts/withIntl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import Layout from "../components/layout";

import { withRouter } from "next/router";
import axios from "axios";

const styles = theme => ({
  root: {
    display: "flex",
    padding: 24
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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: false,
      data: [],
      selectedItem: null,
      deleteDialog: false
      // page: 0,
      // perPage: 0,
      // total: 0,
      // totalPages: 0
    };
  }

  handleClickOpenDialog = item => {
    this.setState({ selectedItem: item, deleteDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ selectedItem: null, deleteDialog: false });
  };

  componentWillMount = () => {
    const { router } = this.props;
    var token = localStorage.getItem("token");
    if (!(token && token.length > 0)) {
      this.setState({ auth: false });
      router.push("/");
    } else {
      this.setState({ auth: true });
    }
  };

  dataGatherListener = data => {
    console.log("milix", data);
    this.setState({
      perPage: data["per_page"],
      total: data["total"],
      totalPages: data["total_pages"],
      data: data["data"]
    });
  };

  dataCollector = page => {
    // const url = "https://reqres.in/api/users?page=" + page;
    const url = "https://reqres.in/api/users?page=1";
    this.setState({ loading: true });

    try {
      this.dataGatherListener(JSON.parse(localStorage.getItem(url)));
      this.setState({ loading: false });
    } catch (parseException) {
      axios
        .get(url, {
          auth: localStorage.getItem("token"),
          timeout: 5000
        })
        .then(resp => {
          localStorage.setItem(url, JSON.stringify(resp.data));
          this.dataGatherListener(resp["data"]);
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log(error);
          }
        })
        .finally(f => {
          this.setState({ loading: false });
        });
    }
  };

  componentDidMount = () => {
    // this.dataCollector(this.state.page + 1);
    this.dataCollector();
  };

  // handleChangePage = (event, page) => {
  //   this.setState({ page });
  //   this.dataCollector(page + 1);
  // };

  render() {
    const { classes, pageContext, intl } = this.props;
    const { data, selectedItem } = this.state;

    return (
      <Layout classes={classes} pageContext={pageContext}>
        {this.state.auth ? (
          <div className={styles.root}>
            <Grid direction="column">
              <Grid
                container
                direction="row"
                alignItems="center"
                style={{ marginBottom: 24 }}
              >
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                  کاربران
                </Typography>
                <Button size="large" variant="contained" color="primary">
                  کاربر جدید
                </Button>
              </Grid>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ردیف</TableCell>
                      <TableCell>تصویر</TableCell>
                      <TableCell>نام</TableCell>
                      <TableCell>نام خانوادگی</TableCell>
                      <TableCell align="right">عملیات</TableCell>
                    </TableRow>
                  </TableHead>
                  {this.state.loading ? (
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ paddingTop: 24, paddingBottom: 24 }}
                    >
                      <CircularProgress color="secondary" />
                    </Grid>
                  ) : (
                    <TableBody>
                      {data.map(item => (
                        <TableRow key={"row_" + item.id}>
                          <TableCell component="th" scope="row">
                            {item.id}
                          </TableCell>
                          <TableCell>
                            <Avatar
                              alt={"avatar_" + item.id}
                              src={item["avatar"]}
                            />
                          </TableCell>
                          <TableCell>{item["first_name"]}</TableCell>
                          <TableCell>{item["last_name"]}</TableCell>
                          <TableCell align="right">
                            <Tooltip
                              title={intl.formatMessage({ id: "tlp.delete" })}
                              aria-label="profile"
                            >
                              <IconButton
                                color="inherit"
                                onClick={() => this.handleClickOpenDialog(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                  {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      labelDisplayedRows={() =>
                        `صفحه ${page + 1} از ${totalPages}`
                      }
                      rowsPerPageOptions={[]}
                      count={total}
                      rowsPerPage={perPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter> */}
                </Table>
              </Paper>
            </Grid>
            <Dialog
              open={this.state.deleteDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"از حذف این سطر مطمئن هستید؟"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Typography>
                    {selectedItem
                      ? `کاربر ${selectedItem.first_name} ${
                          selectedItem.last_name
                        } با تایید این عملیات حذف خواهد شد`
                      : null}
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.handleCloseDialog()}
                  color="primary"
                >
                  انصراف
                </Button>
                <Button
                  onClick={() => this.handleCloseDialog()}
                  color="primary"
                >
                  تایید میکنم
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : null}
      </Layout>
    );
  }
}
export default withStyles(styles)(withIntl(withRouter(Home)));
