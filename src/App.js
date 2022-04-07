import './App.css';
import Header from './components/Header'
import TrackerList from './components/TrackerList';
import ToggleReminders from './components/ToggleReminders';
import PopUp from './components/PopUp';
import background from './img/LAback.jpg'
import { useEffect, useState } from 'react';

const App = () => {

  const [showToggleReminders, setToggleReminders] = useState()
  const [schedEvents, setSchedEvents] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [popUpID, setPopUpID] = useState('NaN')

  const [popUpIDQueue, setPopUpIDQueue] = useState([])


  useEffect(() => {

    const getSchedEvents = async () => {
      const eventsFromServer = await fetchSchedEvents()
      setSchedEvents(eventsFromServer)
    }
    getSchedEvents()

  }, [])

  const pushID = (id) => {
    popUpIDQueue.push(id)
    if (!isOpen)
      updateQueue()
  }

  const updateQueue = () => {
    if (popUpIDQueue.length > 0 && !isOpen) {
      togglePopUp(popUpIDQueue.shift())
    }
  }


  // Show/Hide the PopUp
  const togglePopUp = (id) => {
    setIsOpen(!isOpen)
    setPopUpID(id)
  }

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
    const updatedEvent = { ...eventToEdit, reminder: !eventToEdit.reminder, visited: false }

    const res = await fetch(`http://localhost:5000/schedEvents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })

    const data = await res.json()

    setSchedEvents(schedEvents.map(
      (event) => (event.id == id ? { ...event, reminder: data.reminder, visited: false } : event)
    ))
  }

  //clears the visit on a events 
  const clearVisit = async (id) => {

    const events = await fetchSchedEvents()
    const eventToEdit = events[id - 1]
    const updatedEvent = { ...eventToEdit, visited: false }

    const res = await fetch(`http://localhost:5000/schedEvents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })

    setSchedEvents(schedEvents.map(
      (event) => (event.id == id ? { ...event, visited: false } : event)
    ))
  }

  //Clears all the visits
  const clearAllVisits = async () => {

    setSchedEvents(schedEvents.map(
      (event) => ({ ...event, visited: false })
    ))

    await fetch(`http://localhost:5000/schedEvents`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(schedEvents)
    })

  }

  //User confirms they visited the event
  const onVisit = async (id) => {
    const events = await fetchSchedEvents()
    const eventToEdit = events[id - 1]
    const updatedEvent = { ...eventToEdit, visited: true }

    const res = await fetch(`http://localhost:5000/schedEvents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedEvent)
    })

    const data = await res.json()

    setSchedEvents(schedEvents.map(
      (event) => (event.id == id ? { ...event, visited: true } : event)
    ))

    togglePopUp(id)
  }

  return (

    <div className='App' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', height: '75vw' }}>

      <Header onClick={onAdd} showAdd={showToggleReminders} updateQueue={updateQueue} />

      {showToggleReminders && <ToggleReminders schedEvents={schedEvents} onTick={onTick} clearVisit={clearAllVisits} />}

      <div className="container">
        <TrackerList schedEvents={schedEvents} onVisit={pushID} updateQueue={updateQueue} />
      </div>

      {/*Pop up*/}
      {isOpen && <PopUp handleClose={togglePopUp} eventID={popUpID} yes={() => onVisit(popUpID)} events={schedEvents} />}


    </div>

  );
}

export default App;
