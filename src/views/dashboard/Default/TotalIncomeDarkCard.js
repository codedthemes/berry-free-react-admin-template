import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
            borderRadius: '50%',
            top: '-30px',
            right: '-180px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
            borderRadius: '50%',
            top: '-160px',
            right: '-130px'
        }
    },
    content: {
        padding: '16px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.primary[800],
        color: '#fff'
    },
    primary: {
        color: '#fff'
    },
    secondary: {
        color: theme.palette.primary.light,
        marginTop: '5px'
    },
    padding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

// ===========================|| DASHBOARD - TOTAL INCOME DARK CARD ||=========================== //

const TotalIncomeDarkCard = ({ isLoading }) => {
    const classes = useStyles();

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <List className={classes.padding}>
                        <ListItem alignItems="center" disableGutters className={classes.padding}>
                            <ListItemAvatar>
                                <Avatar variant="rounded" className={classes.avatar}>
                                    <TableChartOutlinedIcon fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                className={classes.padding}
                                sx={{
                                    mt: 0.45,
                                    mb: 0.45
                                }}
                                primary={
                                    <Typography variant="h4" className={classes.primary}>
                                        $203k
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" className={classes.secondary}>
                                        Total Income
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </MainCard>
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
