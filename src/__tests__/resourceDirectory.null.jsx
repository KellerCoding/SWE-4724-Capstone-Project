// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { vi } from 'vitest';
// import { ResourceDirectory } from '../Pages/ResourceDirectory';

// // Mock the navigation hook
// const mockNavigate = vi.fn();
// vi.mock('react-router-dom', async () => {
//     const actual = await vi.importActual('react-router-dom');
//     return {
//         ...actual,
//         useNavigate: () => mockNavigate,
//     };
// });

// // Mock the images
// vi.mock('../assets/Images/resourceDirectory/gwatchtab1.png', () => ({ default: 'gwatchtab1.png' }));
// vi.mock('../assets/Images/resourceDirectory/gwatchtab2.png', () => ({ default: 'gwatchtab2.png' }));
// vi.mock('../assets/Images/resourceDirectory/gwatchtab3.png', () => ({ default: 'gwatchtab3.png' }));
// vi.mock('../assets/Images/resourceDirectory/gwatchtab4.png', () => ({ default: 'gwatchtab4.png' }));
// vi.mock('../assets/Images/resourceDirectory/gwatchtab5.png', () => ({ default: 'gwatchtab5.png' }));
// vi.mock('../assets/Images/resourceDirectory/gwatchtab6.png', () => ({ default: 'gwatchtab6.png' }));

// // Mock CSS
// vi.mock('./ResourceDirectory.css', () => ({}));

// describe('ResourceDirectory Component', () => {
//     beforeEach(() => {
//         mockNavigate.mockClear();
//     });

//     const renderResourceDirectory = () => {
//         return render(
//             <BrowserRouter>
//                 <ResourceDirectory />
//             </BrowserRouter>
//         );
//     };

//     describe('Component Rendering', () => {
//         it('should render the main heading', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Resource Directory')).toBeInTheDocument();
//         });

//         it('should render the description text', () => {
//             renderResourceDirectory();
//             expect(screen.getByText(/Use this guide to jumpstart your research/i)).toBeInTheDocument();
//         });

//         it('should render the header line', () => {
//             const { container } = renderResourceDirectory();
//             const headerLine = container.querySelector('.header-line');
//             expect(headerLine).toBeInTheDocument();
//         });

//         it('should render the resource grid', () => {
//             const { container } = renderResourceDirectory();
//             const grid = container.querySelector('.resource-grid');
//             expect(grid).toBeInTheDocument();
//         });
//     });

//     describe('Resource Cards Rendering', () => {
//         it('should render all 6 resource cards', () => {
//             const { container } = renderResourceDirectory();
//             const cards = container.querySelectorAll('.resource-card');
//             expect(cards).toHaveLength(6);
//         });

//         it('should render Affordable Housing card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Affordable Housing')).toBeInTheDocument();
//             expect(screen.getByAltText('Affordable Housing')).toBeInTheDocument();
//         });

//         it('should render Chronic Illness card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Chronic Illness')).toBeInTheDocument();
//             expect(screen.getByAltText('Chronic Illness')).toBeInTheDocument();
//         });

//         it('should render Dental Health card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Dental Health')).toBeInTheDocument();
//             expect(screen.getByAltText('Dental Health')).toBeInTheDocument();
//         });

//         it('should render Food Security card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Food Security')).toBeInTheDocument();
//             expect(screen.getByAltText('Food Security')).toBeInTheDocument();
//         });

//         it('should render Healthcare Access card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Healthcare Access')).toBeInTheDocument();
//             expect(screen.getByAltText('Healthcare Access')).toBeInTheDocument();
//         });

//         it('should render Hospital Accountability Scores card', () => {
//             renderResourceDirectory();
//             expect(screen.getByText('Hospital Accountability Scores')).toBeInTheDocument();
//             expect(screen.getByAltText('Hospital Accountability')).toBeInTheDocument();
//         });
//     });

//     describe('Images Rendering', () => {
//         it('should render all 6 card images', () => {
//             renderResourceDirectory();
//             const images = screen.getAllByRole('img');
//             expect(images).toHaveLength(6);
//         });

//         it('should render images with correct src attributes', () => {
//             renderResourceDirectory();
            
//             expect(screen.getByAltText('Affordable Housing')).toHaveAttribute('src', 'gwatchtab1.png');
//             expect(screen.getByAltText('Chronic Illness')).toHaveAttribute('src', 'gwatchtab2.png');
//             expect(screen.getByAltText('Dental Health')).toHaveAttribute('src', 'gwatchtab3.png');
//             expect(screen.getByAltText('Food Security')).toHaveAttribute('src', 'gwatchtab4.png');
//             expect(screen.getByAltText('Healthcare Access')).toHaveAttribute('src', 'gwatchtab5.png');
//             expect(screen.getByAltText('Hospital Accountability')).toHaveAttribute('src', 'gwatchtab6.png');
//         });

//         it('should render all images with proper alt text', () => {
//             renderResourceDirectory();
            
//             const altTexts = [
//                 'Affordable Housing',
//                 'Chronic Illness',
//                 'Dental Health',
//                 'Food Security',
//                 'Healthcare Access',
//                 'Hospital Accountability'
//             ];

//             altTexts.forEach(altText => {
//                 expect(screen.getByAltText(altText)).toBeInTheDocument();
//             });
//         });
//     });

//     describe('Buttons Rendering', () => {
//         it('should render "Click Here" button for each card', () => {
//             renderResourceDirectory();
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
//             expect(buttons).toHaveLength(6);
//         });

//         it('should render buttons with correct class', () => {
//             renderResourceDirectory();
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
            
//             buttons.forEach(button => {
//                 expect(button).toHaveClass('resource-btn');
//             });
//         });
//     });

//     describe('Navigation Functionality', () => {
//         it('should navigate to /scorecard when Hospital Accountability button is clicked', () => {
//             renderResourceDirectory();
            
//             // Get all buttons and find the last one (Hospital Accountability)
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
//             const hospitalAccountabilityButton = buttons[5]; // Last button
            
//             fireEvent.click(hospitalAccountabilityButton);
            
//             expect(mockNavigate).toHaveBeenCalledWith('/scorecard');
//         });

//         it('should call navigate exactly once when Hospital Accountability button is clicked', () => {
//             renderResourceDirectory();
            
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
//             const hospitalAccountabilityButton = buttons[5];
            
//             fireEvent.click(hospitalAccountabilityButton);
            
//             expect(mockNavigate).toHaveBeenCalledTimes(1);
//         });

//         it('should not navigate when other buttons are clicked', () => {
//             renderResourceDirectory();
            
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
            
//             // Click the first 5 buttons (not Hospital Accountability)
//             for (let i = 0; i < 5; i++) {
//                 fireEvent.click(buttons[i]);
//             }
            
//             // Navigate should not have been called for these buttons
//             expect(mockNavigate).not.toHaveBeenCalled();
//         });
//     });

//     describe('Card Structure', () => {
//         it('should have card-image div in each card', () => {
//             const { container } = renderResourceDirectory();
//             const cardImages = container.querySelectorAll('.card-image');
//             expect(cardImages).toHaveLength(6);
//         });

//         it('should have card-content div in each card', () => {
//             const { container } = renderResourceDirectory();
//             const cardContents = container.querySelectorAll('.card-content');
//             expect(cardContents).toHaveLength(6);
//         });

//         it('should have h3 heading in each card content', () => {
//             const { container } = renderResourceDirectory();
//             const headings = container.querySelectorAll('.card-content h3');
//             expect(headings).toHaveLength(6);
//         });
//     });

//     describe('Component Structure', () => {
//         it('should render resource-directory container', () => {
//             const { container } = renderResourceDirectory();
//             const mainContainer = container.querySelector('.resource-directory');
//             expect(mainContainer).toBeInTheDocument();
//         });

//         it('should render resource-header section', () => {
//             const { container } = renderResourceDirectory();
//             const header = container.querySelector('.resource-header');
//             expect(header).toBeInTheDocument();
//         });

//         it('should render resource-description section', () => {
//             const { container } = renderResourceDirectory();
//             const description = container.querySelector('.resource-description');
//             expect(description).toBeInTheDocument();
//         });

//         it('should have proper HTML structure', () => {
//             const { container } = renderResourceDirectory();
            
//             const mainDiv = container.querySelector('.resource-directory');
//             const header = mainDiv.querySelector('.resource-header');
//             const description = mainDiv.querySelector('.resource-description');
//             const grid = mainDiv.querySelector('.resource-grid');
            
//             expect(header).toBeInTheDocument();
//             expect(description).toBeInTheDocument();
//             expect(grid).toBeInTheDocument();
//         });
//     });

//     describe('Content Verification', () => {
//         it('should display all resource category titles', () => {
//             renderResourceDirectory();
            
//             const categories = [
//                 'Affordable Housing',
//                 'Chronic Illness',
//                 'Dental Health',
//                 'Food Security',
//                 'Healthcare Access',
//                 'Hospital Accountability Scores'
//             ];

//             categories.forEach(category => {
//                 expect(screen.getByText(category)).toBeInTheDocument();
//             });
//         });

//         it('should have description paragraph with correct content', () => {
//             renderResourceDirectory();
            
//             const description = screen.getByText(/Use this guide to jumpstart your research/i);
//             expect(description.tagName).toBe('P');
//             expect(description).toHaveTextContent('explore avenues of advocacy');
//             expect(description).toHaveTextContent('connect with organizations working in your community');
//         });
//     });

//     describe('Edge Cases', () => {
//         it('should not crash when rendered', () => {
//             expect(() => renderResourceDirectory()).not.toThrow();
//         });

//         it('should handle multiple clicks on Hospital Accountability button', () => {
//             renderResourceDirectory();
            
//             const buttons = screen.getAllByRole('button', { name: /Click Here/i });
//             const hospitalAccountabilityButton = buttons[5];
            
//             fireEvent.click(hospitalAccountabilityButton);
//             fireEvent.click(hospitalAccountabilityButton);
//             fireEvent.click(hospitalAccountabilityButton);
            
//             expect(mockNavigate).toHaveBeenCalledTimes(3);
//             expect(mockNavigate).toHaveBeenCalledWith('/scorecard');
//         });

//         it('should render correctly with all elements present', () => {
//             const { container } = renderResourceDirectory();
            
//             // Check that component has all major sections
//             expect(container.querySelector('.resource-directory')).toBeInTheDocument();
//             expect(container.querySelector('.resource-header')).toBeInTheDocument();
//             expect(container.querySelector('.resource-description')).toBeInTheDocument();
//             expect(container.querySelector('.resource-grid')).toBeInTheDocument();
//             expect(container.querySelectorAll('.resource-card')).toHaveLength(6);
//         });
//     });

//     describe('Accessibility', () => {
//         it('should have images with descriptive alt text', () => {
//             renderResourceDirectory();
            
//             const images = screen.getAllByRole('img');
//             images.forEach(img => {
//                 expect(img).toHaveAttribute('alt');
//                 expect(img.getAttribute('alt')).not.toBe('');
//             });
//         });

//         it('should have semantic heading structure', () => {
//             const { container } = renderResourceDirectory();
            
//             // Should have h1 for main heading
//             const h1 = container.querySelector('h1');
//             expect(h1).toBeInTheDocument();
//             expect(h1).toHaveTextContent('Resource Directory');
            
//             // Should have h3 for card titles
//             const h3s = container.querySelectorAll('h3');
//             expect(h3s).toHaveLength(6);
//         });

//         it('should have clickable buttons', () => {
//             renderResourceDirectory();
            
//             const buttons = screen.getAllByRole('button');
//             buttons.forEach(button => {
//                 expect(button).toBeEnabled();
//             });
//         });
//     });
// });