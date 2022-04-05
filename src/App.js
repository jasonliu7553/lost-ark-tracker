import './App.css';
import Header from './components/Header'
import TrackerList from './components/TrackerList';
import ToggleReminders from './components/ToggleReminders';
import background from './img/LAback.jpg'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react';

const App = () => {

  const [showToggleReminders, setToggleReminders] = useState()
  const [schedEvents, setSchedEvents] = useState()

  useEffect(() => {

    const getSchedEvents = async () => {
      const eventsFromServer = await fetchSchedEvents()
      setSchedEvents(eventsFromServer)
    }

    getSchedEvents()
  }, [])

  //fetch scheduled events
  const fetchSchedEvents = async () => {
    const res = await fetch('http://localhost:5000/schedEvents')
    const data = await res.json()

    return data
  }

  //Open up the list of reminders
  const onAdd = () => {
    setToggleReminders(!showToggleReminders)
  }

  //update reminder in server
  const onTick = async (id) => {
    const events = await fetchSchedEvents()
    const eventToEdit = events[id - 1]
    const updatedEvent = { ...eventToEdit, reminder: !eventToEdit.reminder }

    const res = await fetch(`http://localhost:5000/schedEvents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })

    const data = await res.json()

    setSchedEvents(schedEvents.map(
      (event) => (event.id == id ? { ...event, reminder: data.reminder } : event)
    ))
  }

  return (

    <div className='App' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '75vw' }}>
      <Header onClick={onAdd} showAdd={showToggleReminders} />

      {showToggleReminders && <ToggleReminders schedEvents={schedEvents} onTick={onTick} />}

      <div className="container">
        <TrackerList schedEvents={schedEvents} />
      </div>


    </div>

  );
}

export default App;
