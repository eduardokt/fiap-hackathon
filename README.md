### Sobre o Projeto

#### Tela de Login
Criamos uma tela de login com senha e uma tela de cadastro de usuário, caso o usuário ainda não tenha uma conta. As senhas são validadas pelo Firebase, garantindo que sejam fortes e seguras.

#### Tela de ONGs (com cadastro e listagem)
Na tela de ONGs, focamos na usabilidade ao inserir campos onde apenas o usuário "Admin" pode cadastrar e editar as informações. O usuário "padrão" tem permissão apenas para visualizar a tabela com as informações das ONGs, podendo se inscrever ou se desinscrever das ONGs de sua escolha. A tabela de ONGs contém todas as informações necessárias, e caso o usuário deseje mais detalhes, ele pode clicar em "Mais Informações" para abrir um modal com a descrição da ONG e dados de contato. O usuário admin tem a opção de editar as ONGs clicando na seta ao lado esquerdo de cada linha, que abrirá os campos para edição.

Além disso, a tela de ONGs possui um campo de busca onde o usuário pode pesquisar por nome da ONG, localização e categoria (área de atuação). Implementamos também uma paginação para que o usuário possa escolher quantos itens deseja visualizar por página.

#### Tela de Perfil de Usuário
Na tela de perfil de usuário, o usuário padrão pode alterar seu nome e visualizar suas informações pessoais e as ONGs nas quais está inscrito. Se desejar se inscrever ou desinscrever de alguma ONG, pode clicar no botão "Editar", que o redirecionará para a tela de ONGs, onde ele pode realizar essa gestão. Caso o usuário tenha um perfil admin, além das permissões padrão, ele também pode alterar o tipo de perfil.

#### Usabilidade e Adaptabilidade
O projeto foi adaptado para funcionar tanto em modo desktop quanto em mobile, garantindo uma melhor usabilidade em diferentes dispositivos.

### Pontos Fortes do Projeto
O projeto se destaca pela robustez das funcionalidades oferecidas e pela ênfase na usabilidade. A implementação de permissões diferenciadas para usuários padrão e admins melhora a gestão das ONGs e oferece uma experiência de usuário mais segura e organizada. A integração com o Firebase para validação de senhas reforça a segurança, enquanto a capacidade de busca e paginação na listagem de ONGs facilita a navegação e a gestão. Além disso, a adaptação para diferentes dispositivos amplia o alcance e a acessibilidade da aplicação, tornando-a uma ferramenta versátil para o gerenciamento de ONGs.


# Relatório Técnico do Projeto de Gerenciamento de ONGs

## Requisitos
- Docker/Docker Compose

## Instruções de Instalação e Execução

1. **Baixar o projeto no GitHub**
   - [Link do Repositório](https://github.com/eduardokt/fiap-hackathon)
   https://github.com/eduardokt/fiap-hackathon

2. **Acessar a pasta do projeto pelo terminal**
   ```sh
   cd caminho/para/o/projeto
   ```

3. **Executar o Docker**
   ```sh
   docker-compose up
   ```

4. **Acessar o sistema**
   - Abra o navegador e vá para [http://localhost:89](http://localhost:89)
   - Crie um login e uma senha

5.1. **Login para Teste ADMIN**
   - **Email:** eu@admin.com
   - **Senha:** 123456
   
5.2. **Login para Teste PADRÃO**
   - **Email:** teste@test.com
   - **Senha:** 123456

6. **Acessar o projeto**
   - Utilize as credenciais acima para acessar e testar o sistema.

## Documentação das APIs

### Endpoints para Gerenciamento das ONGs

#### Autenticação
- **[POST]** Criar novo usuário: `http://localhost:3000/api/auth/new`
- **[POST]** Login de usuário: `http://localhost:3000/api/auth/login`
- **[GET]** Logout de usuário: `http://localhost:3000/api/auth/logout`

#### ONGs
- **[GET]** Listar todas as ONGs: `http://localhost:3000/api/ongs`
- **[POST]** Criar nova ONG: `http://localhost:3000/api/ongs/new`
- **[GET]** Visualizar ONG específica: `http://localhost:3000/api/ongs/:id`
- **[PUT]** Atualizar ONG: `http://localhost:3000/api/ongs/update/:id`
- **[DELETE]** Deletar ONG: `http://localhost:3000/api/ongs/delete/:id`

#### Perfis de Usuário
- **[GET]** Listar perfis: `http://localhost:3000/api/profiles`
- **[POST]** Criar novo perfil: `http://localhost:3000/api/profiles/new`
- **[PUT]** Atualizar perfil: `http://localhost:3000/api/profiles/update/:id`

#### Localização
- **[GET]** Listar locais: `http://localhost:3000/api/locations`
- **[POST]** Criar novo local: `http://localhost:3000/api/locations/new`
- **[GET]** Visualizar local específico: `http://localhost:3000/api/locations/:id`
- **[PUT]** Atualizar local: `http://localhost:3000/api/locations/update/:id`
- **[DELETE]** Deletar local: `http://localhost:3000/api/locations/delete/:id`

#### Administração
- **[GET]** Listar tarefas administrativas: `http://localhost:3000/api/admin/tasks`
- **[POST]** Criar nova tarefa administrativa: `http://localhost:3000/api/admin/tasks/new`
- **[GET]** Visualizar tarefa administrativa específica: `http://localhost:3000/api/admin/tasks/:id`
- **[PUT]** Atualizar tarefa administrativa: `http://localhost:3000/api/admin/tasks/update/:id`
- **[DELETE]** Deletar tarefa administrativa: `http://localhost:3000/api/admin/tasks/delete/:id`

## Tecnologias e Ferramentas Utilizadas

- **HTML:** Criação da estrutura básica da interface de usuário.
- **JavaScript:** Lógica de verificação e interação.
- **CSS:** Estilização da interface para uma apresentação visual atraente e responsiva.
- **Node.js:** Backend e disponibilização da API.
- **Express.js:** Framework para Node.js que simplifica o desenvolvimento de APIs REST.
- **Git:** Controle de versão para gerenciamento do código-fonte.
- **Firebase:** Banco de dados para armazenamento de informações de forma estruturada e eficiente.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário interativas e dinâmicas.
- **Material UI:** Biblioteca de componentes de interface de usuário para React, oferecendo elementos estilizados e prontos para uso.
- **Docker:** Plataforma de containers para criar, implantar e executar aplicações de forma isolada e consistente.
- **Dotenv:** Criação de variáveis de ambiente.

## Pontos Fortes do Projeto

O projeto se destaca pela robustez das funcionalidades e pela ênfase na usabilidade. A implementação de permissões diferenciadas para usuários padrão e admins melhora a gestão das ONGs e oferece uma experiência de usuário mais segura e organizada. A integração com o Firebase para validação de senhas reforça a segurança, enquanto a capacidade de busca e paginação na listagem de ONGs facilita a navegação e a gestão. Além disso, a adaptação para diferentes dispositivos amplia o alcance e a acessibilidade da aplicação, tornando-a uma ferramenta versátil para o gerenciamento de ONGs.
