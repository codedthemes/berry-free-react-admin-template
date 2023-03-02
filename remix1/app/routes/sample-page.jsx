import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import MainLayout from "../layout/MainLayout";
import NavigationScroll from "../layout/NavigationScroll";
import theme from "../themes";

export default function SamplePage() {
  const customization = useSelector((state) => state.customization);
  return (
    <>
      <StyledEngineProvider injectfirst>
        <ThemeProvider theme={theme(customization)}>
          <CssBaseline />
          <NavigationScroll>
          <MainLayout />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
