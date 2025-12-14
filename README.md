# Trabalho final programação 2 — Relatório Técnico
- **Projeto:** Mixolydian — Sistema de Gerenciamento de Músicas e Playlists  
- **Disciplina:** Programação II  
- **Aluno:** Luiz Scarsi e Otávio Rebelatto 
- **Instituição:** UFFS  
- **Ano/Semestre:** 2025-2  


## Descrição Geral do Projeto

O projeto **Mixolydian** consiste em uma aplicação web full stack para gerenciamento de usuários, músicas, playlists e avaliações (ratings).  
O sistema possui **autenticação**, **controle de permissões**, **relacionamentos complexos entre entidades** e um **dashboard analítico exclusivo para administradores**.

A aplicação foi desenvolvida utilizando **Node.js + Express + Sequelize** no backend e **React + TypeScript** no frontend, com banco de dados **PostgreSQL**.

## Arquitetura da Aplicação

A aplicação foi dividida em duas camadas principais:

### Backend
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT para autenticação
- Arquitetura em camadas:
  - **Models**
  - **Repositories**
  - **Services**
  - **Controllers**

### Frontend
- React
- TypeScript
- Axios
- Context API para autenticação
- Componentização reutilizável
- Controle de rotas por estado (sem react-router)

## Modelagem do Banco de Dados

O banco de dados foi modelado com foco em **normalização** e **relacionamentos N:N**, utilizando tabelas de associação.

### Principais tabelas:

- **users**
- **musics**
- **playlists**
- **ratings**
- **user_playlist** (relação usuário ↔ playlist)
- **playlist_music** (relação playlist ↔ música)

### Destaques da modelagem:

- Uma playlist pode conter várias músicas (N:N)
- Um usuário pode ter várias playlists (N:N)
- Cada avaliação (`rating`) pertence a **um usuário e uma playlist**
- Restrição `UNIQUE (id_user, id_playlist)` para evitar avaliações duplicadas

## Autenticação e Autorização

A autenticação foi implementada com **JWT (JSON Web Token)**.

### Fluxo:
1. Usuário faz login
2. Backend retorna token JWT
3. Token é armazenado no `localStorage`
4. Frontend decodifica o token para obter:
   - `id`
   - `name`
   - `role` (admin ou user)

Essas informações são gerenciadas globalmente via **AuthContext**.

---

## Controle de Permissões

Foram implementadas regras claras de permissão:

### Usuário comum (`user`)
- Pode visualizar músicas e playlists
- Pode **editar e excluir apenas suas próprias playlists**
- Pode avaliar playlists
- **Não pode acessar o dashboard**
- **Não pode excluir a própria conta**

### Administrador (`admin`)
- Pode gerenciar usuários, músicas e playlists
- Pode editar e excluir qualquer playlist
- Pode acessar o **Dashboard**
- Não pode excluir a própria conta (regra de segurança)

Essas regras são aplicadas:
- **No frontend** (UI/UX)
- **No backend** (validação real)

---

## Sistema de Avaliações (Ratings)

O sistema de avaliações permite:
- Avaliar playlists de 1 a 5 estrelas
- Cada usuário pode avaliar uma playlist apenas uma vez
- Cálculo da média de avaliações por playlist
- Exibição dinâmica das avaliações

A média e os ratings são carregados sempre que o usuário acessa a tela de playlists.

---

## Dashboard Administrativo

O dashboard é acessível **exclusivamente para administradores** e apresenta:

- Quantidade total de:
  - Usuários
  - Músicas
  - Playlists
  - Avaliações
- Atualização dinâmica dos dados via API
- Visão geral do sistema para tomada de decisões

---

## Decisões de Implementação

### Uso de tabelas de associação
Optou-se por tabelas intermediárias (`user_playlist`, `playlist_music`) para manter flexibilidade e boa normalização.

### Context API para autenticação
Facilitou o compartilhamento de dados do usuário logado entre componentes sem prop drilling.

### Controle de permissões no frontend e backend
Evita problemas de segurança e melhora a experiência do usuário.

### Mapeamento manual antes de enviar dados ao frontend
Os dados retornados pelo Sequelize são transformados em objetos simples, evitando acoplamento excessivo ao ORM.

---

## Dificuldades Encontradas

- Gerenciamento correto de **aliases do Sequelize** (`as`)
- Sincronização entre estado do frontend e dados do backend
- Garantir que playlists sempre tenham dono
- Evitar que administradores removam a própria conta

---

## Facilidades

- Sequelize facilitou a manipulação de relacionamentos complexos
- React permitiu componentização clara e reutilizável
- JWT simplificou o controle de autenticação
- Uso de seed facilitou testes e desenvolvimento

---

## Conclusão

O projeto foi ótimo para reforçar os aprendizados em aula, revisar conteúdos e colocar tudo em prática. Atendeu a todos os requisitos propostos, incluindo autenticação, controle de permissões, CRUD completo, sistema de avaliações e dashboard administrativo.

Durante o desenvolvimento foi possível aplicar conceitos importantes de:
- Modelagem de dados
- Segurança
- Arquitetura de software
- Programação full stack


## Link do Repositório

Backend:
- https://github.com/LuizScarsi/mixolydian
Frontend:
- https://github.com/LuizScarsi/mixolydian-frontend

## Como rodar:
- Backend:
    - `docker compose up`
    - `nodemon server.js`
- Frontend:
    - `npm run dev`