---
locale: es
---

# Manifiestos de Rutas

## Resumen

Al subir archivos a Arweave, se asigna a cada archivo una ID de transacción única. Por defecto, estas ID no se agregan ni se organizan de ninguna manera en particular.

Una foto de tu gato podría almacenarse con una ID de transacción [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw), mientras que otra con [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0) como su ID de transacción.

| Cat1                                                                                    | Cat2                                                                                    |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300"> | <img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4...                                                       | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0                                             |

Estas ID de transacción son un poco engorrosas y difíciles de encontrar entre todos tus archivos relevantes. Sin un manifiesto de rutas, si cargaras 100 fotos de tu gato, ¡necesitarías mantener el rastro de ** 100 diferentes ID y enlaces **!

Los Manifiestos de Rutas son una forma de enlazar múltiples transacciones en una única ID de transacción base y darles nombres de archivos legibles para humanos. En relación con el ejemplo del gato, podrías tener una única ID de transacción para recordar y usarla como una carpeta, accediendo a tus fotos de gato con nombres de archivo más memorables como [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg), etc.

Crear conjuntos agrupados de nombres de archivo legibles es esencial para crear aplicaciones prácticas en Arweave y desbloquea la capacidad de alojar sitios web u otros conjuntos de archivos como se explora en los ejemplos a continuación.

### ¿Para qué puedes usar los Manifiestos?

---

Cada vez que necesite agrupar archivos de una manera jerárquica, los manifiestos pueden ser útiles. Por ejemplo:

- **Almacenamiento de colecciones NFT:**
  - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
  - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

Esto refleja la aproximación de ruta de base común usada por las colecciones NFT cuando se vinculan imágenes y metadatos de NFT en una API de almacenamiento o IPFS.

- **Hospedando sitios web:**
  - https://arweave.net/X8Qm…AOhA/index.html
  - https://arweave.net/X8Qm…AOhA/styles.css
  - https://arweave.net/X8Qm…AOhA/public/favicon.png

### Estructura de Manifiesto

---

Los Manifiestos de Rutas son un formato especial de transacción creado y publicado en Arweave usando las Etiquetas:

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

y datos de transacción en formato JSON que coinciden con el ejemplo a continuación.

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

Fuente y lectura adicional en los documentos oficiales de Arweave Path Manifest: [Documentos de Arweave](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
