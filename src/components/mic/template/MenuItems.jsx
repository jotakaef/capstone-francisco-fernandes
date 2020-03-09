import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import Icon from "@material-ui/core/Icon";
import {loadCSS} from 'fg-loadcss';

export function FontAwesomeBarCode() {

    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);

    return (
        <Icon className="fas fa-barcode"/>
    );
}

export const menuMainItems = (
    <div>
        <ListItem button onClick={event => window.location.href = '/welcome'}>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button onClick={event => window.location.href = '/inventory'}>
            <ListItemIcon>
                <LibraryAddCheckIcon/>
            </ListItemIcon>
            <ListItemText primary="MIC Event"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItem>
        <ListItem button onClick={event => window.location.href = '/scan'}>
            <ListItemIcon>
                <FontAwesomeBarCode/>
            </ListItemIcon>
            <ListItemText primary="Counter"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Admin"/>
        </ListItem>
    </div>
);

export const menuSecondaryItems = (
    <div>
        <ListSubheader inset>Quick Reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Partial Status"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="User Stats"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Original Source"/>
        </ListItem>
    </div>
);
