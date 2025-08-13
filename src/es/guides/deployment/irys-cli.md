---
locale: es
---

# Irys CLI (Previously Bundlr)

## Requisitos

Se requiere una billetera Arweave para implementar. Si el tamaño del directorio es mayor a 100kb, se requiere una <a href="#fund-irys">instancia de Irys financiada</a>.

## Instalación

Para instalar la CLI de Irys, ejecuta el siguiente comando
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @irys/sdk
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @irys/sdk
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
irys upload-dir [ruta a la carpeta] -w [ruta a la billetera] --index-file [index.html] -c [moneda] -h [nodo de Irys]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Otros Comandos

#### Financiar Irys

```console
irys fund [monto] -h [nodo de Irys] -w [ruta a la billetera] -c [moneda]
```

<sub style="float:right">\* La financiación de una instancia de Irys puede tardar hasta 30 minutos en procesarse</sub>

#### Verificar el Saldo de Irys

```console
irys balance [dirección de billetera] -h [nodo de Irys] -c arweave
```
