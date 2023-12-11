# To Do List

# clonar projeto
```bash
git clone https://github.com/alanmarinho/to-doList.git

```

## Executar projeto com firebase
```bash
cd to-doList/to-doList1
npm install
npm run dev
```

## Executar projeto com json-server
```bash
cd to-doList/to-doList2
npm install
npm run dev
```

## Configuração do banco firebase
É necessário criar um banco no Firebase - Siga as instruções do vídeo do professor.
Editar o nome do arquino "configFireBase copy.js" para "configFireBase.js"
Adicionar as configurações do seu banco no arquivo "configFireBase.js"

## Configuração do banco json-server
Não precisa de configuração, apenas executar o comando "npm run dev" na pasta "to-doList2" mas se quiser verificar o banco de dados, o arquivo "db.json" está na pasta src/services do "to-doList2" acessível executando:

```bash
npx json-server --watch db.json
```
