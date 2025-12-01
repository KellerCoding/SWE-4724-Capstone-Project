import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Homepage } from '../Pages/Homepage';

const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    )
};

describe('Homepage Component' ,() => {
    const mockSlides = [
        '/images/slide1.jpg',
        '/images/slide2.jpg',
      ];

    renderWithRouter(<Homepage/>)
    it('renders welcome text', () => {
        expect(screen.getByText('Welcome to Georgia Watch'));
        expect(screen.getByText('Protecting consumers since 2002'));
    });

    it('renders Carousel', () => {
        renderWithRouter(<Homepage/>)
        // Check if carousel container exists (React Bootstrap adds 'carousel' class)
        const carousel = document.querySelector('.carousel');
        expect(carousel).toBeInTheDocument();
        const carouselItem = document.querySelector('.carousel-item');
        expect(carouselItem).toBeInTheDocument();
    });

    it('renders all mockImages', () => {
        renderWithRouter(<Homepage/>)
        const images = screen.getAllByAltText(/Georgia Watch Images/i);
        expect(images).toHaveLength(mockSlides.length)
    });

    it('should render images with correct alt text', () => {
        renderWithRouter(<Homepage/>);
        
        const firstImage = screen.getByAltText('Georgia Watch Images 1');
        expect(firstImage).toBeInTheDocument();
      });
    
      it('should apply correct styles to images', () => {
        renderWithRouter(<Homepage/>);
        
        const image = screen.getByAltText('Georgia Watch Images 1');
        expect(image).toHaveStyle({
          marginTop: '50px',
          marginBottom: '50px',
          height: '50vw',
          objectFit: 'cover'
        });
      });

      it('should render images with correct alt text', () => {
        renderWithRouter(<Homepage/>);
        
        const firstImage = screen.getByAltText('Georgia Watch Images 2');
        expect(firstImage).toBeInTheDocument();
      });
    
      it('should apply correct styles to images', () => {
        renderWithRouter(<Homepage/>);
        
        const image = screen.getByAltText('Georgia Watch Images 2');
        expect(image).toHaveStyle({
          marginTop: '50px',
          marginBottom: '50px',
          height: '50vw',
          objectFit: 'cover'
        });
      });

      it('should have carousel controls enabled', () => {
        renderWithRouter(<Homepage />);
        
        const prevControl = document.querySelector('.carousel-control-prev');
        const nextControl = document.querySelector('.carousel-control-next');
        
        expect(prevControl).toBeInTheDocument();
        expect(nextControl).toBeInTheDocument();
      });
});