// third party
import { SnackbarProvider } from 'notistack';

// project imports
import { useSelector } from '../../store';

// assets
import { IconCircleCheck, IconSquareRoundedX, IconInfoCircle, IconAlertCircle } from '@tabler/icons-react';

// ===========================|| SNACKBAR - NOTISTACK ||=========================== //

export default function Notistack({ children }: any) {
  const snackbar = useSelector((state) => state.snackbar);
  const iconSX = { marginRight: 8, fontSize: '1.15rem' };

  return (
    <SnackbarProvider
      maxSnack={snackbar.maxStack}
      dense={snackbar.dense}
      iconVariant={
        snackbar.iconVariant === 'useemojis'
          ? {
              success: <IconCircleCheck style={iconSX} />,
              error: <IconSquareRoundedX style={iconSX} />,
              warning: <IconInfoCircle style={iconSX} />,
              info: <IconAlertCircle style={iconSX} />
            }
          : undefined
      }
      hideIconVariant={snackbar.iconVariant === 'hide' ? true : false}
    >
      {children}
    </SnackbarProvider>
  );
}
