import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';

// project-import
import Chip from 'ui-component/extended/Chip';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons-react';
import User1 from 'assets/images/users/user-round.svg';

const ListItemWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'primary.light'
                }
            }}
        >
            {children}
        </Box>
    );
};

ListItemWrapper.propTypes = {
    children: PropTypes.node
};

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <ListItemWrapper>
                <ListItem
                    alignItems="center"
                    secondaryAction={
                        <Grid container justifyContent="flex-end">
                            <Grid size={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary="John Doe" />
                </ListItem>
                <Grid container direction="column" className="list-container" sec>
                    <Grid size={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container>
                            <Grid>
                                <Chip label="Unread" sx={chipErrorSX} />
                            </Grid>
                            <Grid>
                                <Chip label="New" sx={chipWarningSX} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem
                    alignItems="center"
                    secondaryAction={
                        <Grid container justifyContent="flex-end">
                            <Grid size={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: theme.palette.success.dark,
                                backgroundColor: theme.palette.success.light,
                                border: 'none',
                                borderColor: theme.palette.success.main
                            }}
                        >
                            <IconBuildingStore stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Store Verification Done</Typography>} />
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid size={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">We have successfully received your request.</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container>
                            <Grid>
                                <Chip label="Unread" sx={chipErrorSX} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem
                    alignItems="center"
                    secondaryAction={
                        <Grid container justifyContent="flex-end">
                            <Grid>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: theme.palette.primary.dark,
                                backgroundColor: theme.palette.primary.light,
                                border: 'none',
                                borderColor: theme.palette.primary.main
                            }}
                        >
                            <IconMailbox stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">Check Your Mail.</Typography>} />
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid size={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container>
                            <Grid>
                                <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                                    Mail
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem
                    alignItems="center"
                    secondaryAction={
                        <Grid container justifyContent="flex-end">
                            <Grid size={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid size={12} sx={{ pb: 2 }}>
                        <Typography component="span" variant="subtitle2">
                            Uploaded two file on &nbsp;
                            <Typography component="span" variant="h6">
                                21 Jan 2020
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Card
                            sx={{
                                backgroundColor: theme.palette.secondary.light
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <IconPhoto stroke={1.5} size="1.3rem" />
                                    <Typography variant="subtitle1">demo.jpg</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem
                    alignItems="center"
                    secondaryAction={
                        <Grid container justifyContent="flex-end">
                            <Grid size={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                >
                    <ListItemAvatar>
                        <Avatar alt="John Doe" src={User1} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">John Doe</Typography>} />
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid size={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container>
                            <Grid>
                                <Chip label="Confirmation of Account." sx={chipSuccessSX} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
        </List>
    );
};

export default NotificationList;
