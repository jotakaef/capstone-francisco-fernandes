import React, {Component} from "react";
import HelloWorldService from "../../../api/HelloWorldService";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Copyright} from '../LoginComponent';
import RecentScannedItens from "./RecentScannedItems";
import TotalCollected from "./TotalCollected";
import Chart from "./Chart";
import HeaderComponent from "../template/HeaderComponent";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export default function Dashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <HeaderComponent title={"Dashboard"}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart/>
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <TotalCollected/>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <RecentScannedItens/>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
        </div>
    );
}


export class DashboardComponent extends Component {
    constructor() {
        super();

        this.state = {
            welcomeMessage: ""
        }
    }

    render = () => {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">Welcome {this.props.match.params.name}
                    go <Link to="/todos">here</Link></div>

                <div className="container">
                    Click to have a customized bla bla bla
                    <button onClick={this.retrieveWelcomeMessage} className={"btn btn-success"}>Get Welcome
                        Message</button>
                </div>

                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        );
    }

    retrieveWelcomeMessage = () => {
        /*HelloWorldService.executeHelloWorldService().then(
          response => this.handleSuccessfulResponse(response)
        ).catch(
            error => this.handleError(error)
        );*/

        /*HelloWorldService.executeHelloWorldServiceBean().then(
            response => this.handleSuccessfulResponse(response)
        ).catch(
            error => this.handleError(error)
        );*/

        HelloWorldService.executeHelloWorldServiceBeanPathVariable(this.props.match.params.name).then(
            response => this.handleSuccessfulResponse(response)
        ).catch(
            error => this.handleError(error)
        );
    }

    handleSuccessfulResponse = (response) => {
        this.setState({welcomeMessage: response.data.message});
    }

    handleError = (error) => {
        let errorMessage = "";
        if (error.message) {
            errorMessage += error.message;
        }

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }
        this.setState({welcomeMessage: errorMessage});
    }
}
