import React from 'react';

import Navigation from './navigation/index.js';

import config from './constants/config';

const App = () => {
    global.cfg = config;

    return (
        <Navigation />
    );
};

export default App;