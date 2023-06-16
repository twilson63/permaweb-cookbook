---
locale: es
---
# Consultando Arweave con GraphQL
Arweave proporciona una forma sencilla de consultar transacciones y filtrarlas por medio de [etiquetas](../concepts/tags.md). Los servicios de indexación compatibles con GraphQL de Arweave proporcionan puntos finales a los que los usuarios pueden enviar consultas de GraphQL, y también brindan un área de pruebas para probar las consultas.

[GraphQL](https://graphql.org) es un lenguaje de consulta flexible que los servicios pueden usar para construir un esquema de datos personalizado para que los clientes consulten. GraphQL también permite a los clientes especificar qué elementos de la estructura de datos disponibles les gustaría ver en los resultados.

## Servicios de Indexación Públicos

- [arweave.net graphql](https://arweave.net/graphql) el punto final original de GraphQL, gestionado por [ar.io](https://ar.io)
- [goldsky search service](https://arweave-search.goldsky.com/graphql) un servicio público específicamente optimizado para la búsqueda utilizando una superconjunto de la sintaxis de GraphQL, gestionado por [goldsky](https://goldsky.com)
- [ar.io decentralized indexing](https://ar-io.dev/graphql) Una red descentralizada para servicios de indexación. Actualmente en pruebas con transacciones L1 disponibles.

## Ejecución de una Consulta GraphQL
Para consultar Arweave, debemos acceder a través de un servicio de indexación que admita GraphQL. ¡Utiliza uno de los entornos de pruebas de GraphQL mencionados anteriormente para comenzar!

Copia y pega la siguiente consulta:
```graphql:no-line-numbers
query {
  transactions(tags: [{
    name: "App-Name",
    values: ["PublicSquare"]
  }]) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```


Si no estás familiarizado con GraphQL, puede parecer un poco abrumador al principio. Sin embargo, una vez que conoces su estructura, es bastante fácil de leer y comprender.

```text:no-line-numbers
query { <tipo de esquema> ( <criterio de filtro> ) { <estructura de datos de los resultados> } }
```

En la consulta de ejemplo que hemos pegado, nuestro `<tipo de esquema>` es `transactions`, pero también podríamos consultar `blocks`. Una descripción completa del esquema de GraphQL de Arweave se encuentra en la [Guía de GraphQL de Arweave](https://gql-guide.arweave.dev). La guía se refiere al `criterio de filtro` como "Estructuras de Consulta" y la definición completa de la estructura de datos de `transactions` y `blocks` como "Estructuras de Datos".

En cuanto a la `<estructura de datos de los resultados>`, lo importante es que se puede especificar un subconjunto de la estructura de datos completa en la que estás interesado. Por ejemplo, la estructura de datos completa para un esquema de transacciones se encuentra [aquí](https://gql-guide.arweave.dev/#full-data).

En nuestro caso, nos interesa el `id` y la lista completa de `tags` para cualquier transacción que cumpla con nuestros criterios de filtro.

Haz clic en el botón "Play" en el centro del entorno de pruebas para ejecutar la consulta.

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

Verás que obtenemos una lista de transacciones en la estructura de datos de resultados que especificamos en nuestra consulta original.

Si eres nuevo en las blockchains, esto es inesperado, no hemos construido nada, ¿por qué existen estos resultados? Resulta que la etiqueta `"PublicSquare": "App-Name"` que hemos filtrado se ha utilizado durante mucho tiempo.

El fundador del protocolo Arweave, Sam Williams, propuso el formato de transacción hace algunos años en un [fragmento de código de GitHub](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2). Desde entonces, los desarrolladores del ecosistema han estado construyendo sobre él, experimentando, y publicando transacciones con esas etiquetas.

Volviendo a la consulta de Arweave, notarás en los resultados de GraphQL que no hay mensajes de publicaciones legibles, solo etiquetas e información sobre las publicaciones.

Esto se debe a que el servicio de indexación de GraphQL se encarga de indexar y recuperar los datos del encabezado de las transacciones y bloques, pero no de sus datos asociados.

Para obtener los datos de una transacción, necesitamos buscarla utilizando otro punto final HTTP.
```text:no-line-numbers
https://arweave.net/<id transacción>
```

Copia y pega uno de los id que aparecen en los resultados de tu consulta y modifica el enlace anterior, anexando el `id`. Debería verse algo como esto...

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

El resultado de acceder a esa URL en el navegador (HTTP GET) sería obtener el contenido de la publicación (almacenado en los datos de las transacciones). En este ejemplo, es...
```text:no-line-numbers
Wow, esto es bastante genial 😎
```
(Para obtener una lista completa de los puntos finales HTTP de Arweave, visita la [documentación de la API HTTP](https://docs.arweave.org/developers/server/http-api).)

## Publicar una Consulta desde JavaScript
Publicar una consulta de GraphQL desde JavaScript no es muy diferente a hacerlo en el entorno de pruebas.

Primero, instala el paquete `arweave-js` para acceder fácilmente a un punto final de GraphQL.
```console:no-line-numbers
npm install --save arweave
```

Luego, ingresa una versión ligeramente más avanzada de la consulta de ejemplo anterior y espera los resultados de publicarla utilizando la palabra clave `await`.

```js:no-line-numbers
import Arweave from 'arweave';

// inicializar una instancia de Arweave
const arweave = Arweave.init({});

// crear una consulta que seleccione datos de tx los primeros 100 tx con etiquetas específicas
const objetoConsulta = {
	query:
	`{
		transactions(
			first:100,
			tags: [
				{
					name: "App-Name",
					values: ["PublicSquare"]
				},
				{
					name: "Content-Type",
					values: ["text/plain"]
				}
			]
		) 
		{
			edges {
				node {
					id
					tags {
						name
						value
					}
				}
			}
		}
	}`
};
const resultados = await arweave.api.post('/graphql', objetoConsulta);
```

## Múltiples Consultas
Es posible enviar múltiples consultas en una sola conexión al punto final de GraphQL. Este ejemplo realiza consultas por la transacción `name` (cada una como una consulta separada) para dos direcciones de billetera utilizando el protocolo `arweave-id`, que ahora está obsoleto (reemplazado por `ar-profile`) pero aún permanente.
```graphql:no-line-numbers
query {
	account1: transactions(first: 1, owners:["89tR0-C1m3_sCWCoVCChg4gFYKdiH5_ZDyZpdJ2DDRw"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
	account2: transactions(first: 1, owners:["kLx41ALBpTVpCAgymxPaooBgMyk9hsdijSF2T-lZ_Bg"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
}
```

## Recursos
* [Referencia de GQL de Arweave](../../references/gql.md)
* [Paquete ArDB](./ardb.md)
* [Paquete ar-gql](./ar-gql.md)
* [Servicio de Indexación de Búsqueda](./search-indexing-service.md)