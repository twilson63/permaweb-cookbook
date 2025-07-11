---
locale: es
---

# Consultar transacciones

No basta con almacenar datos de manera permanente, para que Arweave sea útil los datos también deben ser descubribles y recuperables. Esta guía resume los diferentes enfoques para consultar datos en Arweave.

## GraphQL

Con el tiempo, los servicios de indexación que implementan una interfaz GraphQL se han convertido en el método preferido para consultar datos de transacciones en Arweave. Un servicio de indexación lee los encabezados de transacciones y bloques a medida que se agregan a la red (generalmente desde un nodo completo de Arweave en el que opera el servicio). Una vez leídos, la información del encabezado se inserta en una base de datos donde se puede indexar y consultar de manera eficiente. El servicio de indexación usa esta base de datos para proporcionar un punto de acceso GraphQL para que los clientes consulten.

GraphQL tiene algunas ventajas que lo hacen ideal para recuperar conjuntos de datos consultados. Permite a los servicios de indexación crear una sola ubicación que luego se puede usar para consultar todos los tipos de datos. El servicio puede volver varios recursos en una sola solicitud, en lugar de hacer una solicitud HTTP para cada recurso (como se haría con una API REST). Con GraphQL, los clientes pueden agrupar varias solicitudes en un solo viaje de ida y especificar exactamente qué datos se necesitan, lo que aumenta el rendimiento.

El siguiente ejemplo de GraphQL consulta todas las identificaciones de transacción de una dirección de billetera dada que tienen una etiqueta "Type" con un valor de "manifest". Para obtener más información sobre las etiquetas, lea la guía sobre [Transaction Tags](tags.md).

```js:no-line-numbers
const queryObject = {
	query:
	`{
		transactions (
			owners:["${address}"],
			tags: [
			  {
					name: "Type",
					values: ["manifest"]
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
const results = await arweave.api.post('/graphql', queryObject);
```

### Servicios de indexación públicos

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## Inspeccionando los bloques

Cada pieza de datos cargada a Arweave tiene su propio identificador de transacción único y se incluye en un bloque único que luego se agrega a la cadena de bloques. Los datos asociados con cada transacción se dividen en trozos de 256KB y se appenden secuencialmente al conjunto de datos de Arweave. Es posible retroceder, bloque por bloque, desde [el bloque actual](https://arweave.net/block/current) e inspeccionar cada uno en busca del id de transacción en cuestión. Una vez encontrado, los offsets de los chunks se pueden recuperar del bloque y usar para solicitar chunks directamente a un par de Arweave. Este es el nivel más bajo para localizar y leer datos en la red. Afortunadamente, existen enfoques menos laboriosos [como GraphQL](#graphql) disponibles.

## ARQL

::: warning
ARQL está obsoleto y reemplazado por consultas GraphQL en una pasarela o servicio indexador. Algunos peers todavía pueden honrar solicitudes ARQL, pero la disponibilidad y la exactitud de los resultados no están garantizados.
:::

Arweave Query Language (ARQL) se usó al principio en el desarrollo de Arweave. Junto a los bloques y chunks, los pares también mantenían una base de datos SQL que indexaba transacciones individuales. Los clientes podían consultar un par usando ARQL y obtener datos de transacciones. A continuación se muestra un ejemplo de la sintaxis de consulta ARQL.

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: address
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```

Este enfoque para consultar fue suficiente cuando el conjunto de tejido era pequeño y fácil de indexar. A medida que el uso de Arweave aceleraba, indexar el conjunto de datos y responder consultas ARQL resultaban en mayores costos computacionales. Con el tiempo, a medida que la minería se volvía cada vez más competitiva, los pares eran cada vez menos propensos a poder ofrecer el servicio ARQL. Esto, en última instancia, fue la impulso para los servicios indexadores y la [consulta GraphQL](#graphql) común en Arweave hoy en día.

Existe un camino de vuelta para consultar datos directamente desde los pares. El [Protocolo de pagos del Permaweb (P3)](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ) es una especificación desarrollada por la comunidad para que los clientes puedan pagar por el servicio. Usando P3, los pares que deseen ofrecer un servicio de indexación podrían poder operarlo de manera rentable cobrando por el servicio.

## Recursos

- [Guía de consulta de Arweave](../guides/querying-arweave/queryingArweave.md)
- [Paquete ArDB](../guides/querying-arweave/ardb.md)
- [Paquete ar-gql](../guides/querying-arweave/ar-gql.md)
- [Referencia GraphQL](../references/gql.md)
