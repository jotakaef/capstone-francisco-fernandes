import {makeStyles} from "@material-ui/core/styles";
import {green, red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    contentGrid: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
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
    formControl: {
        margin: theme.spacing(0.5),
        minWidth: 120
    }, margin: {
        margin: theme.spacing(1),
    }, padding: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2)
    }, fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }, input: {
        display: 'none',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonError: {
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    }
}));


export default useStyles;
