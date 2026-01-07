// import { it, expect, describe } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { SubNavbar } from '../Pages/SubNavbar';

// const renderWithRouter = (component) => {
//     return render(
//         <BrowserRouter>
//             {component}
//         </BrowserRouter>
//     );
// };

// describe('SubNavbar Component', () => {
//     it('renders the logo image', () => {
//         renderWithRouter(<SubNavbar />);
//         const logo = screen.getByAltText('Georgia Watch Logo');
//         expect(logo).toBeInTheDocument();
//         expect(logo).toHaveAttribute('src', 'src/assets/Images/gwatchlogo.png');
//     });

//     it('renders all navigation links', () => {
//         renderWithRouter(<SubNavbar />);
//         expect(screen.getByText('OUR FOCUS')).toBeInTheDocument();
//         expect(screen.getByText('GET ASSISTANCE')).toBeInTheDocument();
//         expect(screen.getByText('ADVOCACY')).toBeInTheDocument();
//         expect(screen.getByText('SUPPORT US')).toBeInTheDocument();
//     });

//     it('renders the donate button', () => {
//         renderWithRouter(<SubNavbar />);
//         const donateButton = screen.getByRole('button', { name: /donate/i });
//         expect(donateButton).toBeInTheDocument();
//     });

//     it('renders the mobile menu toggle button', () => {
//         renderWithRouter(<SubNavbar />);
//         const menuToggle = screen.getByRole('button', { name: '☰' });
//         expect(menuToggle).toBeInTheDocument();
//     });

//     it('renders dropdown arrows for navigation items', () => {
//         renderWithRouter(<SubNavbar />);
//         const dropdownArrows = screen.getAllByText('▼');
//         expect(dropdownArrows.length).toBeGreaterThan(0);
//     });

//     it('renders all dropdown menu items when assistance dropdown is visible', () => {
//         renderWithRouter(<SubNavbar />);
//         const getAssistanceLink = screen.getByText('GET ASSISTANCE');
//         expect(getAssistanceLink).toBeInTheDocument();
//         // Note: Dropdown items only render when showGetAssistanceDropdown is true
//         // This would require user interaction to fully test
//     });

//     it('has correct styling on nav links', () => {
//         renderWithRouter(<SubNavbar />);
//         const ourFocusLink = screen.getByText('OUR FOCUS').closest('a');
//         expect(ourFocusLink).toHaveStyle({ color: '#333' });
//     });

//     it('renders the nav menu with correct structure', () => {
//         renderWithRouter(<SubNavbar />);
//         const navMenu = document.querySelector('.nav-menu');
//         expect(navMenu).toBeInTheDocument();
//         const navItems = navMenu.querySelectorAll('.nav-item');
//         expect(navItems.length).toBe(4);
//     });
// });