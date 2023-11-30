export default function Nav() {
  return(
    <>
      <nav className="flex items-center ml-3 gap-5">
        <div>
          <a href="/">Task Manager</a>
        </div>
        <ul className="flex gap-3">
          <li><a href="/">Home</a></li>
          <li><a href="/tarefas/add">Nova Tarefa</a></li>
          <li><a href="/tarefas">Tarefas</a></li>
        </ul>
      </nav>
    </>
  )
}