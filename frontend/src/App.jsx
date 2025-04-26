
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/home/Home';
import ParentView from './pages/parentView/ParentView';
import KidsView from './pages/kidsView/KidsView';
import { useState } from 'react';

function App() {

  const [activeComponent, setActiveComponent] = useState("dashboard");

  const components = {
    home: <Home />,
    parent: <ParentView />,
    kids: <KidsView />
  }

  return (
    <div className="App">
      
      <div className='main'>
        <div className='header'>
        <div className="logo">
          <h1>YouKidz</h1>
        </div>
      </div>
        {components[activeComponent]}
      </div>
      <NavBar onSelect={setActiveComponent} />
    </div>
    // <div style={{ padding: 20 }}>
    //   <button onClick={() => setView('parent')}>Vista Padres</button>
    //   <button onClick={() => setView('kids')}>Vista Niños</button>
    //   {view === 'parent' ? <ParentView /> : <KidsView />}
    // </div>
  );
}

export default App;
