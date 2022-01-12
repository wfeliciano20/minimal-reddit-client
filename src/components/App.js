import React from 'react';
import Navbar from './Navbar';
import MainSection from './MainSection';
import Sidebar from './Sidebar';
import '../input.css';


function App() {
  return (
    <div className="grid grid-cols-1 grid-template-area-small gap-6 gap-y-6 lg:grid-cols-3 lg:grid-template-area-large">
      <Navbar />
      <MainSection />
      <Sidebar />
    </div>
  );
}

export default App;
