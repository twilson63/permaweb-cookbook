---
locale: es
---

# Bundlr CLI

## Requisitos

Se requiere una billetera Arweave para implementar. Si el tamaño del directorio es mayor a 100kb, se requiere una <a href="#fund-bundlr">instancia de Bundlr financiada</a>.

## Instalación

Para instalar la CLI de Bundlr, ejecuta el siguiente comando
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @bundlr-network/client
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

## Generación Estática

Las aplicaciones de Permaweb son generadas estáticamente, lo que significa que el código y el contenido se generan de antemano y se almacenan en la red.

A continuación se muestra un ejemplo de un sitio estático. Para implementarlo en Permaweb, el directorio `build` se pasará como argumento para la bandera `upload-dir`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## Implementación

```console
bundlr upload-dir [ruta a la carpeta] -w [ruta a la billetera] --index-file [index.html] -c [moneda] -h [nodo de Bundlr]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Otros Comandos

#### Financiar Bundlr

```console
bundlr fund [monto] -h [nodo de Bundlr] -w [ruta a la billetera] -c [moneda]
```

<sub style="float:right">\* La financiación de una instancia de Bundlr puede tardar hasta 30 minutos en procesarse</sub>

#### Verificar el Saldo de Bundlr

```console
bundlr balance [dirección de billetera] -h [nodo de Bundlr] -c arweave
```
