import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../Pages/Footer';

const renderWithRouter = (component) => {
    return render(<BrowserRouter>
        {component}
    </BrowserRouter>)
}

describe('Footer Component', () => {
    it('renders all nav links', () => {
        renderWithRouter(<Footer/>)
        expect(screen.getByText('Get Assistance')).toBeInTheDocument();
        expect(screen.getByText('Support Us')).toBeInTheDocument();
        expect(screen.getByText('Site Map')).toBeInTheDocument();
        expect(screen.getByText('Legal/Privacy')).toBeInTheDocument();
    });

    it('correct color for "Get Assistance"', () => {
        renderWithRouter(<Footer/>)
        const getAssistanceLink = screen.getByText('Get Assistance').closest('a');
        expect(getAssistanceLink).toHaveStyle({color: 'rgb(244, 136, 16)'})
    });

    it('renders Georgia Watch description', () => {
        renderWithRouter(<Footer/>)
        expect(screen.getByText('Georgia Watch is a non-profit, nonpartisan 501(c)3 organization. © 2024 Georgia Watch. All Rights Reserved.'))
    });
})