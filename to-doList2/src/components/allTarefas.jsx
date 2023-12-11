import { useEffect, useState} from 'react';
import { Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

export default function AllTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const api = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(api + '/tarefas');
      setTarefas(JSON.parse(JSON.stringify(data.data)));
    };
    fetchData();
  }, []);

  const success = () => {
    messageApi.open({
      type: 'success',
      content: `Tarefa excluída com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Erro ao excluir tarefa!',
    });
  };

  const showPromiseConfirm = (id) => {

    Modal.confirm({
      title: 'Tem certeza?',
      icon: <ExclamationCircleOutlined />,
      content: 'Você tem certeza que quer deletar este item?',
      okButtonProps: {danger: true},
      onOk() {
        const handleDelete = async () => {
          try{
            console.log(id)
            await axios.delete(api + `/tarefas/${id}`);
            const data = await axios.get(api + '/tarefas');
            setTarefas(JSON.parse(JSON.stringify(data.data)));
            success();
    
          }catch(err){
            error();
            console.log(err)
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  }


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
        return dayjs(dataInicio).format('HH:mm DD/MM/YYYY');
      },
    },
    {
      title: 'Data de Fim',
      dataIndex: 'dataFim',
      key: 'finalDate',
      render: (dataFim) => {
        return dayjs(dataFim).format('HH:mm DD/MM/YYYY');
      },
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
          <a className='bg-red-500 p-2 rounded hover:bg-red-400 hover:text-black' onClick={() => showPromiseConfirm(record.id)}>Apagar</a>
          <a className='bg-green-500 p-2 rounded hover:bg-green-400 hover:text-black' href={`/tarefas/edit/${record.id}`}>Editar</a>
        </span>
      ),
    },
  ]

  return (
    <div className='flex flex-col gap-3'>
      {contextHolder}
      <h1 className='text-4xl'>Todas as tarefas</h1>
      <Table locale={{emptyText:"Você não tem tarefas registradas"}} style={{textAlign: 'center' }} dataSource={tarefas} columns={tableColumns} />
    </div>
  );
}