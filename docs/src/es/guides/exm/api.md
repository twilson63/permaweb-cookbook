---
locale: es
---
# Token de API de la Máquina de Ejecución

EXM busca ser agnóstico de criptografía y solo requiere un token de API (también conocido como clave) para interactuar. Este token de API es necesario para la mayoría de las acciones en EXM, como implementaciones y operaciones de escritura.

## Creación de un token de API

Para crear un token de API, se deben realizar los siguientes pasos:

- Ir a la [página principal](https://exm.dev/).
- Elegir el método preferido para Registrarse/Iniciar sesión.

![Opciones de inicio de sesión de EXM](~@source/images/exm-sign-in-options.png)

- Después de ser redirigido al panel de control, hacer clic en "Nuevo Token".

![Crear nuevo token de API](~@source/images/exm-create-token.png)

- Copiar el token que se ha generado y usarlo con el SDK o CLI.

## Manejo seguro del token de API

El token es un identificador de nuestra cuenta y nos permite acceder a funciones asociadas con ella. Por lo tanto, es vital asegurarse de que este token se mantenga en secreto para evitar cualquier spam y ataques a nuestras funciones. La mejor manera de hacerlo es utilizando variables de entorno.

Hay dos formas de almacenar variables de entorno:

1. A través de la línea de comandos:

En el directorio del proyecto, pasar el siguiente comando:

```bash
export EXM_PK=<tu_token_de_api>
```

2. A través del sdk `dotenv`:

- Ejecutar lo siguiente en la línea de comandos:

  ```bash
  npm install dotenv

  #O

  yarn add dotenv
  ```
- Importar la biblioteca en el archivo usando las variables:

  ```jsx
  import dotenv from "dotenv";
  dotenv.config();
  ```

Luego, esta clave se puede referir dentro de los archivos como `process.env.EXM_PK` sin exponerla ni subirla a sistemas de control de versiones como GitHub.