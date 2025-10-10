export default function Typography(fontFamily) {
  return {
    fontFamily,
    h6: {
      fontWeight: 500,
      fontSize: '0.75rem'
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    h1: {
      fontSize: '2.125rem',
      fontWeight: 700
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em'
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em'
    },
    button: {
      textTransform: 'capitalize'
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px'
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem'
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem'
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem'
    }
  };
}
