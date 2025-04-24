import { useState } from 'react';
import ParentView from './pages/ParentView';
import KidsView from './pages/KidsView';

function App() {
  const [view, setView] = useState('parent');

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setView('parent')}>Vista Padres</button>
      <button onClick={() => setView('kids')}>Vista Niños</button>
      {view === 'parent' ? <ParentView /> : <KidsView />}
    </div>
  );
}

export default App;
