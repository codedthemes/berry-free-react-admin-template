import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

export default function TotalIncomeLightCard({ isLoading, total, icon, label }) {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(210.04deg, ${label === 'Meeting attends' ? theme.vars.palette.error.dark : theme.vars.palette.warning.light} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
              borderRadius: '50%',
              top: -30,
              right: -180
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(140.9deg, ${label === 'Meeting attends' ? theme.vars.palette.error.dark : theme.vars.palette.warning.light} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
              borderRadius: '50%',
              top: -160,
              right: -130
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar variant="rounded" color={label === 'Meeting attends' ? 'error' : 'warning'} data-soft>
                    {icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={<Typography variant="h4">${total}k</Typography>}
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.5 }}>
                      {label}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </MainCard>
      )}
    </>
  );
}

TotalIncomeLightCard.propTypes = { isLoading: PropTypes.bool, total: PropTypes.number, icon: PropTypes.node, label: PropTypes.string };
