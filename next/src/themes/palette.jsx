// project imports
import { extendPaletteWithChannels } from 'utils/colorUtils';

// assets
import defaultColor from './theme/default';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export function buildPalette(presetColor) {
  let colors;
  switch (presetColor) {
    case 'default':
    default:
      colors = defaultColor;
  }

  const commonColor = { common: { black: '#111936', white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(colors.light);
  const extendedCommon = extendPaletteWithChannels(commonColor);

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight
    }
  };
}
