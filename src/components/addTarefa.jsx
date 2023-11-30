import { DatePicker, Form, Input, Select, Button, message } from "antd";
import {useEffect} from "react";
import {db} from "../services/fireBaseConnection";
import { addDoc, collection, Timestamp} from "firebase/firestore";

export default function FormDisabledDemo() {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue({
      prioridade: 'comum',
      status: 'pendente',
      categoria: 'trabalho',
    });
  }, [form]);

  const novaTarefa = async (values) => {
   try{
    const docRef = await addDoc(collection(db, "tarefas"), {
      nome: values.nome,
      dataInicio: Timestamp.fromDate(values.datas[0].toDate()),
      dataFim: Timestamp.fromDate(values.datas[1].toDate()),
      descricao: values.descricao,
      prioridade: values.prioridade,
      status: values.status,
      categoria: values.categoria,
    });
    form.resetFields()
    success(docRef);
   }catch(err){
    error();
    console.log(err)
   }
  }

  const success = () => {
    messageApi.open({
      type: 'success',
      content: `Tarefa adicionada com sucesso!`,
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Erro ao adicionar tarefa!',
    });
  };

  const mensagem = "Preencha o campo"
  return (
    <div className="flex flex-col items-center justify-center">
      {contextHolder}
    <h1 className="text-white text-4xl">Nova Tarefa</h1>
    <div className="bg-slate-400 p-5  m-5">
        <Form form={form} layout="horizontal" onFinish={novaTarefa} >
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
              <Select.Option value="pendente">Pendente</Select.Option>
              <Select.Option value="andamento">Em andamento</Select.Option>
              <Select.Option value="concluido">Concluído</Select.Option>
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
            <Button type="primary" htmlType="submit">Adicionar tarefa</Button>
          </Form.Item>           

        </Form>
      </div>
    </div>
  );
}
