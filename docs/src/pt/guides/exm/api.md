---
locale: pt
---
# Token de API da Máquina de Execução

O EXM busca ser agnóstico em relação à criptomoeda e requer apenas um único token de API (também conhecido como chave) para interagir. Essa chave de API é necessária para a maioria das ações no EXM, como implantações e operações de escrita.

## Criando um Token de API

Para criar um token de API, os seguintes passos devem ser executados:

- Acesse a [página principal](https://exm.dev/).
- Escolha o método preferido de Inscrição/Entrada.

![Opções de Entrada no EXM](~@source/images/exm-sign-in-options.png)

- Após ser redirecionado para o painel, clique em "Novo Token".

![Criar Novo Token de API](~@source/images/exm-create-token.png)

- Copie o token que foi gerado e use-o com o SDK ou CLI.

## Manipulando o Token de API com segurança

O token é um identificador para a nossa conta e nos permite acessar funções associadas a ela. Portanto, é vital garantir que esse token seja mantido em segredo para evitar qualquer spam e ataque às nossas funções. A melhor maneira de fazer isso é usando variáveis de ambiente.

Existem duas maneiras de armazenar as variáveis de ambiente:

1. Através da linha de comando:

No diretório do projeto, execute o seguinte comando:

```bash
export EXM_PK=<seu_token_de_api>
```

2. Através do sdk `dotenv`:

- Execute o seguinte na linha de comando:

  ```bash
  npm install dotenv

  #OU

  yarn add dotenv
  ```
- Importe a biblioteca no arquivo usando as variáveis:

  ```jsx
  import dotenv from "dotenv";
  dotenv.config();
  ```

Então essa chave pode ser referida dentro dos arquivos como `process.env.EXM_PK` sem expô-la ou enviá-la para sistemas de controle de versão como o GitHub.