---
locale: es
---
# Publicar una Transacción usando Dispatch
Las carteras de Arweave en el navegador tienen el concepto de despachar transacciones. ¡Si la transacción tiene un tamaño menor a 100KB se puede publicar de forma gratuita!
## Despachando una Transacción
Esto se puede hacer sin ninguna dependencia de paquetes para la aplicación del cliente. Siempre y cuando el usuario tenga una cartera activa en el navegador y los datos sean menores a 100KB, las transacciones despachadas son gratuitas y se garantiza que serán confirmadas en la red.

```js:no-line-numbers
// usar arweave-js para crear una transacción
let tx = await arweave.createTransaction({ data:"¡Hola Mundo!" })

// agregar algunas etiquetas personalizadas a la transacción
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// usar la cartera del navegador para despachar() la transacción
let result = await window.arweaveWallet.dispatch(tx);

// registrar el ID de la transacción
console.log(result.id);
```

## Recursos
* Para una visión general de todas las formas en las que se pueden publicar transacciones, consulta la sección [Publicar Transacciones](../../concepts/post-transactions.md) del libro de cocina.