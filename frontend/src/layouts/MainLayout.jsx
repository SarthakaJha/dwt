import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <CssBaseline />

      <Header />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100],
          flexGrow: 1,
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
