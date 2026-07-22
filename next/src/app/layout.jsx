import PropTypes from 'prop-types';

import './../scss/style.scss';

// project imports
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata = {
  title: ' Berry - React MUI Admin Dashboard Template',
  description:
    'Berry is a fully customizable and powerful admin dashboard template built with React.js, MUI, and Next.js for your next project.'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script defer src="https://fomo.codedthemes.com/pixel/jAgJNY0WuNyOO0aM7ql1AqLRKRH5d737"></script>
      </head>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.node };
