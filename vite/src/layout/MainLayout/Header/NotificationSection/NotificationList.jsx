import PropTypes from 'prop-types';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';

// assets
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto } from '@tabler/icons-react';
import User1 from 'assets/images/users/user-round.svg';

const ListItemWrapper = ({ children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: alpha(theme.palette.grey[200], 0.3)
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
    const containerSX = { pl: 7 };

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
                '& .MuiListItem-root': {
                    p: 0
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
                <Stack spacing={2} sx={containerSX}>
                    <Typography variant="subtitle2">It is a long established fact that a reader will be distracted</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Chip label="Unread" color="error" size="small" sx={{ width: 'min-content' }} />
                        <Chip label="New" color="warning" size="small" sx={{ width: 'min-content' }} />
                    </Stack>
                </Stack>
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
                            <Chip label="Unread" color="error" size="small" sx={{ width: 'min-content' }} />
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
                            <Typography variant="caption" display="block" gutterBottom>
                                2 min ago
                            </Typography>
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
                            <Button variant="contained" disableElevation endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}>
                                Mail
                            </Button>
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
                            <Chip label="Confirmation of Account." color="success" size="small" sx={{ width: 'min-content' }} />
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemWrapper>
        </List>
    );
};

export default NotificationList;
