import './App.css';
import Header from './components/Header'
import TrackerList from './components/TrackerList';
import ToggleReminders from './components/ToggleReminders';
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

  //What happens when you press the first button
  const onAdd = () => {
    setToggleReminders(!showToggleReminders)
  }

  //When user ticks the checkbox
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
    <div className='App' >
      <Header onClick={onAdd} showAdd={showToggleReminders} />
      {showToggleReminders && <ToggleReminders schedEvents={schedEvents} onTick={onTick} />}
      <div className="container">
        <TrackerList />
      </div>

    </div>
  );
}

export default App;
