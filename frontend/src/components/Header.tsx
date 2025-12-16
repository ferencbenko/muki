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
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '-8px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FFC107',
                }}
              />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: '#1A1A1A',
                  letterSpacing: '0.1em',
                  fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                muki
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                ml: 2,
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
                fontSize: '1.1rem',
              }}
            >
              Smart Home Products
            </Typography>
          </Box>

          <IconButton
            color="primary"
            onClick={openCart}
            size="large"
            aria-label={`Shopping cart with ${itemCount} items`}
            sx={{ '& .MuiSvgIcon-root': { fontSize: '2rem' } }}
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
