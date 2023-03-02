import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useSelector } from "react-redux";
import MinimalLayout from "../layout/MinimalLayout";
import NavigationScroll from "../layout/NavigationScroll";
import theme from "../themes";

export default function Pages() {
  const customization = useSelector((state) => state.customization);
  return (
    <>
      <StyledEngineProvider injectfirst>
        <ThemeProvider theme={theme(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <MinimalLayout />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
