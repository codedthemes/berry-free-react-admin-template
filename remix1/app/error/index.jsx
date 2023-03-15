import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import { useSelector } from "react-redux";
import NavigationScroll from "../layout/NavigationScroll";
import theme from "../themes";
import ErrorPage from "./errorPage";

const Error = () => {
  const customization = useSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectfirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <ErrorPage />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Error;
