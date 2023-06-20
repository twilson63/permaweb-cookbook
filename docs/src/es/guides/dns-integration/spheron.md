---
locale: es
---
# Spheron

El Protocolo Spheron es una plataforma descentralizada diseñada para agilizar la creación de aplicaciones modernas. Ofrece una experiencia sin problemas para los desarrolladores, permitiendo implementaciones rápidas, escalabilidad automática y entrega de contenido personalizado en redes descentralizadas.

Spheron utiliza una integración con GitHub para manejar las implementaciones continuas y nos da la capacidad de integrar DNS personalizados a cualquier implementación dada.

## Lo que necesitarás para configurar una cuenta de Spheron

* Una cuenta de GitHub
* Un identificador de aplicación Permaweb desplegada en Permaweb.

::: tip
Para desplegar aplicaciones de Arweave utilizando Spheron, necesitarás el Plan Pro que cuesta $20 al mes.
:::

## Autenticación / Iniciar sesión

Spheron se basa en los repositorios de GitHub, GitLab o Bitbucket para sus implementaciones, al igual que Vercel.

Para iniciar sesión en Spheron, ve al [panel de control de Spheron Aqua](https://app.spheron.network/) y selecciona tu autenticación preferida.

## Importar repositorio

Una vez que hayas iniciado sesión, se te presentará el panel de usuario. Haz clic en el botón "Nuevo proyecto" en la esquina superior derecha del panel para importar un repositorio. Selecciona el repositorio que deseas y elige la opción de implementar en Arweave.

## Conectar a DNS

Ahora que has importado tu proyecto y lo has implementado, ve a la pestaña "Dominios". Ingresa el nombre de dominio, el entorno y selecciona un dominio al que apuntar la implementación.

Antes de continuar, se te pedirá que verifiques tus registros configurados. Actualiza el registro en tu administrador de dominio. La actualización de un DNS puede tardar hasta 72 horas. Verás algo similar a la imagen a continuación:

<img src="https://arweave.net/8BNk8spFayPCdCHx1XrsoMtMdX1-qsDYAORPJ8BNZ3Y" />

Una vez actualizado, deberás verificarlo en Spheron. Haz clic en el botón "Verificar" y deberías estar listo para continuar. ¡Ahora, cada vez que implementes una nueva versión en GitHub, tu dominio se actualizará con la versión más reciente!🎉

::: tip
Para crear una aplicación completamente descentralizada, asegúrate de usar [ArNS](https://ar.io/arns) o cualquier servidor DNS descentralizado.
:::

## Resumen

Spheron es una forma sencilla de implementar aplicaciones Permaweb en Arweave y redirigirlas a dominios personalizados. ¡Combina la integración continua y la implementación continua, garantizando una experiencia de desarrollo fluida en general!