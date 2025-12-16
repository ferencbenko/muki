import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../utils';

export const ShoppingCart = () => {
  const { items, isOpen, updateQuantity, removeFromCart, clearCart, getTotal, closeCart } =
    useCartStore();

  const handleIncrement = (productId: number, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <Box
        sx={{
          width: { xs: '100vw', sm: 400 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Cart ({items.length})
          </Typography>
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body1" color="text.secondary">
                Your cart is empty
              </Typography>
            </Box>
          ) : (
            <List>
              {items.map((item, index) => (
                <Box key={item.product.id}>
                  <ListItem
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      px: 0,
                      py: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
                      <Avatar
                        variant="rounded"
                        src={item.product.image_url || undefined}
                        alt={item.product.name}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(item.product.price)}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.product.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleDecrement(item.product.id, item.quantity)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 600 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleIncrement(item.product.id, item.quantity)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < items.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Box>

        {items.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A1A1A' }}>
                  {formatPrice(getTotal())}
                </Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth size="large" sx={{ mb: 1 }}>
                Checkout
              </Button>
              <Button variant="outlined" color="inherit" fullWidth onClick={clearCart}>
                Clear Cart
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
