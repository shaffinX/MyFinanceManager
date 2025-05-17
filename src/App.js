// App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesApp from './RoutesApp';
import './App.css';
import { SBE } from './SBE';
import React from 'react';
function App() {
  const [sbe, setSBE] = React.useState({
    tb:5000,
    te:3400,
    s:1600
  })

  return (
    <SBE.Provider value={{ sbe, setSBE }}>
      <Router>
        <RoutesApp />
      </Router>
    </SBE.Provider>
  );
}

export default App;