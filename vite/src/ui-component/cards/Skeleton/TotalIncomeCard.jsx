// material-ui
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - TOTAL INCOME DARK/LIGHT CARD ||============================== //

const TotalIncomeCard = () => (
  <Card sx={{ p: 2 }}>
    <List sx={{ py: 0 }}>
      <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
        <ListItemAvatar>
          <Skeleton variant="rectangular" width={44} height={44} />
        </ListItemAvatar>
        <ListItemText sx={{ py: 0 }} primary={<Skeleton variant="rectangular" height={20} />} secondary={<Skeleton variant="text" />} />
      </ListItem>
    </List>
  </Card>
);

export default TotalIncomeCard;
