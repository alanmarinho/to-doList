import Main from './components/main'

import './App.css'
import { Routes, Route } from "react-router-dom";

import Pag404 from './components/pag404';
import Nav from './components/nav';
import AddTarefe from './components/addTarefa';

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path="*" element={<Pag404/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/tarefas" element={<h1>Todas as tarefas</h1>}/>
        <Route path="/tarefas/add" element={<AddTarefe/>}/>
        <Route path="/tarefas/remove/:id" element={<h1>Remover tarefa</h1>}/>
        <Route path="/tarefas/edit/:id" element={<h1>Editar tarefa</h1>}/>
        <Route path="/sobre" element={<h1>Sobre</h1>}/>

      </Routes>
    </>
  )
}

export default App
