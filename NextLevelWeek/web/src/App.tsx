import React, { useState } from 'react';
import './App.css';
import Header from './Header';


function App() {

  // É feito dessa forma para poder atualizar o valor na tela
  const [counter, setCounter] = useState(0);

  function handleButtonClick() {
    //incrementa o counter
    setCounter(counter + 1);

  }

  return (
    <div>
      <Header title={`Contador = ${counter}`} />
      <h2>{counter}</h2>
      <h1>Conteúdo da Aplicação</h1>
      <button type="button" onClick={handleButtonClick}>Incrementa</button>
    </div>
  )
}

export default App;
