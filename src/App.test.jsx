
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {Search} from './Pages/Search.jsx';
import {test} from 'vitest'

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOMClient.createRoot(div).render(<Search></Search>);
});