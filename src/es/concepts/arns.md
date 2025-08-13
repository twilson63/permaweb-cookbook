---
locale: es
---
# Sistema de Nombres Arweave (ArNS)
## Visión general
El Sistema de Nombres Arweave (ArNS) es el directorio telefónico potenciado por Smartweave del PermaWeb.

Es un sistema de nombrado descentralizado y resistente a la censura habilitado por Gateways AR.IO y utilizado para conectar nombres amigables con aplicaciones, páginas y datos del PermaWeb.

Este sistema funciona de manera similar a los DNS tradicionales, donde un usuario puede comprar un nombre en un registro y los servidores de nombres DNS resuelven estos nombres a direcciones IP.

Con ArNS, el registro es descentralizado, permanente y almacenado en Arweave (con Smartweave) y cada gateway AR.IO actúa como caché y resolutor de nombres. Los usuarios pueden registrar un nombre dentro del Registro ArNS, como "mi-nombre" y establecer un puntero a cualquier ID de Transacción de Arweave. Los Gateways AR.IO resolverán ese nombre como una de sus propias subdominios, por ejemplo https://laserilla.arweave.net y proxy todas las solicitudes al ID de transacción de Arweave asociado. Cada nombre registrado también puede tener nombres inferiores asociados con él que apunten a un ID de Transacción de Arweave, como https://v1_laserilla.arweave.net, dando aún más flexibilidad y control a su dueño.

## El Registro ArNS
<!-- // TODO: link to smartweave concept // -->

ArNS utiliza el protocolo Smartweave para administrar sus registros de nombres. Cada registro, o nombre, es arrendado por un usuario y vinculado a un token ANT. Puedes registrar varios nombres ArNS a un único ANT, pero no puedes registrar varios ANTs a un único nombre ArNS: los Gateways no sabrían a dónde apuntar el ID de enrutamiento.

Los nombres ArNS pueden ser hasta 32 caracteres, incluyendo números [0-9], letras [a-z] y guiones [-]. Los guiones no pueden ser guiones finales, por ejemplo -mi-nombre.

## ANTs (Tokens de Nombre Arweave)

Los ANTs son una parte crucial del ecosistema ArNS: son la clave real para poseer un nombre ArNS. Cuando registras un nombre ArNS a un ANT, el ANT luego se convierte en el método de transferencia para ese nombre. El registro ArNS no se preocupa por quién es el propietario del ANT, simplemente sabe a qué nombre ANT pertenece.

Dentro de los ANTs, puedes construir cualquier funcionalidad que desees, dentro del alcance de la lista de transacciones de código fuente aprobada por el registro ArNS. Hasta y incluyendo NFT's, PST's, DAO's o aplicaciones completas.

## Nombres inferiores

Los nombres inferiores son registros que se mantienen y administran por tu ANT (Token de Nombre Arweave). Estos registros se pueden crear y administrar sin siquiera poseer un nombre ArNS, y se transferirán junto al ANT cuando se envíen a un nuevo propietario. Del mismo modo, si tu nombre ArNS expira, y registras tu ANT a un nuevo nombre ArNS, todos tus nombres inferiores permanecerán intactos.

Ejemplo: tienes oldName.arweave.net.  

luego: creas el nombre inferior "mi" - mi_oldName.arweave.net.

luego: oldName.arweave.net expira, y registras newName.arweave.net en tu ANT.

ahora: el nombre inferior mi está disponible en newName - mi_newName.arweave.net. 

A continuación se muestra un ejemplo de un Estado de contrato ANT:

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```
Record base "@" es el ID de enrutamiento inicial para el ANT. si registraste 'mi-nombre' en este ANT, y trataste de acceder a él a través de my-name.arweave.net, serías redirigido al ID de transacción del record @.

si intentaste acceder a undername1_my-name.arweave.net, obtendrías el ID de transacción de 'undername1'. 

Los ANTs, en teoría, tienen un número de nombres inferiores ILIMITADO. Sin embargo, cuántos se servirán depende de qué nivel se use con tu nombre ArNS.