---
locale: es
---
# Creación e Implementación de un PST

### **Prerrequisitos**

---

Antes de comenzar a crear tu PST, necesitarás tener instalado **NodeJS/NPM**.

### **Empezando**

---

Los contratos SmartWeave pueden dividirse en dos partes:

- **El Contrato** (la lógica real detrás del token)
- **Estado Inicial** (algunas configuraciones o ajustes que queremos que tenga nuestro token)

En esta guía crearemos ambos.

**Configurando el Entorno Local**

Ejecuta `npm install arweave arlocal warp-contracts`. 

Esto proporcionará las funciones necesarias para crear e implementar un PST.

### **Configurando el Contrato**

---

El PST requiere una configuración inicial antes de la implementación, como por ejemplo el nombre del token y la cantidad de tokens.

Crea un archivo de configuración que se vea así:

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "Test PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}

```

Lo cual establece algunas opciones iniciales para el PST. Guárdalo como `initial-state.json`.

- **`ticker`** - símbolo del token (por ejemplo, BTC, ETH)
- **`name`** - nombre del token
- **`owner`** - dirección del propietario del contrato
- **`balances`** - direcciones a las que se distribuirán los tokens iniciales

### Escribiendo el Contrato

El contrato PST debería tener una única función llamada `handle`, que toma dos argumentos:

`state`, que es el estado actual del contrato, y `action`, que es la acción que deseas realizar (por ejemplo, transferir tokens).

Cuando se realiza una llamada al contrato PST, debería devolver una de dos cosas:
- **`state`** - si la llamada al contrato cambia el estado (por ejemplo, realizando una transferencia).
- **`result`** - si la llamada **no** cambia el estado (por ejemplo, visualizando un saldo).

De lo contrario, debería lanzar un **`error`** si la llamada no es válida o falla. 

Primero, definamos la función principal `handle`.
```js
//contrato.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
Esto establece algunas variables para las interacciones comunes que utiliza el contrato inteligente.

Ahora agreguemos el primer tipo de entrada que cambiará el estado. Esto permitirá al propietario del contrato crear nuevos PST en su dirección de billetera.

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('Token mint inválido');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Valor inválido para "qty". Debe ser un número entero');
  }

  if(caller != state.owner) {
    throw new ContractError('Solo el propietario del contrato puede crear nuevos tokens.');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
La siguiente función se encargará de las transferencias de PST entre billeteras.

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`Valor inválido para "qty". Debe ser un número entero`);
    }

    if (!target) {
      throw new ContractError(`No se especificó un destinatario`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('Transferencia de token inválida');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`El saldo del llamante no es suficiente para enviar ${qty} token(s)¡`);
    }

    // Reducir el saldo de tokens del llamante
    balances[caller] -= qty;
    if (target in balances) {
      // La billetera ya existe en el estado, agregar nuevos tokens
      balances[target] += qty;
    } else {
      // La billetera es nueva, establecer saldo inicial
      balances[target] = qty;
    }

    return { state };
  }
```
También agreguemos una forma de ver el saldo del PST en una billetera de destino.

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Debe especificar un destinatario para obtener el saldo`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`No se pudo obtener el saldo, el destinatario no existe`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
Y finalmente, lancemos un error si la entrada dada no es la función `mint`, `transfer`, o `balance`.

```js
throw new ContractError(`No se proporcionó una función o la función no es reconocida: "${input.function}"`);
```

### **Implementando el Contrato**

Para implementar un contrato, necesitamos escribir un script de NodeJS que funcione con Warp para implementar nuestro contrato.

Crea un archivo llamado `deploy-contract.js` y comienza importando `WarpFactory`.

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
A continuación, inicializa una instancia de Warp.

Puedes reemplazar `forMainnet()` con `forLocal()` o `forTestnet()`, dependiendo de dónde desees implementar tu contrato.
```js
const warp = WarpFactory.forMainnet();
```

Ahora que tienes Warp configurado, necesitarás una billetera desde la cual implementar el contrato. Puedes usar tu propio archivo clave local:

```js
const walletAddress = "ruta/a/billetera.json"
```
 o generar una nueva billetera a través de Warp utilizando el siguiente código:

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
Las transacciones de menos de 100KB son gratuitas, por lo que ¡ni siquiera tienes que financiar la billetera!

---

Antes de implementar el contrato, necesitamos leer el archivo de estado inicial y el archivo de contrato.

```js
const contract = fs.readFileSync(path.join(__dirname, 'contrato.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
Si generaste una nueva billetera para implementar desde ella, tendrás que sobrescribir el `owner` en el estado inicial. Puedes hacerlo con el siguiente código:
```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
Si estás utilizando una billetera, puedes editar directamente el archivo `initial-state.json` para usar la dirección de tu billetera.

El siguiente código maneja la implementación del contrato:

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('Implementación completada: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

Ejecuta el script con `node deploy-contract.js`, lo cual implementará tu contrato y registrará la ID de transacción del contrato en la terminal para que la utilices.

---

**Fuente y Lectura Adicional**: [Documentación de Warp](https://academy.warp.cc/tutorials/pst/introduction/intro)