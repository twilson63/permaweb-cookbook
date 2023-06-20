---
locale: es
---

# Resumen

---

Los tokens de compartición de beneficios (PSTs) son un tipo de SmartWeaveToken que incluyen la siguiente estructura:

| propiedad | tipo   |
| --------- | ------ |
| balances  | objeto |
| nombre    | cadena |
| pendiente | cadena |
| transfer  | método |
| balance   | método |

Los PST suelen usarse para gobernar un protocolo o una “Comunidad de Compartición de Beneficios” (PSC), similar a un DAO.

### ¿Cómo se distribuyen los PSTs?

---

Los fundadores de una aplicación pueden crear un número determinado de PSTs y distribuirlos como deseen: para retenerlos o venderlos a inversores para recaudar capital.

Los protocolos pueden ofrecer PSTs como recompensa por contribuir con trabajo o completar tareas para la comunidad para incentivar el crecimiento.

Los PST también se pueden intercambiar entre ellos en [Permaswap](https://permaswap.network/#/) (actualmente en el testnet) y los desarrolladores pueden establecer permisos de intercambio de tokens usando [Verto Flex](https://github.com/useverto/flex).

### Características

---

Los PST funcionan como ‘**micro-dividendos**’. Cuando se usa un protocolo, se reserva una cantidad de propina para repartir entre los titulares. La propina se paga en $AR - **no** en la moneda del PST. Esto crea una relación muy especial entre la aplicación que se está desarrollando y Arweave en sí mismo.

### Beneficios

---

- Ofrece una forma flexible para que los desarrolladores ejecuten un protocolo y distribuyan tanta 'propiedad' como consideren
- Los PST se pueden usar como pago por el trabajo del protocolo o por tareas de la comunidad
- Los fundadores están incentivados a aumentar el uso de la red, ya que está directamente relacionado con los ingresos
- Los titulares tienen un valor **intrínseco** (recompensas $AR, no más «acciones»)

### Ejemplo PST: Token ARDRIVE

---

ArDrive es una aplicación permaviva que utiliza su apropiadamente nombrado PST, ARDRIVE.

Cuando alguien paga $AR para cargar datos a través de ArDrive, se distribuye una tarifa comunitaria del 15% a un solo titular de token usando un método aleatorio y ponderado.

![Ciclo PST de ArDrive](~@source/images/ardrive-pst.png)

Un usuario carga datos -> un titular de token ARDRIVE recibe $AR -> el titular de token ARDRIVE puede usar estos $AR para cargar archivos -> el ciclo se repite. ¡Esperamos que esto te dé una buena idea de cómo implementar tu propio PST!

### Explorando PSTs

---

Probablemente sea más apropiado ir directamente a viewblock y Sonar de Redstone. Simplemente usa enlaces que muestren específicamente los PST, para que alguien no tenga que navegar para encontrarlos.

Puedes usar [ViewBlock](https://viewblock.io/arweave) para una experiencia similar a etherscan para ver los contratos PST, como este [aquí](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

Otra opción es Sonar, un explorador de contratos inteligentes de Arweave creado por [RedStone Finance](https://sonar.redstone.tools/#/app/contracts). Ve el mismo contrato [aquí](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

> Algunos miembros de la comunidad han estado discutiendo llamar a los PST “Tokens de Servicio Permavivo”. Aún hay mucho que explorar con los PST-> únete a la discusión [aquí](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734) (Discord).
