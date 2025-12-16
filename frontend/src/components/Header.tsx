import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useCartStore } from '../store/cartStore';

export const Header = () => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const openCart = useCartStore((state) => state.openCart);

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #FFC107 30%, #FFD54F 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              muki
            </Typography>
            <Typography
              variant="body2"
              sx={{ ml: 2, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}
            >
              Smart Home Products
            </Typography>
          </Box>

          <IconButton
            color="primary"
            onClick={openCart}
            size="large"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <Badge badgeContent={itemCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
