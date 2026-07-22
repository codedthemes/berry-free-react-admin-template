'use client';

// next
import { Inter, Poppins, Roboto } from 'next/font/google';

// material-ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'ui-component/cards/MainCard';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// ==============================|| CUSTOMIZATION - FONT FAMILY ||============================== //

export default function FontFamilyPage() {
  const {
    state: { fontFamily },
    setField
  } = useConfig();

  const handleFontChange = (event) => {
    setField('fontFamily', event.target.value);
  };

  const fonts = [
    {
      id: 'inter',
      value: inter.style.fontFamily,
      label: 'Inter'
    },
    {
      id: 'poppins',
      value: poppins.style.fontFamily,
      label: 'Poppins'
    },
    {
      id: 'roboto',
      value: roboto.style.fontFamily,
      label: 'Roboto'
    }
  ];

  return (
    <Stack sx={{ p: 2, gap: 2.5 }}>
      <Typography variant="h5">FONT STYLE</Typography>
      <RadioGroup aria-label="payment-card" name="payment-card" value={fontFamily} onChange={handleFontChange}>
        <Grid container spacing={1.25}>
          {fonts.map((item, index) => (
            <Grid key={index} size={12}>
              <MainCard content={false} sx={() => ({ p: 0.75, bgcolor: fontFamily === item.value ? 'primary.lighter' : 'grey.50' })}>
                <MainCard
                  content={false}
                  border
                  sx={{
                    p: 1.75,
                    borderWidth: 1,
                    ...(fontFamily === item.value && { borderColor: 'primary.main' })
                  }}
                >
                  <FormControlLabel
                    sx={{ width: 1 }}
                    control={<Radio value={item.value} sx={{ display: 'none' }} />}
                    label={
                      <Typography variant="h5" sx={{ pl: 2, fontFamily: item.value }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </MainCard>
              </MainCard>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </Stack>
  );
}
