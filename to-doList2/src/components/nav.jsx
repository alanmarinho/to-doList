export default function Nav() {
  return(
    <>
      <nav className="flex items-center ml-3 gap-5">
        <div>
          <a href="/"><img className="h-10" src="/list.png"></img></a>
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