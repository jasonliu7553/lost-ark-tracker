import './App.css';
import Header from './components/Header'
import TrackerList from './components/TrackerList';
import ToggleReminders from './components/ToggleReminders';
import { useState } from 'react';

const App = () => {

  const [showToggleReminders, setToggleReminders] = useState(false)

  //What happens when you press the first button
  const onAdd = () => {
    setToggleReminders(!showToggleReminders)
  }

  return (
    <div className='App' >
      <Header onClick={onAdd} showAdd={showToggleReminders} />
      {showToggleReminders && <ToggleReminders />}
      <div className="container">
        <TrackerList />
      </div>

    </div>
  );
}

export default App;
