import Header from './components/Header'
import Board from './components/Board'
import Footer from './components/Footer'
import { useState } from 'react'

function App() {
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleResetBoard = () => {
    localStorage.removeItem('kanban-lists');
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onResetBoard={handleResetBoard} />
      <Board key={resetTrigger} />
      <Footer />
    </div>
  );
}

export default App;