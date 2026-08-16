import PropTypes from 'prop-types';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// constant
const headerStyle = {
  '& .MuiCardHeader-action': { mr: 0 }
};

export default function MainCard({
  border = false,
  children,
  content = true,
  contentClass = '',
  contentSX = {},
  headerSX = {},
  darkTitle,
  secondary,
  sx = {},
  title,
  ref,
  ...others
}) {
  return (
    <Card
      ref={ref}
      {...others}
      sx={[
        {
          border: border ? '1px solid' : 'none',
          borderColor: 'divider'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ ...headerStyle, ...headerSX }} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={{ ...headerStyle, ...headerSX }} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
}

MainCard.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  headerSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.any,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ref: PropTypes.object,
  others: PropTypes.any
};
