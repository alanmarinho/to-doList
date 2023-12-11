import { DatePicker, Form, Input, Select, Button, message } from "antd";
import axios from "axios";
import {useEffect} from "react";
import dayjs from "dayjs";

export default function FormDisabledDemo() {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const api = "http://localhost:3000";

  const fillForm = () => {
    form.setFieldsValue({
      prioridade: 'Comum',
      status: 'Pendente',
      categoria: 'Trabalho',
    });
  };

  useEffect(() => {
    fillForm();
  }, []);

  const novaTarefa = async (values) => {
   try{
    const docRef = await axios.post(api + '/tarefas', {
      nome: values.nome,
      dataInicio: dayjs(values.datas[0].toDate()),
      dataFim: dayjs(values.datas[1].toDate()),
      descricao: values.descricao,
      prioridade: values.prioridade,
      status: values.status,
      categoria: values.categoria,
    });
    form.resetFields()
    fillForm();
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
    <div className="flex flex-col items-center justify-center gap-3">
      {contextHolder}
    <h1 className="text-white text-4xl">Nova Tarefa</h1>
    <div className="bg-slate-400 p-3 rounded ">
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
              <Select.Option value="Comum">Comum</Select.Option>
              <Select.Option value="Importante">Importante</Select.Option>
              <Select.Option value="Urgente">Urgente</Select.Option>
              <Select.Option value="Imediato">Imediato</Select.Option>
              <Select.Option value="Opcional">Opcional</Select.Option>
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
            <Button className="bg-blue-500" type="primary" htmlType="submit">Adicionar tarefa</Button>
          </Form.Item>           

        </Form>
      </div>
    </div>
  );
}
