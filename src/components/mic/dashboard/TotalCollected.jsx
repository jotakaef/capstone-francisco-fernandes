import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../template/Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    totalContext: {
        flex: 1,
    },
});

export default function TotalCollected() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>IC Event Status</Title>
            <Typography component="p" variant="h4">
                85%
            </Typography>
            <br/>
            <Typography color="textSecondary" className={classes.totalContext}>
                Last Scanned<br/>Today at 2:32pm
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View Details
                </Link>
            </div>
        </React.Fragment>
    );
}
