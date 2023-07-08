---
locale: pt
---
# Consultando Transações
Não é suficiente armazenar dados permanentemente, para que o Arweave seja útil, os dados também precisam ser encontráveis e recuperáveis. Este guia resume as diferentes abordagens para consulta de dados no Arweave.

## GraphQL
Ao longo do tempo, os serviços de indexação que implementam uma interface GraphQL se tornaram o método preferido para consulta de dados de transação no Arweave. Um serviço de indexação lê os cabeçalhos de transação e bloco à medida que são adicionados à rede (geralmente a partir de um nó Arweave completo operado pelo serviço). Uma vez lido, as informações do cabeçalho são inseridas em um banco de dados onde podem ser indexadas e consultadas de forma eficiente. O serviço de indexação usa esse banco de dados para fornecer um ponto de extremidade GraphQL para os clientes consultarem.

O GraphQL possui algumas vantagens que o tornam ideal para recuperar conjuntos de dados de consulta. Ele permite que os serviços de indexação criem um único ponto de extremidade que pode ser usado para consultar todos os tipos de dados. O serviço é capaz de retornar vários recursos em uma única solicitação, em vez de fazer uma solicitação HTTP para cada recurso (como seria feito com uma API REST). Com o GraphQL, os clientes podem agrupar várias solicitações em um único "round-trip" e especificar exatamente quais dados são necessários, o que aumenta o desempenho.

O seguinte exemplo de consulta GraphQL retorna todos os ids de transação de um determinado endereço de carteira de proprietários que possuem uma tag "Type" com o valor "manifesto". Para obter mais informações sobre tags, leia o guia sobre [Tags de Transação](tags.md).

```js:no-line-numbers
const objetoDeConsulta = {
	query:
	`{
		transactions (
			owners:["${endereco}"],
			tags: [
			  {
					name: "Type",
					values: ["manifesto"]
				}
			]
		) {
			edges {
				node {
					id
				}
			}
		}
	}`
};
const resultados = await arweave.api.post('/graphql', objetoDeConsulta);
```

### Serviços Públicos de Indexação
[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## Inspeção dos Blocos
Cada dado enviado para o Arweave possui seu próprio id de transação único e é incluído em um bloco único que é adicionado à blockchain. Os dados associados a cada transação são divididos em fragmentos de 256KB e anexados sequencialmente ao conjunto de dados do Arweave. É possível retroceder, bloco por bloco, a partir do [bloco atual](https://arweave.net/block/current) e inspecionar cada um deles para o id de transação em questão. Uma vez encontrado, os offsets dos fragmentos podem ser recuperados do bloco e usados para solicitar fragmentos diretamente de um nó Arweave. Esta é a forma de localizar e ler dados na rede em um nível mais baixo. Felizmente, existem abordagens menos intensivas [como o GraphQL](#graphql) disponíveis.

## ARQL
::: warning
O ARQL está obsoleto e foi substituído por consultas GraphQL em um gateway ou serviço de indexação. Alguns nós ainda podem atender solicitações ARQL, mas a disponibilidade e a precisão dos resultados não são garantidas.
:::
Arweave Query Language (ARQL) foi usado no início do desenvolvimento do Arweave. Junto com blocos e fragmentos, os nós também mantinham um banco de dados SQL que indexava transações individuais. Os clientes podiam consultar um nó usando ARQL e obter dados de transação. O seguinte é um exemplo de sintaxe de consulta ARQL.

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: endereco
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```
Esta abordagem de consulta foi suficiente quando o conjunto de dados do Arweave era pequeno e fácil de indexar. À medida que a adoção do Arweave acelerava, a indexação do conjunto de dados e a resposta a consultas ARQL resultavam em custos computacionais crescentes. Com o tempo, à medida que a mineração se tornava cada vez mais competitiva, os nós tinham cada vez menos chances de conseguir arcar com o serviço de ARQL. Isso acabou sendo o impulso para serviços de indexação e a [consulta GraphQL](#graphql) comum no Arweave hoje.

No entanto, há um caminho de volta para ser capaz de consultar dados diretamente dos nós. O [Protocolo de Pagamentos Permaweb (P3)](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ) é uma especificação desenvolvida pela comunidade para permitir que os clientes paguem pelo serviço. Usando o P3, nós que desejam oferecer serviços de indexação podem arcar com os custos operacionais cobrando pelo serviço.

## Recursos
* [Guia de Consulta ao Arweave](../guides/querying-arweave/queryingArweave.md)
* [Pacote ArDB](../guides/querying-arweave/ardb.md)
* [Pacote ar-gql](../guides/querying-arweave/ar-gql.md)
* [Referência do GraphQL](../references/gql.md)