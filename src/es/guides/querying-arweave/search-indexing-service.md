---
locale: es
---
# Servicio de indexación de búsqueda

tl;dr

- Sintaxis compatible hacia atrás con Arweave GraphQL
- Tiempos de respuesta más rápidos para consultas complejas (por ejemplo, búsqueda con múltiples etiquetas)
- Más opciones de consulta
---

El servicio de búsqueda gratuito de [Goldsky](https://goldsky.com) utiliza una infraestructura optimizada que permite búsquedas más rápidas para consultas complejas en bloques y transacciones de arweave, e introduce también una sintaxis adicional de consulta para casos de uso de búsqueda difusa y con comodines.

La sintaxis de búsqueda GraphQL es un superconjunto de la sintaxis de búsqueda de [Arweave GraphQL](./queryingArweave.md). Es totalmente compatible hacia atrás y devolverá los mismos resultados para las mismas consultas, pero tiene algunos modificadores adicionales que pueden ser útiles.

- Filtros de etiquetas flexibles
  - Buscar solo por el nombre o valor de una etiqueta
- Filtros de etiquetas avanzados
  - Búsqueda difusa
  - Búsqueda con comodines
- Filtrar solo transacciones L1

Para cualquier necesidad personalizada o ideas de funciones, ¡no dudes en ponerte en contacto con el equipo de Goldsky por correo electrónico o en Discord!


## Puntos finales de la pasarela de búsqueda

Actualmente, la única versión de esta sintaxis está alojada en Goldsky. Si alguien está interesado en hospedar su propia pasarela con la misma sintaxis, no dude en ponerse en contacto con [Goldsky](https://goldsky.com) para obtener ayuda.

- [Servicio de búsqueda de Goldsky](https://arweave-search.goldsky.com/graphql)

## Características

### Filtros de etiquetas flexibles

La sintaxis de la pasarela de búsqueda es menos estricta y permite buscar solo por el nombre o valor de la etiqueta.

#### Ejemplos
Buscar transacciones con el valor de etiqueta 'gato'

```graphql:no-line-numbers
query solo_valores {
  transacciones(
    primero: 10,
    etiquetas: [
      {
        valores: ["gato"]
      }
    ]
  ) 
  {
    bordes {
      nodo {
        id
        etiquetas {
          nombre
          valor
        }
      }
    }
  }
}
```

Buscar transacciones que tengan un `In-Response-To-ID`

```graphql:no-line-numbers
query solo_nombre {
  transacciones(
    primero: 10,
    etiquetas: [
      {
        nombre: "In-Response-To-ID"
      }
    ]
  ) 
  {
    bordes {
      nodo {
        id
        etiquetas {
          nombre
          valor
        }
      }
    }
  }
}
```


### Filtros de etiquetas avanzados

La sintaxis de la pasarela de búsqueda ofrece un parámetro adicional para el filtro de etiquetas, `match`.

| Valor de coincidencia | Descripción | 
|-------------|-------------|
| EXACTO | (predeterminado) solo coincidencias exactas. |
| COMODÍN | Permite que * coincida con cualquier cantidad de caracteres, por ejemplo, `texto/*` |
| FUZZY_AND | Coincidencia difusa que contiene todos los términos de búsqueda |
| FUZZY_OR | Coincidencia difusa que contiene al menos uno de los términos de búsqueda |


Abre el playground e intenta algunas de las siguientes consultas:

Buscar todas las transacciones con un tipo de contenido de imagen utilizando un comodín
```graphql:no-line-numbers
{
    transacciones(        
      etiquetas: [
        { nombre: "Content-Type", valores: "imagen/*", coincidencia: COMODÍN}
      ]
      primero: 10
    ) {
        bordes {
            cursor
            nodo {
                id
              etiquetas {
                nombre
                valor
              }
              bloque { altura }
              agrupadoEn {id}
            }
        }
    }
}
```

### Búsqueda difusa

La búsqueda difusa es muy potente y puede buscar texto 'similar' con muchas variaciones.

Buscar todas las transacciones con 'gato' O 'perro' (o CAT o DOG o cAts o CAAts, etc.). Por lo tanto, la etiqueta podría contener al menos un término similar a gato o perro.

```graphql:no-line-numbers
{
    transacciones(        
      etiquetas: [
        { nombre: "Content-Type", valores: ["gato", "perro"], coincidencia: "FUZZY_OR"}
      ]
      primero: 10
    ) {
        bordes {
            cursor
            nodo {
                id
              etiquetas {
                nombre
                valor
              }
              bloque { altura }
              agrupadoEn {id}
            }
        }
    }
}
```

Buscar transacciones que tengan valores de etiqueta similares a gato Y perro
```graphql:no-line-numbers
{
    transacciones(        
      etiquetas: [
        { nombre: "Content-Type", valores: ["gato", "perro"], coincidencia: "FUZZY_AND"}
      ]
      primero: 10
    ) {
        bordes {
            cursor
            nodo {
                id
              etiquetas {
                nombre
                valor
              }
              bloque { altura }
              agrupadoEn {id}
            }
        }
    }
}
```

### Excluir transacciones agrupadas (L2)

Simplemente configura `agrupadoEn: NULL`

```graphql:no-line-numbers
query solo_l1 {
  transacciones(
    primero: 10,
    agrupadoEn: null
  ) 
  {
    bordes {
      nodo {
        id
        firma
        propietario {
          dirección
        }
        bloque {
          altura
        }
      }
    }
  }
}
```