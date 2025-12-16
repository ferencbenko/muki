import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductsPage } from './pages/ProductsPage';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <ProductsPage />
        <ShoppingCart />
      </Box>
    </ThemeProvider>
  );
}

export default App;
