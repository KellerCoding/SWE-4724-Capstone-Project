// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { vi } from 'vitest';
// import GeorgiaMap from '../Pages/GeorgiaMap';

// // Mock react-map-gl components
// vi.mock('react-map-gl', () => ({
//     __esModule: true,
//     default: ({ children, ...props }) => <div data-testid="map" {...props}>{children}</div>,
//     Marker: ({ children, latitude, longitude, onClick }) => (
//         <div 
//             data-testid="marker" 
//             data-lat={latitude} 
//             data-lng={longitude}
//             onClick={onClick}
//         >
//             {children}
//         </div>
//     ),
//     Popup: ({ children, latitude, longitude, onClose }) => (
//         <div 
//             data-testid="popup" 
//             data-lat={latitude} 
//             data-lng={longitude}
//         >
//             {children}
//             <button onClick={onClose} data-testid="close-popup">Close</button>
//         </div>
//     ),
//     Source: ({ children, id, data }) => (
//         <div data-testid={`source-${id}`} data-source-data={JSON.stringify(data)}>
//             {children}
//         </div>
//     ),
//     Layer: ({ id, type, paint }) => (
//         <div data-testid={`layer-${id}`} data-type={type} data-paint={JSON.stringify(paint)} />
//     ),
// }));

// // Mock Georgia GeoJSON data
// vi.mock('../data/georgia.json', () => ({
//     default: {
//         type: 'Feature',
//         geometry: {
//             type: 'Polygon',
//             coordinates: [[
//                 [-85.6052, 30.5707],
//                 [-80.8413, 30.5707],
//                 [-80.8413, 35.0012],
//                 [-85.6052, 35.0012],
//                 [-85.6052, 30.5707],
//             ]]
//         }
//     }
// }));

// // Mock Mapbox CSS
// vi.mock('mapbox-gl/dist/mapbox-gl.css', () => ({}));

// describe('GeorgiaMap Component', () => {
//     const renderGeorgiaMap = (hospitalId = null) => {
//         return render(
//             <BrowserRouter>
//                 <GeorgiaMap />
//             </BrowserRouter>
//         );
//     };

//     // For tests that need URL parameters
//     const renderWithRouter = (hospitalId) => {
//         return render(
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/map/:hospitalId" element={<GeorgiaMap />} />
//                 </Routes>
//             </BrowserRouter>
//         );
//     };

//     beforeEach(() => {
//         // Set environment variable for Mapbox token
//         import.meta..env.VITE_MAPBOX_TOKEN = 'test-token';
//     });

//     describe('Component Rendering', () => {
//         it('should render the map container', () => {
//             renderGeorgiaMap();
//             const map = screen.getByTestId('map');
//             expect(map).toBeInTheDocument();
//         });

//         it('should render the search input', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
//             expect(searchInput).toBeInTheDocument();
//         });

//         it('should render location items in the sidebar', () => {
//             renderGeorgiaMap();
//             expect(screen.getByText('Northside Hospital Atlanta')).toBeInTheDocument();
//             expect(screen.getByText('Northside Hospital Forsyth')).toBeInTheDocument();
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//         });

//         it('should render all markers on the map (32 hospitals)', () => {
//             renderGeorgiaMap();
//             const markers = screen.getAllByTestId('marker');
//             expect(markers).toHaveLength(32);
//         });

//         it('should render mode toggle buttons', () => {
//             renderGeorgiaMap();
//             expect(screen.getByText('Hole Mask')).toBeInTheDocument();
//             expect(screen.getByText('Hard Crop')).toBeInTheDocument();
//         });

//         it('should have Hole Mask button active by default', () => {
//             renderGeorgiaMap();
//             const holeMaskButton = screen.getByText('Hole Mask');
//             expect(holeMaskButton).toHaveClass('active');
//         });
//     });

//     describe('Search Functionality', () => {
//         it('should filter locations based on search input', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'Emory' } });
            
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//             expect(screen.queryByText('Northside Hospital Atlanta')).not.toBeInTheDocument();
//             expect(screen.queryByText('Grady Memorial Hospital')).not.toBeInTheDocument();
//         });

//         it('should be case insensitive when filtering', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'EMORY' } });
            
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//         });

//         it('should show "No matches found" when no locations match search', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'NonexistentHospital' } });
            
//             expect(screen.getByText('No matches found')).toBeInTheDocument();
//         });

//         it('should show all locations when search is cleared', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'Emory' } });
//             fireEvent.change(searchInput, { target: { value: '' } });
            
//             expect(screen.getByText('Northside Hospital Atlanta')).toBeInTheDocument();
//             expect(screen.getByText('Northside Hospital Forsyth')).toBeInTheDocument();
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//             expect(screen.getByText('Grady Memorial Hospital')).toBeInTheDocument();
//         });

//         it('should filter locations with partial matches', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'Hospital' } });
            
//             const locationItems = screen.getAllByText(/Hospital/);
//             expect(locationItems.length).toBeGreaterThan(0);
//         });
//     });

//     describe('Location Selection and Navigation', () => {
//         it('should show popup when location is clicked', () => {
//             renderGeorgiaMap();
//             const hospitalLocation = screen.getByText('Emory University Hospital');
            
//             fireEvent.click(hospitalLocation);
            
//             const popup = screen.getByTestId('popup');
//             expect(popup).toBeInTheDocument();
//             expect(popup).toHaveTextContent('Emory University Hospital');
//         });

//         it('should close popup when close button is clicked', () => {
//             renderGeorgiaMap();
//             const hospitalLocation = screen.getByText('Emory University Hospital');
            
//             fireEvent.click(hospitalLocation);
//             const closeButton = screen.getByTestId('close-popup');
//             fireEvent.click(closeButton);
            
//             expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
//         });

//         it('should show popup with correct details including city', () => {
//             renderGeorgiaMap();
//             const hospitalLocation = screen.getByText('Emory University Hospital');
            
//             fireEvent.click(hospitalLocation);
            
//             const popup = screen.getByTestId('popup');
//             expect(popup).toHaveTextContent('Emory University Hospital');
//             expect(popup).toHaveTextContent('Atlanta');
//         });

//         it('should update selected location when clicking different markers', () => {
//             renderGeorgiaMap();
            
//             // Click first location
//             fireEvent.click(screen.getByText('Northside Hospital Atlanta'));
//             expect(screen.getByTestId('popup')).toHaveTextContent('Northside Hospital Atlanta');
            
//             // Click second location
//             fireEvent.click(screen.getByText('Grady Memorial Hospital'));
//             expect(screen.getByTestId('popup')).toHaveTextContent('Grady Memorial Hospital');
//         });
//     });

//     describe('Map Mode Toggle', () => {
//         it('should switch to Hard Crop mode when button is clicked', () => {
//             renderGeorgiaMap();
//             const hardCropButton = screen.getByText('Hard Crop');
            
//             fireEvent.click(hardCropButton);
            
//             expect(hardCropButton).toHaveClass('active');
//             expect(screen.getByText('Hole Mask')).not.toHaveClass('active');
//         });

//         it('should switch back to Hole Mask mode', () => {
//             renderGeorgiaMap();
//             const hardCropButton = screen.getByText('Hard Crop');
//             const holeMaskButton = screen.getByText('Hole Mask');
            
//             fireEvent.click(hardCropButton);
//             fireEvent.click(holeMaskButton);
            
//             expect(holeMaskButton).toHaveClass('active');
//             expect(hardCropButton).not.toHaveClass('active');
//         });

//         it('should render hole mask layer when in Hole Mask mode', () => {
//             renderGeorgiaMap();
//             expect(screen.getByTestId('source-hole-mask')).toBeInTheDocument();
//         });

//         it('should not render hole mask layer when in Hard Crop mode', () => {
//             renderGeorgiaMap();
//             const hardCropButton = screen.getByText('Hard Crop');
            
//             fireEvent.click(hardCropButton);
            
//             expect(screen.queryByTestId('source-hole-mask')).not.toBeInTheDocument();
//         });
//     });

//     describe('URL Parameter Handling', () => {
//         it('should automatically select hospital when hospitalId is in URL', async () => {
//             // Use MemoryRouter for testing with initial entries
//             const { MemoryRouter } = await import('react-router-dom');
            
//             render(
//                 <MemoryRouter initialEntries={['/map/1']}>
//                     <Routes>
//                         <Route path="/map/:hospitalId" element={<GeorgiaMap />} />
//                     </Routes>
//                 </MemoryRouter>
//             );
            
//             // Should show popup for Northside Hospital Atlanta (id: "1")
//             await waitFor(() => {
//                 expect(screen.getByTestId('popup')).toHaveTextContent('Northside Hospital Atlanta');
//             });
//         });

//         it('should handle invalid hospitalId gracefully', async () => {
//             const { MemoryRouter } = await import('react-router-dom');
            
//             render(
//                 <MemoryRouter initialEntries={['/map/999']}>
//                     <Routes>
//                         <Route path="/map/:hospitalId" element={<GeorgiaMap />} />
//                     </Routes>
//                 </MemoryRouter>
//             );
            
//             // Should not crash, popup should not appear
//             expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
//         });
//     });

//     describe('Map Layers', () => {
//         it('should render Georgia boundary source', () => {
//             renderGeorgiaMap();
//             expect(screen.getByTestId('source-georgia-boundary')).toBeInTheDocument();
//         });

//         it('should render Georgia fill layer', () => {
//             renderGeorgiaMap();
//             expect(screen.getByTestId('layer-georgia-fill')).toBeInTheDocument();
//         });

//         it('should render Georgia outline layer', () => {
//             renderGeorgiaMap();
//             expect(screen.getByTestId('layer-georgia-outline')).toBeInTheDocument();
//         });

//         it('should render hole fill layer when in mask mode', () => {
//             renderGeorgiaMap();
//             expect(screen.getByTestId('layer-hole-fill')).toBeInTheDocument();
//         });
//     });

//     describe('Marker Placement', () => {
//         it('should render markers with correct coordinates', () => {
//             renderGeorgiaMap();
//             const markers = screen.getAllByTestId('marker');
            
//             // Check Northside Hospital Atlanta coordinates (first hospital)
//             expect(markers[0]).toHaveAttribute('data-lat', '33.91023');
//             expect(markers[0]).toHaveAttribute('data-lng', '-84.35443');
//         });

//         it('should render emoji icon for markers', () => {
//             renderGeorgiaMap();
//             const markers = screen.getAllByTestId('marker');
            
//             markers.forEach(marker => {
//                 expect(marker).toHaveTextContent('📍');
//             });
//         });
//     });

//     describe('Component Structure', () => {
//         it('should render sidebar with correct class', () => {
//             const { container } = renderGeorgiaMap();
//             const sidebar = container.querySelector('.sidebar');
//             expect(sidebar).toBeInTheDocument();
//         });

//         it('should render map wrapper with correct class', () => {
//             const { container } = renderGeorgiaMap();
//             const mapWrapper = container.querySelector('.map-wrapper');
//             expect(mapWrapper).toBeInTheDocument();
//         });

//         it('should render location list', () => {
//             const { container } = renderGeorgiaMap();
//             const locationList = container.querySelector('.location-list');
//             expect(locationList).toBeInTheDocument();
//         });

//         it('should render first 32 location items', () => {
//             renderGeorgiaMap();
            
//             // Check that first few hospitals from finalData are rendered in the list
//             expect(screen.getByText('Northside Hospital Atlanta')).toBeInTheDocument();
//             expect(screen.getByText('Northside Hospital Forsyth')).toBeInTheDocument();
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//             expect(screen.getByText('Grady Memorial Hospital')).toBeInTheDocument();
//         });
//     });

//     describe('Edge Cases', () => {
//         it('should handle clicking on marker directly', () => {
//             renderGeorgiaMap();
//             const markers = screen.getAllByTestId('marker');
            
//             fireEvent.click(markers[0]);
            
//             expect(screen.getByTestId('popup')).toBeInTheDocument();
//         });

//         it('should maintain search state when toggling map mode', () => {
//             renderGeorgiaMap();
//             const searchInput = screen.getByPlaceholderText('Search location...');
            
//             fireEvent.change(searchInput, { target: { value: 'Emory' } });
//             fireEvent.click(screen.getByText('Hard Crop'));
            
//             expect(searchInput).toHaveValue('Emory');
//             expect(screen.getByText('Emory University Hospital')).toBeInTheDocument();
//         });
//     });
// });