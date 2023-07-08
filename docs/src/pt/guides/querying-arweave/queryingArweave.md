---
locale: pt
---
# Consultando o Arweave com GraphQL
O Arweave oferece uma maneira simples de consultar transações e filtrá-las por [tags](../concepts/tags.md). Os serviços de indexação compatíveis com o GraphQL do Arweave fornecem endpoints para os usuários enviarem consultas em GraphQL e também fornecem um playground para testar as consultas.

[GraphQL](https://graphql.org) é uma linguagem de consulta flexível que os serviços podem usar para construir um esquema de dados personalizado para que os clientes consultem. O GraphQL também permite que os clientes especifiquem quais elementos dos dados disponíveis eles gostariam de ver nos resultados.

## Serviços de Indexação Públicos

- [arweave.net graphql](https://arweave.net/graphql) - o endpoint graphql original, gerenciado por [ar.io](https://ar.io)
- [goldsky search service](https://arweave-search.goldsky.com/graphql) - um serviço público especialmente otimizado para busca usando uma superset da sintaxe GraphQL, gerenciado por [goldsky](https://goldsky.com)
- [ar.io decentralized indexing](https://ar-io.dev/graphql) - Uma rede descentralizada para serviços de indexação. Atualmente em teste com transações de L1 disponíveis.

## Executando uma consulta GraphQL
Para consultar o Arweave, precisaremos acessá-lo por meio de um serviço de indexação que suporte o GraphQL. Use um dos playgrounds do GraphQL listados acima para começar!

Copie e cole a seguinte consulta
```graphql:no-line-numbers
consulta {
  transações(tags: [{
    nome: "Nome-do-App",
    valores: ["PublicSquare"]
  }]) 
  {
    arestas {
      nó {
        id
        tags {
          nome
          valor
        }
      }
    }
  }
}
```

Se você não está familiarizado com o GraphQL, pode parecer um pouco avassalador no começo, mas assim que você entender a estrutura, será bastante fácil ler e entender.

```text:no-line-numbers
consulta { <tipo de esquema> ( <critérios de filtro> ) { <estrutura de dados dos resultados> } }
```
No exemplo de consulta que colamos, nosso `<tipo de esquema>` é `transações`, mas também poderíamos consultar `blocos`. Uma descrição completa do esquema GraphQL do Arweave está disponível no [Guia do GraphQL do Arweave](https://gql-guide.arweave.dev). O guia se refere aos `critérios de filtro` como "Estruturas de Consulta" e à definição completa da estrutura de dados de `transações` e `blocos` como "Estruturas de Dados".

Quando se trata da `<estrutura de dados dos resultados>`, vale ressaltar que você pode especificar um subconjunto da estrutura de dados completa em que você está interessado. Por exemplo, a estrutura de dados completa para um esquema de transações é [listada aqui](https://gql-guide.arweave.dev/#full-data).

Em nosso caso, estamos interessados no `id` e na lista completa de `tags` de qualquer transação que corresponda aos nossos critérios de filtro.

Clique no grande botão "Play" no centro do playground para executar a consulta.

![imagem](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

Você perceberá que recebe uma lista de transações na estrutura de dados de resultados que especificamos em nossa consulta original.

Se você é novo em blockchains, isso é inesperado, pois não construímos nada, por que esses resultados existem? Acontece que a tag `"Nome-do-App": "PublicSquare"` que filtramos está em uso há algum tempo.

Sam Williams, fundador do protocolo Arweave, propôs o formato de transação alguns anos atrás em um [trecho de código do GitHub](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2). Desde então, os desenvolvedores do ecossistema têm construído em cima dele, experimentando, enviando transações com essas tags.

Voltando à consulta do Arweave. Você notará nos resultados do GraphQL que não há mensagens legíveis, apenas tags e informações sobre as postagens.

Isso ocorre porque o serviço de indexação do GraphQL se preocupa em indexar e recuperar dados do cabeçalho de transações e blocos, mas não com os dados associados.

Para obter os dados de uma transação, precisamos procurá-la usando outro endpoint HTTP.
```text:no-line-numbers
https://arweave.net/<id da transação>
```

Copie e cole um dos ids nos resultados da sua consulta e modifique o link acima, adicionando o `id`. Ele deve ficar algo parecido com isso...

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

O resultado de navegar para essa URL no navegador (HTTP GET) será recuperar o conteúdo da postagem (armazenado nos dados das transações). Neste exemplo, é…
```text:no-line-numbers
Woah, isso é muito legal 😎
```
(Para obter uma lista completa dos endpoints HTTP do Arweave, visite a documentação da [API HTTP](https://docs.arweave.org/developers/server/http-api).)

## Enviando uma Consulta a Partir do JavaScript
Enviar uma consulta GraphQL do JavaScript não é muito diferente de enviá-la no playground.

Primeiro, instale o pacote `arweave-js` para ter acesso fácil a um endpoint GraphQL.
```console:no-line-numbers
npm install --save arweave
```

Em seguida, insira uma versão um pouco mais avançada da consulta de exemplo acima e `await` os resultados de enviá-la.

```js:no-line-numbers
import Arweave from 'arweave';

// inicialize uma instância do Arweave
const arweave = Arweave.init({});

// crie uma consulta que seleciona os dados das transações das 100 primeiras transações com tags específicas
const objetoConsulta = {
	consulta:
	`{
		transações(
			primeiro:100,
			tags: [
				{
					nome: "Nome-do-App",
					valores: ["PublicSquare"]
				},
				{
					nome: "Tipo-de-Conteúdo",
					valores: ["texto simples"]
				}
			]
		) 
		{
			arestas {
				nó {
					id
					tags {
						nome
						valor
					}
				}
			}
		}
	}`
};
const resultados = await arweave.api.post('/graphql', objetoConsulta);
```

## Múltiplas Consultas
É possível enviar várias consultas em uma única ida e volta para o endpoint GraphQL. Este exemplo consulta a transação de `nome` (cada uma como uma consulta separada) para dois endereços de carteira usando o protocolo `arweave-id`, agora obsoleto (substituído por `ar-profile`), mas ainda permanente.
```graphql:no-line-numbers
consulta {
	conta1: transações(primeiro: 1, proprietários:["89tR0-C1m3_sCWCoVCChg4gFYKdiH5_ZDyZpdJ2DDRw"],
		tags: [
			{
				nome: "Nome-do-App",
				valores: ["arweave-id"]
			},
			{
				nome: "Tipo",
				valores: ["nome"]
			}
		]
	) {
		arestas {
			nó {
				id
					proprietário {
					endereço
				}
			}
		}
	}
	conta2: transações(primeiro: 1, proprietários:["kLx41ALBpTVpCAgymxPaooBgMyk9hsdijSF2T-lZ_Bg"],
		tags: [
			{
				nome: "Nome-do-App",
				valores: ["arweave-id"]
			},
			{
				nome: "Tipo",
				valores: ["nome"]
			}
		]
	) {
		arestas {
			nó {
				id
					proprietário {
					endereço
				}
			}
		}
	}
}
```

## Recursos
* [Referência GQL do Arweave](../../references/gql.md)
* [Pacote ArDB](./ardb.md)
* [Pacote ar-gql](./ar-gql.md)
* [Serviço de Indexação de Pesquisa](./search-indexing-service.md)