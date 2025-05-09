import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/home/Home';
import ParentView from './pages/parentView/ParentView';
import KidsView from './pages/kidsView/KidsView';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';

function App() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    setActiveComponent("kids"); 
  };

  const components = {
    home: <Home onVideoSelect={handleVideoSelect} />,
    parent: <ParentView />,
    kids: <KidsView currentVideo={currentVideo} />
  };

  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
  
    window.addEventListener('resize', setVH);
    setVH();
  
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <div className="app">
      <Header />
      <div className='main'>
        {components[activeComponent]}
      </div>
      <NavBar onSelect={setActiveComponent} />
    </div>
  );
}

export default App;
