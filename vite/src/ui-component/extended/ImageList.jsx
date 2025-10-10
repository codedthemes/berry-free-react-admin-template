import PropTypes from 'prop-types';
// material-ui
import CardMedia from '@mui/material/CardMedia';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';

// project imports
import useConfig from 'hooks/useConfig';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// set image width & height radio
function srcset(image, width, height, rows = 1, cols = 1) {
  return `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format 1x,
  ${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`;
}

export default function ImageList({ itemData }) {
  const {
    state: { borderRadius }
  } = useConfig();

  return (
    <MImageList
      sx={{
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflowY: 'visible',
        mb: 0
      }}
      gap={8}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows} sx={{ overflow: 'hidden', borderRadius: `${borderRadius}px` }}>
            <Box sx={{ height: item.featured ? 320 : 220, maxWidth: '100%' }}>
              <CardMedia
                component="img"
                sx={{ height: 1 }}
                src={srcset(getImageUrl(`${item.img}`, ImagePath.PROFILE), 250, 200, rows, cols)}
                alt={item.title}
                loading="lazy"
              />
            </Box>
            <ImageListItemBar
              sx={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
              }}
              title={item.title}
              position="top"
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </MImageList>
  );
}

ImageList.propTypes = { itemData: PropTypes.array };
