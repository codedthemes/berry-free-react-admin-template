'use client';
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

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

export default function TotalIncomeDarkCard({ isLoading }) {
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
            bgcolor: 'primary.dark',
            color: 'primary.lighter',
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(210.04deg, ${theme.vars.palette.primary['lighter']} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
              borderRadius: '50%',
              top: -30,
              right: -180
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: `linear-gradient(140.9deg, ${theme.vars.palette.primary['lighter']} -14.02%, rgba(144, 202, 249, 0) 75.58%)`,
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
                  <Avatar variant="rounded" sx={{ bgcolor: 'primary.darker' }}>
                    <TableChartOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={
                    <Typography variant="h4" sx={{ color: 'common.white' }}>
                      $203k
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.lighter', mt: 0.25 }}>
                      Total Income
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

TotalIncomeDarkCard.propTypes = { isLoading: PropTypes.bool };
