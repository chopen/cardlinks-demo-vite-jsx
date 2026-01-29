import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import CollectCardAddress from '@/pages/Address';
import CollectCardLinkOptions from '@/pages/Options';
import GenerateCardLink from '@/pages/Generate';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/address' element={<CollectCardAddress />} />
        <Route exact path='/options' element={<CollectCardLinkOptions />} />
        <Route exact path='/generate' element={<GenerateCardLink />} />
      </Routes>
    </Router>
  );
}
