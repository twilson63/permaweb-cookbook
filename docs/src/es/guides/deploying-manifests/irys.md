---
locale: es
---

### Irys CLI (Previously Bundlr)

---

El comando `irys upload-dir <folder>` carga un directorio local en Arweave y automáticamente genera un manifiesto de los archivos.

Si desea cargar su propio archivo de manifiesto manualmente, utilizando la bandera `--content-type "application/x.arweave-manifest+json"` en cualquier transacción, se designará como una transacción de manifiesto.

### Cliente JS de Irys

---

Usando el siguiente fragmento carga un directorio local en Arweave y automáticamente genera un manifiesto de los archivos:

```js
await irys.uploadFolder("./ruta/al/directorio", {
	indexFile: "./archivoIndice.html", // archivo de índice opcional (archivo que el usuario cargará al acceder al manifiesto)
	batchSize: 50, // cantidad de elementos para cargar de una vez
	keepDeleted: false, // si mantener o no los elementos previamente eliminados de cargas anteriores
}); // devuelve el ID del manifiesto
```

Si desea cargar su propio archivo de manifiesto manualmente, `await irys.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` designará los datos cargados como una transacción de manifiesto.

---

Fuente y lectura adicional: [Documentación de Irys](http://docs.irys.xyz/developer-docs/irys-sdk#uploading-a-folder)
