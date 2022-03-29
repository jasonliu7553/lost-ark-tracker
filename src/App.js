import './App.css';
import Header from './components/Header'
import Picklist from './components/Picklist';

function App() {
  return (
    <div className='App' >
      <Header />
      <div className="container">
        <Picklist />
      </div>

    </div>
  );
}

export default App;
