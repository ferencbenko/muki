import { Container } from '@mui/material';
import { ProductList } from '../components/ProductList';

export const ProductsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProductList />
    </Container>
  );
};
