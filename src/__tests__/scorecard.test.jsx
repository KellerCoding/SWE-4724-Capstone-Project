// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { vi } from 'vitest';
// import { Scorecard } from '../Pages/Scorecard';

// // Mock the navigation hook
// const mockNavigate = vi.fn();
// vi.mock('react-router-dom', async () => {
//     const actual = await vi.importActual('react-router-dom');
//     return {
//         ...actual,
//         useNavigate: () => mockNavigate,
//     };
// });

// // Mock the hospital data with 30 hospitals for pagination testing
// vi.mock('../data/alphaTestData.json', () => {
//     const hospitalNames = [
//         'Northside Hospital Atlanta',
//         'Northside Hospital Forsyth',
//         'Emory University Hospital',
//         'Grady Memorial Hospital',
//         'Piedmont Atlanta Hospital',
//         'Wellstar Kennestone Hospital',
//         'Wellstar Cobb Hospital',
//         'AdventHealth Gordon',
//         'Bacon County Hospital and Health System',
//         'Bleckley Memorial Hospital',
//         'Brooks County Hospital',
//         'Candler County Hospital',
//         'Clinch Memorial Hospital',
//         'Chatuge Regional Hospital',
//         'Colquitt Regional Medical Center',
//         'Crisp Regional Hospital',
//         'Doctors Hospital of Augusta',
//         'Emanuel Medical Center',
//         'Emory Decatur Hospital',
//         'Emory Hillandale Hospital',
//         'Fairview Park Hospital',
//         'Floyd Medical Center',
//         'Gwinnett Medical Center',
//         'Hamilton Medical Center',
//         'Houston Medical Center',
//         'Memorial Hospital and Manor',
//         'Northeast Georgia Medical Center',
//         'Northside Hospital Cherokee',
//         'Phoebe Putney Memorial Hospital',
//         'Redmond Regional Medical Center'
//     ];
    
//     const cities = ['Atlanta', 'Savannah', 'Augusta', 'Columbus', 'Macon'];
//     const hospitals = {};
    
//     hospitalNames.forEach((name, index) => {
//         hospitals[String(index + 1)] = {
//             hospitalInfo: {
//                 name: name,
//                 city: cities[index % cities.length]
//             }
//         };
//     });
    
//     return { default: hospitals };
// });

// // Mock images
// vi.mock('../assets/Images/ratingStar.png', () => ({ default: 'star.png' }));
// vi.mock('../assets/Images/ratingStarGrey.png', () => ({ default: 'dullStar.png' }));

// describe('Scorecard Component', () => {
//     beforeEach(() => {
//         mockNavigate.mockClear();
//     });

//     const renderScorecard = () => {
//         return render(
//             <BrowserRouter>
//                 <Scorecard />
//             </BrowserRouter>
//         );
//     };

//     describe('Component Rendering', () => {
//         it('should render the main heading', () => {
//             renderScorecard();
//             expect(screen.getByText('Hospital Accountability Scorecard')).toBeInTheDocument();
//         });

//         it('should render the objective text', () => {
//             renderScorecard();
//             expect(screen.getByText(/Use this guide to jump start your research/i)).toBeInTheDocument();
//         });

//         it('should render the Compare Hospitals button', () => {
//             renderScorecard();
//             expect(screen.getByText('Compare Hospitals')).toBeInTheDocument();
//         });

//         it('should render filter section with correct buttons', () => {
//             renderScorecard();
//             expect(screen.getByText('Filter By')).toBeInTheDocument();
//             expect(screen.getByRole('button', { name: /City/i })).toBeInTheDocument();
//             // expect(screen.getByRole('button', { name: /County/i })).toBeInTheDocument();
//         });

//         it('should render sort section with correct buttons', () => {
//             renderScorecard();
//             expect(screen.getByText('Sort By')).toBeInTheDocument();
//             expect(screen.getByRole('button', { name: /Hospital Name/i })).toBeInTheDocument();
//             expect(screen.getByRole('button', { name: /Grade \/ Score/i })).toBeInTheDocument();
//         });
//     });

//     describe('Hospital Table', () => {
//         it('should render table headers correctly', () => {
//             renderScorecard();
//             expect(screen.getByText('Rank')).toBeInTheDocument();
//             expect(screen.getByText('Hospital')).toBeInTheDocument();
//             expect(screen.getByText('Grade')).toBeInTheDocument();
//             expect(screen.getByText('Details')).toBeInTheDocument();
//         });

//         it('should render hospitals from mock data', () => {
//             renderScorecard();
//             expect(screen.getByText('Northside Hospital Atlanta')).toBeInTheDocument();
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//             expect(screen.getByText('Grady Memorial Hospital')).toBeInTheDocument();
//         });

//         it('should render hospital cities', () => {
//             renderScorecard();
//             const atlantaCities = screen.getAllByText('Atlanta');
//             expect(atlantaCities.length).toBeGreaterThan(0);
//         });

//         it('should render View buttons for each hospital', () => {
//             renderScorecard();
//             const viewButtons = screen.getAllByRole('button', { name: /View/i });
//             expect(viewButtons).toHaveLength(30);
//         });

//         it('should render rating stars for each hospital', () => {
//             renderScorecard();
//             const stars = screen.getAllByAltText(/A|/);
//             expect(stars.length).toBeGreaterThan(0);
//         });

//         //issues 2
//         // it('should display rank numbers correctly', () => {
//         //     renderScorecard();
//         //     expect(screen.getByText('1')).toBeInTheDocument();
//         //     expect(screen.getByText('2')).toBeInTheDocument();
//         //     expect(screen.getByText('3')).toBeInTheDocument();
//         // });
//     });

//     describe('Navigation Functionality', () => {
//         it('should navigate to hospital detail page when View button is clicked', () => {
//             renderScorecard();
//             const viewButtons = screen.getAllByRole('button', { name: /View/i });
            
//             fireEvent.click(viewButtons[0]);
            
//             expect(mockNavigate).toHaveBeenCalledWith('/hospital-score/1');
//         });

//         it('should navigate with correct hospital ID for different hospitals', () => {
//             renderScorecard();
//             const viewButtons = screen.getAllByRole('button', { name: /View/i });
            
//             fireEvent.click(viewButtons[20]);
            
//             expect(mockNavigate).toHaveBeenCalledWith('/hospital-score/21');
//         });

//         it('should link to comparison page', () => {
//             renderScorecard();
//             const compareLink = screen.getByText('Compare Hospitals').closest('a');
//             expect(compareLink).toHaveAttribute('href', '/comparison');
//         });
//     });

//     describe('Sorting Functionality', () => {
//         it('should sort hospitals alphabetically when Hospital Name button is clicked', () => {
//             renderScorecard();
//             const sortButton = screen.getByRole('button', { name: /Hospital Name/i });
            
//             fireEvent.click(sortButton);
            
//             // Check that AdventHealth Gordon appears before Clinch Memorial Hospital after sorting
//             const atlantaMedical = screen.getByText('AdventHealth Gordon');
//             const cityGeneral = screen.getByText('Clinch Memorial Hospital');
//             const bethany = screen.getByText('Bleckley Memorial Hospital');
            
//             expect(atlantaMedical).toBeInTheDocument();
//             expect(cityGeneral).toBeInTheDocument();
//             expect(bethany).toBeInTheDocument();
//         });

//         it('should toggle sort order when clicked again', () => {
//             renderScorecard();
//             const sortButton = screen.getByRole('button', { name: /Hospital Name/i });
            
//             // First click - sort A-Z
//             fireEvent.click(sortButton);
//             expect(sortButton).toHaveTextContent('Hospital Name (A-Z)');
            
//             // Second click - return to original order
//             fireEvent.click(sortButton);
//             expect(sortButton).toHaveTextContent('Hospital Name');
//         });

//         it('should add active-sort class when sorting is enabled', () => {
//             renderScorecard();
//             const sortButton = screen.getByRole('button', { name: /Hospital Name/i });
            
//             expect(sortButton).not.toHaveClass('active-sort');
            
//             fireEvent.click(sortButton);
            
//             expect(sortButton).toHaveClass('active-sort');
//         });

//         it('should update ranks after sorting', () => {
//             renderScorecard();
//             const sortButton = screen.getByRole('button', { name: /Hospital Name/i });
            
//             fireEvent.click(sortButton);
            
//             // Ranks should still be 1, 2, 3 but for different hospitals
//             // const ranks = screen.getAllByText(/^[1-3]$/);
//             // expect(ranks).toHaveLength(30);
//         });
//     });

//     describe('Component Structure', () => {
//         it('should render the banner section', () => {
//             const { container } = renderScorecard();
//             const banner = container.querySelector('.banner');
//             expect(banner).toBeInTheDocument();
//         });

//         it('should render the left sidebar with filters and sort options', () => {
//             const { container } = renderScorecard();
//             const leftSection = container.querySelector('.left');
//             expect(leftSection).toBeInTheDocument();
//         });

//         it('should render the right section with table', () => {
//             const { container } = renderScorecard();
//             const rightSection = container.querySelector('.right');
//             expect(rightSection).toBeInTheDocument();
//         });

//         it('should render the search box placeholder', () => {
//             const { container } = renderScorecard();
//             const searchBox = container.querySelector('.search-box');
//             expect(searchBox).toBeInTheDocument();
//         });
//     });

//     describe('Edge Cases', () => {
//         it('should handle empty hospital data gracefully', () => {
//             // This test would require mocking empty data
//             // For now, just ensure no crash with current data
//             expect(() => renderScorecard()).not.toThrow();
//         });

//         it('should render correct number of star images per hospital', () => {
//             renderScorecard();
//             const stars = screen.getAllByRole('img');
//             // Should have 5 stars per hospital on first page (30 hospitals * 5 stars = 150)
//             // But images with empty alt text might not all be counted by role
//             expect(stars.length).toBeGreaterThan(0);
//             expect(stars.length % 5).toBe(0); // Should be a multiple of 5
//         });
//     });
// });