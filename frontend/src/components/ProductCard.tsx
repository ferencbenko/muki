import { Add as AddIcon } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';
import { formatPrice } from '../utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock === 0;
  const isAddToCartDisabled = isOutOfStock || quantityInCart >= product.stock;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="240"
        image={product.image_url || 'https://via.placeholder.com/400x240?text=No+Image'}
        alt={product.name}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ flexGrow: 1 }}>
            {product.name}
          </Typography>
          {isOutOfStock && <Chip label="Out of Stock" size="small" color="error" sx={{ ml: 1 }} />}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {product.description || 'No description available'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A1A' }}>
            {formatPrice(product.price)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
            size="small"
          >
            Add to Cart
          </Button>
        </Box>

        {product.stock > 0 && product.stock < 10 && (
          <Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
            Only {product.stock} left in stock
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
