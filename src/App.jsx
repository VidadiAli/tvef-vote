import './App.css'
import Form from './Form/Form'
import Vote from './Vote/Vote'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <section>
      <Routes>
        <Route path='/tvef-vote/' element={<Form />} />
        <Route path='/tvef-vote/vote' element={<Vote />} />
      </Routes>
    </section>
  )

}

export default App
