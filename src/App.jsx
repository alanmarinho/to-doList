import Main from './components/main'

import './App.css'
import { Routes, Route } from "react-router-dom";

import Pag404 from './components/pag404';
import Nav from './components/nav';
import AddTarefe from './components/addTarefa';
import EditTarefa from './components/editTarefa';
import AllTarefas from './components/allTarefas';

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path="*" element={<Pag404/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/tarefas" element={<AllTarefas/>}/>
        <Route path="/tarefas/add" element={<AddTarefe/>}/>
        <Route path="/tarefas/remove/:id" element={<h1>Remover tarefa</h1>}/>
        <Route path="/tarefas/edit/:id" element={<EditTarefa/>}/>
        <Route path="/sobre" element={<h1>Sobre</h1>}/>

      </Routes>
    </>
  )
}

export default App
