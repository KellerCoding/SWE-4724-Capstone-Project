import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../Pages/Navbar';

it('renders the navbar brand text', () => {
    render(<Navbar />);
    expect(screen.getByText('PROTECTING CONSUMERS SINCE')).toBeInTheDocument();
});

it('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('MEDIA')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
});

it('renders the search input', () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
});

it('renders the search icon', () => {
    render(<Navbar />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
});

it('renders the hamburger menu', () => {
    render(<Navbar />);
    expect(screen.getByText('☰')).toBeInTheDocument();
});

it('renders the checkbox input for menu', () => {
    render(<Navbar />);
    const menuCheckbox = screen.getByRole('checkbox');
    expect(menuCheckbox).toBeInTheDocument();
    expect(menuCheckbox.id).toBe('menu');
});

it('renders nav links with correct structure', () => {
    render(<Navbar />);
    const aboutLink = screen.getByText('ABOUT').closest('a');
    const mediaLink = screen.getByText('MEDIA').closest('a');
    const contactLink = screen.getByText('CONTACT').closest('a');
    console.log("Contact Link", contactLink)
    expect(aboutLink).toBeInTheDocument();
    expect(mediaLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
});