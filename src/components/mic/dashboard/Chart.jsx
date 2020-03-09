import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from '../template/Title';
import Typography from "@material-ui/core/Typography";
import Text from "recharts/lib/component/Text";

function createData(time, amount) {
    return {time, amount};
}

const useStyles = makeStyles({
    totalContext: {
        flex: 1,
    },
});

const data = [
    createData('12:00', 57),
    createData('01:00', 112),
    createData('02:00', 48),
    createData('03:00', 65),
    createData('04:00', 78),
    createData('05:00', 32),
    createData('06:00', 18),
    createData('07:00', 2),
    createData('08:00', undefined),
];

export default function Chart() {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Number of Scans by hour</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary} orientation='left' label={
                        <Text
                            x={0}
                            y={0}
                            dx={50}
                            dy={100}
                            offset={0}
                            angle={-90}
                        >Counts</Text>
                    }>

                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
            <Typography color="textSecondary" className={classes.totalContext}>
                14 itens scanned per 10m in Average. (ETC in 6.3 hours)
            </Typography>
        </React.Fragment>
    );
}
