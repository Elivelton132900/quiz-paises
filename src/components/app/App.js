import Perguntas from '../perguntas/Perguntas';
import './app.css'
import '../../responsive.css'

function App() {


  return (
    <div>
      <h1>Country Quiz</h1>
      <div className="app">
        <div className='vetor'></div>
        <Perguntas />
      </div>
      <div className='creditosContainer'>
        <h2 className='creditos'>Criado por <span>Elivelton</span> - <a href='https://devchallenges.io/' target='blank' className='link'>devchallenges.io</a></h2>
      </div>

    </div>

  );
}

export default App;
