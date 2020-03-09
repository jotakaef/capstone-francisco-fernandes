import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../template/Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '20-02-06 02:32pm', 'Elvis Presley', '010', '60124 - FLOOR ORBITAL SCREEN 80 GRIT', "22%"),
    createData(1, '20-02-06 02:31pm', 'Paul McCartney', '020', '60196 - 7 SANDING DISC - 24 GRIT', "54%"),
    createData(2, '20-02-06 02:26pm', 'Paul McCartney', '020', '60196 - 7 SANDING DISC - 24 GRIT', "54%"),
    createData(3, '20-02-06 02:24pm', 'Paul McCartney', '020', '60196 - 7 SANDING DISC - 24 GRIT', "53%"),
    createData(4, '20-02-06 02:15pm', 'Bruce Springsteen', '010', '60205 - 3 X 21 BELT - 80 GRIT EAC', "100%"),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function RecentScannedItens() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Scanned Itens</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">% Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more
                </Link>
            </div>
        </React.Fragment>
    );
}
