---
locale: es
---


# Monederos y Claves

---

### Monederos de Arweave
En Arweave, un monedero asegura una dirección única en la blockchain. La dirección se utiliza para realizar un seguimiento de su saldo $AR y para interactuar con la red Arweave, como enviar transacciones o interactuar con [SmartWeave Contracts](../guides/smartweave/warp/intro.md).

Al igual que la mayoría de las blockchains, el concepto de un monedero en Arweave es ligeramente engañoso. 

Un monedero en realidad no "guarda" ninguna divisa por sí solo; los saldos de token se almacenan en la blockchain y están vinculados a la dirección del monedero. En cambio, un monedero almacena los par llave criptográficas público-privada que se pueden usar para firmar transacciones para publicar datos o transferir tokens. El dueño del monedero (la persona con acceso a la **llave privada** del monedero) es el único que puede firmar transacciones para la dirección y acceder a sus fondos. 

### Par de Claves y Formato de Monedero

Arweave usa Par de Claves *4096bit* RSA-PSS almacenados usando el formato JWK (JSON Web Keys). El formato JWK se puede usar para almacenar muchos tipos de claves criptográficas, no solo RSA. 

Aquí se muestra el contenido de un archivo JWK que describe un par de claves RSA-PSS. Los valores se abrevian para que no sean accidentalmente usados como remitente o destinatario de una transacción en la blockchain. Al almacenar pares de claves RSA-PSS, el valor asociado con 'n' en el JWK es la **llave pública** de su monedero y se puede compartir de forma segura sin comprometer la seguridad de su monedero.

```json
{
	"d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
	"dp": "DezP9yvB13s9edjhYz6Dl...",
	"dq": "SzAT5DbV7eYOZbBkkh20D...",
	"e": "AQAB",
	"ext": true,
	"kty": "RSA",
	"n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
	"p": "5ht9nFGnpfW76CPW9IEFlw...",
	"q": "tedJwzjrsrvk7o1-KELQxw...",
	"qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

Su **llave privada** también se almacena en el JWK, principalmente bajo el valor asociado con 'd', pero también está parcialmente derivado desde algunos de los otros valores en el JWK. La **llave privada** es como la contraseña de su monedero, que se puede usar para crear firmas digitales (como para firmar transacciones) o descifrar datos. 

Estos JWKs son archivos json reales creados y exportados desde una aplicación de monedero como [Arweave.app](https://arweave.app) o generados a travez de código usando [arweave-js](https://github.com/ArweaveTeam/arweave-js).

Cuando se usa una aplicación de monedero para generar su par de claves, su **llave privada** también se puede representar con una frase mnemónica **semilla**, que en algunos casos se puede usar como alternativa para firmar transacciones y/o recuperar su monedero.

### Seguridad de Monedero

Su **llave privada** debe mantenerse confidencial siempre, ya que tiene la habilidad de transferir tokens desde su dirección a la de otra persona. Como desarrollador, asegurese de no incluir su archivo de llave en ningún repositorio de GitHub publico o alojarlo en cualquier otro lugar publicamente.

### Direcciones de Monedero

Curiosamente, la dirección de su monedero se deriva de su **llave pública**. Si bien es seguro compartir la **llave pública** con otros, una **llave pública** de *4096bit* es un poco grande para pasar alrededor convenientemente. Para reducir ese overhead y mantener las direcciones de monedero un poco más legibles para los seres humanos, el hash de `SHA-256` de la **llave pública** se codifica en `Base64URL` y se usa como dirección del monedero. Esto hace unlink seguro y determinista de una dirección de monedero de 43 caracteres únicos a la **llave pública** del monedero y proporciona una abreviatura conveniente que cualquiera con la **llave pública** pueda verificar.

### Monederos
[Arweave.app](https://arweave.app/welcome) - Monedero web de Arweave para desplegar datos permanentes, conecte sus cuentas de forma segura a aplicaciones descentralizadas y navegar el weab.

[ArConnect](https://www.arconnect.io/) -Extensión del navegador de Monedero de Arweave

### Fuentes y Lectura Adicional:
[Documentación Arweave](https://docs.arweave.org/developers/server/http-api#key-format)

[Formato JSON Web Key (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)