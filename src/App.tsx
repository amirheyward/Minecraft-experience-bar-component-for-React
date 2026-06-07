import './App.css'
import EXPBar from './components/expbar.tsx'

function App() {

  return (
    <div className='mainContainer'>
      <EXPBar level={3} percent={0.6}/>
    </div>
  )
}

export default App
