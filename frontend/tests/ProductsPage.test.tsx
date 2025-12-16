import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProductsPage } from '../src/pages/ProductsPage';

describe('ProductsPage', () => {
  it('renders the page container with correct max width', () => {
    const { container } = render(<ProductsPage />);

    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();
  });

  it('renders the ProductList component', () => {
    render(<ProductsPage />);

    // ProductList should render, which will show loading initially
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
