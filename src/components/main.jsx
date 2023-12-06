
import { Button } from 'antd';
export default function Main() {
  return(
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl'>Home</h1>
      <div className='flex gap-3 m-5'>
        <Button type="primary" href='/tarefas/add' className='bg-green-400'>Nova tarefa</Button>
        <Button type="primary" href='/tarefas' className='bg-blue-400'>Ver tarefas</Button>
      </div>
    </div>
  )
}