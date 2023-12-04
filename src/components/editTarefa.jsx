import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {db} from "../services/fireBaseConnection";
import { getDoc, doc, Timestamp, updateDoc, deleteDoc} from 'firebase/firestore';
import { Form, Input, Select, Button, message, DatePicker, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function EditTarefa() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();

  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "tarefas", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const tarefaData = docSnap.data();
        fillForm(tarefaData);
      } else {
        console.log("No such document!");
      }
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
      datas: [dayjs(tarefaData.dataInicio.toDate()), dayjs(tarefaData.dataFim.toDate())],
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
      const docRef = doc(db, "tarefas", id);
      await updateDoc(docRef,{
        nome: values.nome,
        dataInicio: Timestamp.fromDate(values.datas[0].toDate()),
        dataFim: Timestamp.fromDate(values.datas[1].toDate()),
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
      onOk() {
        const handleDelete = async () => {
          try{
            await deleteDoc(doc(db, "tarefas", id));
            success();
            setTimeout(() => {
              window.location.href = "/tarefas";
            }, 700);
    
          }catch(error){
            console.log(error)
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  }


  const mensagem = "Preencha o campo"
  return (
    <div>
    <h1 className="text-white text-4xl">Editar Tarefa</h1> 
      <div className="flex flex-col items-center justify-center">
      {contextHolder}
    <div className="bg-slate-400 p-5  m-5">
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

          <Form.Item>
            <Button className="bg-green-500" type="primary" htmlType="submit">Editar tarefa</Button>
          </Form.Item> 
        </Form>
        <Button className="bg-yellow-300" onClick={() => { window.location.href = "/tarefas" }}>Cancelar</Button>  
        <Button className="bg-red-500" onClick={() => { showPromiseConfirm()}}>Apagar tarefa</Button>      
      </div>
    </div>
    
  </div>
   
  );
}