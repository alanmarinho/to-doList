import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Form, Input, Select, message, DatePicker, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from "axios";

export default function EditTarefa() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  const api = "http://localhost:3000";
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(api + '/tarefas/'+ id);
      console.log(data.data)

      const tarefaData = data.data;
      fillForm(tarefaData);
      
    };
    fetchData();
  }, [id]);

  const fillForm = (tarefaData) => {
    form.setFieldsValue({
      prioridade: tarefaData.prioridade,
      status: tarefaData.status,
      categoria: tarefaData.categoria,
      nome: tarefaData.nome,
      descricao: tarefaData.descricao,
      datas: [dayjs(tarefaData.dataInicio), dayjs(tarefaData.dataFim)],
    });
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: `Tarefa editada com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Erro ao editar tarefa!',
    });
  };

  const editarTarefa = async (values) => {
    try{
      const local = api + '/tarefas/' + id;
      await axios.put(local,{
        nome: values.nome,
        dataInicio: dayjs(values.datas[0].toDate()),
        dataFim: dayjs(values.datas[1].toDate()),
        descricao: values.descricao,
        prioridade: values.prioridade,
        status: values.status,
        categoria: values.categoria,
      })
      success();
      setTimeout(() => {

        window.location.href = "/tarefas";
      }, 700);
      
    }catch(err){
      error();
      console.log(err)
    }
  }

  const showPromiseConfirm = () => {

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
            success();
            setTimeout(() => {

              window.location.href = "/tarefas";
            }, 700);
    
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


  const mensagem = "Preencha o campo"
  return (
    <div className="flex flex-col gap-3">
    <h1 className="text-white text-4xl">Editar Tarefa</h1> 
      <div className="flex flex-col items-center justify-center">
      {contextHolder}
    <div className="bg-slate-400 p-5">
        <Form form={form} layout="horizontal" onFinish={editarTarefa} >
          <Form.Item label="Tarefa"name="nome" rules={[{required: true, message:mensagem}]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Data de início e fim"name="datas" rules={[{ required: true, message: mensagem}]}>
            <RangePicker />
          </Form.Item>

          <Form.Item label="Descrição"name="descricao" rules={[{required: true, message:mensagem}]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Prioridade" name="prioridade" >
            <Select>
              <Select.Option value="comum">Comum</Select.Option>
              <Select.Option value="importante">Importante</Select.Option>
              <Select.Option value="urgente">Urgente</Select.Option>
              <Select.Option value="imediato">Imediato</Select.Option>
              <Select.Option value="opcional">Opcional</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" >
            <Select>
              <Select.Option value="Pendente">Pendente</Select.Option>
              <Select.Option value="Em andamento">Em andamento</Select.Option>
              <Select.Option value="Concluído">Concluído</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="categoria" name="categoria" >
            <Select>
              <Select.Option value="trabalho">Trabalho</Select.Option>
              <Select.Option value="estudos">Estudos</Select.Option>
              <Select.Option value="lazer">Lazer</Select.Option>
              <Select.Option value="outros">Outros</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <button className="bg-green-500 p-2 rounded hover:bg-green-600 hover:scale-95 text-white" type="submit">Editar tarefa</button>
          </Form.Item> 
        </Form>
          <div className="flex items-center justify-start gap-3">
           <button className="bg-red-500 p-2 rounded hover:bg-red-600 hover:scale-95 text-white" onClick={() => { showPromiseConfirm()}}>Apagar tarefa</button>      
           <button className="bg-yellow-400 p-2 rounded hover:bg-yellow-600 hover:scale-95 text-white" onClick={() => { window.location.href = "/tarefas" }}>Cancelar</button>  
          </div>
      </div>
    </div>
    
  </div>
   
  );
}