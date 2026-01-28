import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import CollectCardAddress from '@/pages/Address';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/address' element={<CollectCardAddress />} />
      </Routes>
    </Router>
  );
}
