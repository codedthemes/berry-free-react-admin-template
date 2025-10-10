// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// ==============================|| SKELETON - EARNING CARD ||============================== //

export default function EarningCard() {
  return (
    <Card>
      <CardContent>
        <Stack>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Skeleton variant="rectangular" width={44} height={44} />
            <Skeleton variant="rectangular" width={34} height={34} />
          </Stack>
          <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
          <Skeleton variant="rectangular" height={30} />
        </Stack>
      </CardContent>
    </Card>
  );
}
