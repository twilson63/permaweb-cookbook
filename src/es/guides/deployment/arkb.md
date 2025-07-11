---
locale: es
---

# arkb

## Requisitos

Es necesario contar con una cartera de Arweave para implementar utilizando `arkb` y cubrir los costos de transacción de datos.

## Instalación

Para instalar `arkb`, ejecuta el siguiente comando:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g arkb
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```

  </CodeGroupItem>
</CodeGroup>

## Implementación

Cuando se carga un directorio de archivos o una aplicación Permaweb, por defecto `arkb` implementa cada archivo por separado como una transacción L1, con la opción de agrupar las transacciones utilizando Irys.

## Compilación estática

Las aplicaciones Permaweb se generan de forma estática, lo que significa que el código y el contenido se generan de antemano y se almacenan en la red.

A continuación se muestra un ejemplo de un sitio estático. Para implementarlo en Permaweb, se pasará el directorio `build` como argumento para la bandera `deploy`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### Implementación predeterminada

La implementación como transacción L1 puede tardar más tiempo en confirmarse, ya que se carga directamente en la red de Arweave.

```console
arkb deploy [carpeta] --wallet [ruta a la cartera]
```

<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### Implementación agrupada

Para implementar utilizando Irys, necesitarás <a href="#fund-irys">financiar un nodo Irys</a>.

Irys node2 permite transacciones gratuitas de menos de 100kb.

Puedes añadir etiquetas identificables personalizadas a la implementación utilizando la sintaxis `nombre-etiqueta/valor-etiqueta`.

```console
arkb deploy [carpeta] --use-bundler [nodo-irys] --wallet [ruta a la cartera] --tag-name [nombre etiqueta] --tag-value [valor etiqueta]
```

<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## Otros comandos

#### Financiar irys

```console
arkb fund-bundler [cantidad] --use-bundler [nodo-irys]
```

<sub style="float:right">\* Financiar una instancia de Irys puede tardar hasta 30 minutos en procesarse</sub>

#### Guardar archivo de clave

```console
arkb wallet-save [ruta a la cartera]
```

Después de guardar tu clave, ahora puedes ejecutar comandos sin la opción --wallet-file, algo así

```console
arkb deploy [ruta al directorio]
```

#### Verificar saldo de la cartera

```console
arkb balance
```
