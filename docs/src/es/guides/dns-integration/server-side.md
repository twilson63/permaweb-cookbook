---
locale: es
---

# Integración de DNS en el lado del servidor

Así que tienes una aplicación de permaweb y está en el permaweb, pero también tienes un dominio específico al que quieres que los usuarios accedan a esta aplicación. mydomain.com, para conectar tu dominio a una aplicación de permaweb, tienes varias opciones, esta opción que mostraremos aquí se llama redireccionamiento en el lado del servidor. La redirección ocurre como un proxy inverso para que el usuario permanezca en mydomain.com en su navegador, mientras que detrás de escenas la aplicación se sirve desde el permaweb.

::: tip
Puedes usar cualquier proxy inverso para configurar una redirección en el lado del servidor, en esta guía usaremos deno y deno.com, un servicio de hospedaje en el borde ligero.
:::

## Lo que necesitarás para configurar un proxy inverso usando deno.com

- Una cuenta de deno.com, que actualmente es gratuita.
- Un dominio con acceso a la configuración de DNS
- Un identificador de aplicación de permaweb que está desplegado en el permaweb

## Crear un proxy en Deno.com

Deno Deploy es un sistema distribuido que se ejecuta en el borde. 35 regiones en todo el mundo. Abre tu navegador en [https://deno.com](https://deno.com) y haz clic en iniciar sesión o registrarse si no tienes una cuenta.

Haz clic en `Nuevo Proyecto` y luego en `Play`

El playground de deno nos permitirá crear un proxy sin tener que salir del navegador.

Copia el siguiente código:

```ts
import { serve } from "https://deno.land/std/http/mod.ts";

const APP_ID = "TU IDENTIFICADOR DE ARWEAVE";

const fileService = `https://arweave.net/${APP_ID}`;

// manejar solicitudes
async function reqHandler(req: Request) {
  const path = new URL(req.url).pathname;
  // proxy a arweave.net
  return await fetch(fileService + path).then((res) => {
    const headers = new Headers(res.headers);
    // instruir al servidor para aprovechar la caché en el borde
    headers.set("cache-control", "s-max-age=600, stale-while-revalidate=6000");

    // retornar la respuesta de arweave.net
    return new Response(res.body, {
      status: res.status,
      headers,
    });
  });
}

// escuchar solicitudes
serve(reqHandler, { port: 8100 });
```

Este servidor proxy recibirá solicitudes de mydomain.com y redireccionará la solicitud a arweave.net/APP_ID y luego devolverá la respuesta como si proviniera de mydomain.com. Tu APP_ID es el identificador TX_ID para tu aplicación de permaweb.

Haz clic en `Guardar y Desplegar`

## Conexión a DNS

En la configuración del proyecto, ve a la sección de dominios y haz clic en agregar un dominio.

Ingresa el dominio `mydomain.com` y sigue las instrucciones para modificar la configuración de DNS para que apunte a la red de borde de deno deploy.

Puede tomar unos minutos resolver el dns, pero una vez resuelto, tu aplicación ahora se mostrará en mydomain.com.

:tada: Felicidades, has publicado una redirección en el lado del servidor para tu aplicación de permaweb.

::: warning
Ten en cuenta que cualquier cambio en tu aplicación generará un nuevo TX_ID y deberás modificar ese TX_ID para publicar los nuevos cambios en tu dominio.
:::

## Automatización del Despliegue

Si deseas automatizar los nuevos despliegues de tu aplicación de permaweb, investiga las acciones de GitHub y utiliza la acción de GitHub para deno deploy: [https://github.com/denoland/deployctl/blob/main/action/README.md](https://github.com/denoland/deployctl/blob/main/action/README.md)

## Resumen

Las redirecciones en el lado del servidor son excelentes para proporcionar a tus usuarios una URL del Sistema de Nombres de Dominio para acceder a tu aplicación de permaweb. ¡Esperamos que hayas encontrado útil esta guía en tu viaje de desarrollo en el permaweb!
