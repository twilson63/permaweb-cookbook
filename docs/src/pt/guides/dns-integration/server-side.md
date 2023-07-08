---
locale: pt
---
# Integração DNS do lado do servidor

Então você possui um aplicativo permaweb e ele está no permaweb, mas você também possui um domínio específico que deseja que os usuários usem para acessar esse aplicativo. mydomain.com, para conectar seu domínio a um aplicativo permaweb, você tem várias opções, esta opção que mostraremos aqui é chamada de redirecionamento do lado do servidor. O redirecionamento ocorre como um proxy reverso para que o usuário permaneça em mydomain.com em seu navegador, enquanto nos bastidores o aplicativo está sendo fornecido pelo permaweb.

::: Dica
Você pode usar qualquer proxy reverso para configurar um redirecionamento do lado do servidor, neste guia usaremos o deno e o deno.com, um serviço de hospedagem edge leve.
:::

## O que você precisará para configurar um proxy reverso usando deno.com

* Uma conta deno.com, que no momento da redação é gratuita.
* Um domínio com acesso às configurações do DNS.
* Um identificador de aplicativo permaweb implantado no permaweb.

## Crie um proxy no Deno.com

O Deno Deploy é um sistema distribuído que é executado na borda, com 35 regiões em todo o mundo. Abra seu navegador para [https://deno.com](https://deno.com) e clique em entrar ou cadastrar-se se você não tiver uma conta.

Clique em `Novo projeto` e clique em `Executar`.

O playground deno nos permitirá criar um proxy sem sair do navegador.

Copie o seguinte código:

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "SEU IDENTIFICADOR DO ARWEAVE"

const fileService = `https://arweave.net/${APP_ID}`;

// lidar com as solicitações
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy para arweave.net
  return await fetch(fileService + path).then(res => {
    const headers = new Headers(res.headers)
    // instruir o servidor a aproveitar o cache da borda
    headers.set('cache-control', 's-max-age=600, stale-while-revalidate=6000')

    // retornar resposta de arweave.net
    return new Response(res.body, {
      status: res.status,
      headers
    })
  });
}

// ouvir solicitações
serve(reqHandler, { port: 8100 });
```

Este servidor proxy receberá solicitações de mydomain.com e encaminhará a solicitação para arweave.net/APP_ID e, em seguida, retornará a resposta como mydomain.com. Seu APP_ID é o identificador TX_ID para o seu aplicativo permaweb.

Clique em `Salvar e implantar`.

## Conectando-se ao DNS

Nas configurações do projeto, vá para a seção de domínios e clique para adicionar um domínio.

Digite o domínio `mydomain.com` e siga as instruções para modificar as configurações do DNS para apontar para a rede edge do deno deploy.

Pode levar alguns minutos para resolver para o dns, mas uma vez resolvido, seu aplicativo agora será renderizado a partir de mydomain.com.

:tada: Parabéns, você publicou um redirecionamento do lado do servidor para o seu aplicativo permaweb.

::: Atenção
Observe que qualquer alteração em seu aplicativo gerará um novo TX_ID e você precisará modificar esse TX_ID para publicar as novas alterações em seu domínio.
:::

## Automatizando a Implantação

Se você deseja automatizar novas implantações do seu aplicativo permaweb, pesquise sobre actions do GitHub e o uso da ação do GitHub do deno deploy: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)


## Resumo

Redirecionamentos do lado do servidor são ótimos para fornecer aos seus usuários uma URL do Sistema de Nomes de Domínio para acessar seu aplicativo permaweb. Esperamos que você tenha achado este guia útil em sua jornada de desenvolvimento permaweb!