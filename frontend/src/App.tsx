import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <ProductList />
        <ShoppingCart />
      </Box>
    </ThemeProvider>
  );
}

export default App;
