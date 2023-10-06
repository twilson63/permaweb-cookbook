---
locale: es
---

# Metadatos de transacción (etiquetas)

Se puede pensar en Arweave como en un disco duro permanente de sólo adiciones donde cada entrada en el disco es una transacción única. Las transacciones tienen un ID único, una firma y una dirección de propietario para la dirección que firmó y pagó para que se publique la transacción. Junto con esos valores de cabecera, el protocolo Arweave permite a los usuarios etiquetar transacciones con etiquetas personalizadas. Estas se especifican como una colección de pares nombres-valores anexados a la transacción. Estas etiquetas hacen que sea posible consultar Arweave y encontrar todas las transacciones que incluyen una etiqueta o etiquetas particular. La capacidad de consultar y filtrar transacciones es esencial para apoyar aplicaciones construidas en Arweave.

## ¿Qué son las etiquetas de transacción?

Las etiquetas de transacción son pares clave-valor, donde la combinación de claves base64URL y valores debe ser menor que el máximo de 2048 bytes para una transacción nativa de arweave.

::: tip
Las transacciones agrupadas tienen soporte para más espacio de etiqueta. Las transacciones publicadas a través de bundler.network tienen hasta 4096 bytes de espacio de etiqueta.
:::

Algunos ejemplos comunes de etiquetas de transacción incluyen:

-   `Content-Type`: Se usa para especificar el tipo MIME de contenido para su renderización en el permaweb.
-   `App-Name`: Esta etiqueta describe la aplicación que está escribiendo los datos.
-   `App-Version`: Esta etiqueta es la versión de la aplicación, emparejada con App-Name.
-   `Unix-Time`: Esta etiqueta es una marca de tiempo en Unix, **segundos** desde la época.
-   `Título`: Se usa para dar un nombre o una descripción breve del contenido almacenado en la transacción.
-   `Descripción`: Se usa para proporcionar una descripción más larga del contenido.

Las etiquetas de transacción se pueden usar para una variedad de propósitos, como la indexación de transacciones para la búsqueda, la organización de transacciones en categorías o la provisión de metadatos sobre el contenido almacenado en una transacción.

## Algunas cosas buenas de saber sobre etiquetas de transacción

Las etiquetas de transacción están codificadas como cadenas codificadas en Base64URL tanto para la clave como para el valor. Esto hace posible publicar matrices de bytes como claves o valores y transferirlos de forma segura a través de HTTP. Aunque no es legible para humanos sin decodificar, no debe considerarse cifrado.

El tamaño máximo total de etiquetas de transacción para transacciones publicadas directamente en Arweave es de 2048 bytes. Este tamaño se determina por la concatenación de todas las claves y todos los valores de las etiquetas de transacción.

Las etiquetas de transacción se pueden usar en consultas GraphQL para devolver un conjunto filtrado de elementos de transacción.

## Etiquetas comunes usadas en la comunidad

| <div style="width:100px">Nombre de la etiqueta</div> | Descripción                                                                             | Casos de uso                                                                             |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| App-Name                                             | Se usa con más frecuencia para identificadores SmartWeave                               | Los valores comunes son SmartWeaveContract, SmartWeaveAction, y SmartWeaveContractSource |
| App-Version                                          | La versión de estos datos, puede representar la aplicación que consume esta información | 0.3.0 es la versión actual de SmartWeave                                                 |
| Content-Type                                         | Tipo MIME para identificar los datos contenidos en la transacción                       | text/html, application/json, image/png                                                   |
| Unix-Time                                            | Esta etiqueta es una marca de tiempo en Unix, **segundos** desde la época               | El momento en que se presentó la transacción                                             |
| Title                                                | Estándar ANS-110 para describir contenido                                               | Proporcionar un nombre para un Activo Atómico                                            |
| Type                                                 | Estándar ANS-110 para categorización de datos                                           | un tipo puede clasificar un activo de permaweb                                           |

## Ejemplos

<CodeGroup>
  <CodeGroupItem title="arweave">

```ts
const tx = await arweave.createTransaction({ data: mydata });
tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "Mi increíble publicación sobre etiquetas de transacción");
tx.addTag("Description", "¡Esta es una publicación que no quieres perderte!");
tx.addTag("Topic:Amazing", "Increíble");
tx.addTag("Type", "post-de-blog");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

  </CodeGroupItem>
  <CodeGroupItem title="@@irys/sdk">

```js
await irys.upload(mydata, [
	{ name: "Content-Type", value: "text/html" },
	{ name: "Title", value: "Mi increíble publicación sobre etiquetas de transacción" },
	{ name: "Description", value: "¡Esta es una publicación que no quieres perderte!" },
	{ name: "Topic: Amazing", value: "Increíble" },
	{ name: "Type", value: "post-de-blog" },
]);
```

  </CodeGroupItem>
</CodeGroup>

## Resumen

Entender cómo las etiquetas de transacción entran en la pila tecnológica de Arweave puede proporcionar contexto sobre cómo resolver problemas utilizando el Permaweb como plataforma de aplicaciones. Las etiquetas proporcionan una herramienta para consumir y crear estándares y patrones de datos comunes para fomentar una experiencia de datos no rivales en el Permaweb. El resultado brinda a los usuarios del ecosistema la opción de aplicaciones para consumir y crear contenido, ya que sus datos siempre están con el usuario, no con la aplicación.
