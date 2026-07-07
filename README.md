# Arquitetura

Este projeto foi desenvolvido utilizando **Arquitetura Hexagonal (Ports and Adapters)**.

O principal objetivo dessa arquitetura é manter as regras de negócio independentes de tecnologias externas, como Express, Evolution API ou qualquer outro serviço. Dessa forma, o núcleo da aplicação pode ser testado e evoluído sem depender da infraestrutura.

## Estrutura do projeto

```text
src
├── application
│   └── use-cases
├── domain
│   ├── entities
│   └── ports
├── infrastructure
│   ├── evolution
│   └── http
├── tests
├── app.ts
└── server.ts
```

---

## Domain

A camada **Domain** representa o núcleo da aplicação.

Ela contém apenas conceitos de negócio e contratos necessários para que os casos de uso possam executar suas responsabilidades.

```text
domain
├── entities
│   └── IncomingMessage.ts
└── ports
    ├── MessageMapper.ts
    └── MessageSender.ts
```

### Entities

Representam os objetos do domínio.

Exemplo:

- `IncomingMessage`

A entidade não conhece Express, Evolution API ou qualquer outra tecnologia.

### Ports

As portas (interfaces) definem o que a aplicação precisa, sem definir como isso será implementado.

Exemplo:

- `MessageSender`
- `MessageMapper`

Essas interfaces permitem que diferentes implementações sejam utilizadas sem alterar os casos de uso.

---

## Application

A camada **Application** contém os casos de uso da aplicação.

```text
application
└── use-cases
    └── ReceiveMessageUseCase.ts
```

Os casos de uso implementam o fluxo da aplicação e dependem apenas das abstrações definidas em `domain/ports`.

Eles não conhecem:

- Express
- Evolution API
- HTTP
- Axios

Seu único objetivo é executar as regras da aplicação.

---

## Infrastructure

A infraestrutura contém todas as implementações concretas dos contratos definidos pelo domínio.

### Evolution

```text
evolution
├── EvolutionMessageSender.ts
├── EvolutionWebhookMapper.ts
├── factories
│   └── makeWebHookEvolution.ts
└── types
```

#### EvolutionMessageSender

Implementa o contrato `MessageSender` e realiza o envio de mensagens utilizando a Evolution API.

#### EvolutionWebhookMapper

Converte o payload recebido da Evolution API em uma entidade do domínio (`IncomingMessage`).

Dessa forma, o restante da aplicação nunca precisa conhecer o formato específico enviado pela Evolution.

#### Factories

As factories são responsáveis por montar as dependências necessárias para cada integração.

Exemplo:

```text
makeWebHookEvolution()
```

Ela cria:

- EvolutionWebhookMapper
- EvolutionMessageSender
- ReceiveMessageUseCase
- WebHookController

Caso outra integração seja adicionada futuramente (por exemplo, Twilio), basta criar uma nova factory:

```text
makeWebHookTwilio()
```

sem alterar os casos de uso.

---

### HTTP

```text
http
├── controllers
└── routes
```

#### Controllers

Recebem as requisições HTTP.

São responsáveis por:

- receber a requisição;
- utilizar o mapper para transformar os dados externos em entidades do domínio;
- chamar o caso de uso;
- devolver a resposta HTTP.

Nenhuma regra de negócio deve ficar no controller.

#### Routes

Apenas registram as rotas do Express e encaminham a requisição para o controller correspondente.

---

## Fluxo da aplicação

```text
HTTP Request
      │
      ▼
Routes
      │
      ▼
Controller
      │
      ▼
Mapper
      │
      ▼
Entity
      │
      ▼
Use Case
      │
      ▼
MessageSender (Port)
      │
      ▼
EvolutionMessageSender
      │
      ▼
Evolution API
```

---

## Testes

```text
tests
├── application
└── fakes
```

Os testes utilizam implementações falsas (**Fakes**) das portas definidas no domínio.

Exemplo:

```text
FakeMessageSender
```

Como os casos de uso dependem apenas de interfaces, eles podem ser testados sem:

- iniciar o servidor;
- realizar chamadas HTTP;
- utilizar a Evolution API.

Isso torna os testes rápidos, isolados e independentes da infraestrutura.

---

## Benefícios da arquitetura

- Separação clara de responsabilidades.
- Baixo acoplamento entre regras de negócio e infraestrutura.
- Facilidade para testar os casos de uso.
- Facilidade para substituir integrações externas.
- Código mais modular e de fácil manutenção.
