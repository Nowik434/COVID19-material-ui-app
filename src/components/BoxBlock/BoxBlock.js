import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ApiContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 29,
        textAlign: 'center',
        color: 'black',
    },
    pos: {
        marginBottom: 12,
    },
    date: {
        fontSize: 17,
        textAlign: 'center',
        color: 'black',
    },
    cardHeader1: {
        backgroundColor: '#78909c',
        fontSize: 14,
    },
    cardHeader2: {
        backgroundColor: '#66bb6a',
        fontSize: 14,
    },
    cardHeader3: {
        backgroundColor: '#ef5350',
        fontSize: 14,
    }
});


const BoxBlock = () => {
    const { confirmed, recovered, deaths, lastUpdate } = useContext(ApiContext);
    const classes = useStyles();

    if (!confirmed) {
        return 'Loading';
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={4}>
                    <Paper className={classes.date} variant="outlined" square>Ostatnia aktualizacja: {new Date(lastUpdate).toDateString()}</Paper>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardHeader
                        title='Potwierdzone przypadki'
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader1}
                        disableTypography='true'
                    />
                    <CardContent backgroundColor="primary">
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2.75}
                                separator={','}>
                            </CountUp>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardHeader
                        title='Wyzdrowienia'
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader2}
                        disableTypography='true'
                    />
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2.75}
                                separator={','}>
                            </CountUp>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardHeader
                        title='Zgony'
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        className={classes.cardHeader3}
                        disableTypography='true'
                    />
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            <CountUp
                                start={0}
                                end={deaths.value}
                                duration={2.75}
                                separator={','}>
                            </CountUp>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default BoxBlock;