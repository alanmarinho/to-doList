import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState} from 'react';
import {db} from "../services/fireBaseConnection";
import { Table } from 'antd';
import dayjs from 'dayjs';

export default function AllTarefas() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "tarefas"));
      setTarefas(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  console.log(tarefas)

  const tableColumns = [
    {
      title: 'Tarefa',
      dataIndex: 'nome',
      key: 'tarefa',
    },
    {
      title: 'Data de Início',
      dataIndex: 'dataInicio',
      key: 'intialDate',
      render: (dataInicio) => {
        return dayjs(dataInicio.toDate()).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Data de Fim',
      dataIndex: 'dataFim',
      key: 'finalDate',
      render: (dataInicio) => {
        return dayjs(dataInicio.toDate()).format('DD/MM/YYYY')
      }
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'description',
    },
    {
      title: 'Prioridade',
      dataIndex: 'prioridade',
      key: 'priority',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'category',
    },
    {
      title: 'Operação',
      dataIndex: 'code',
      key: 'operacao',
      render: (_, record) => (
        <span className='flex gap-3 items-center justify-center'>
          <a className='bg-red-500 p-2 rounded hover:bg-red-400 hover:text-black' >Apagar</a>
          <a className='bg-green-500 p-2 rounded hover:bg-green-400 hover:text-black' href={`/tarefas/edit/${record.id}`}>Editar</a>
          <a className='bg-blue-500 p-2 rounded hover:bg-blue-400 hover:text-black'>Ver</a>
        </span>
      ),
    },
  ]

  return (
    <div>
      <h1>Todas as tarefas</h1>
      <Table style={{textAlign: 'center' }} dataSource={tarefas} columns={tableColumns} />
    </div>
  );
}