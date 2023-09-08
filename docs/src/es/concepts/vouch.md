---
locale: es
---



# Vouch
## Introducción
#### Protocolo Vouch
Arweave introdujo el concepto del ANS-109 Vouch (Afirmación de Identidad). Es un estándar que usa un formato específico de transacción junto con algunas etiquetas para permitir que cualquiera en el permaweb "vouch" (certifique) la identidad y humanidad de cualquier dirección de Arweave.

Añadir un estándar como el ANS-109 al permaweb ayudará a minimizar los ataques de Sybil y los malos actores, haciendo de la experiencia en el permaweb una más segura para sus usuarios. 

#### VouchDAO
VouchDAO es una capa de verificación descentralizada liderada por la comunidad y construida sobre el estándar Vouch. Los desarrolladores crean servicios de vouches y los miembros de la comunidad VouchDAO votan sobre cuáles de estos servicios de verificación son dignos de confianza. 

Una vez que se crea un nuevo servicio, la dirección para esto se pondrá a votación en la interfaz de [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk). Si esa votación es aprobada, entonces se añade como un Voucher verificado.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## Cómo Funciona
Los desarrolladores tienen la capacidad de crear diferentes servicios Vouch para atestiguar sobre los billeteras de Arweave basándose en un conjunto determinado de requisitos. Un ejemplo actual de esto es el servicio Twitter, que es el primer servicio de vouchear el cual ha certificado ya más de 180 direcciones de Arweave hasta el momento. 

El estado del contrato inteligente de VouchDAO posee un atributo `vouched` (certificado). Este estado se actualiza siempre que un usuario se verifica. El objeto `vouched` (certificado) almacena una lista de direcciones certificadas siguiendo el siguiente formato: 
```
VOUCH_USER_ADDRESS:[
  {
    service:"SERVICE_ADDRESS_1"
    transaction:"TX_ID"
  },
   {
    service:"SERVICE_ADDRESS_2"
    transaction:"TX_ID"
  }
]
```

Los usuarios que se verifican recibirán el token ANS-109 en su billetera para indicar que dicha billetera ha sido certificada por ese servicio.

## Formato de Transacción ANS-109 
| Nombre de etiqueta | _Opción?_ | Valor de etiqueta |
|---|---|---|
|Nombre de aplicación| Falso |`Vouch`|
|Vouch-For|Falso|Dirección de Arweave que se está certificando en esta transacción|
|Versión de aplicación|Verdadero|`0.1`|
|Método de verificación|Verdadero|Método de verificación de la identidad por parte de la persona. Ejemplo: `Twitter`/`En persona`/`Gmail`/`Facebook`|
|Identificador de usuario|Verdadero|Un identificador para el usuario basado en el Método de Verificación. Ejemplo - `abhav@arweave.org`|

## Recursos
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Contrato de VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)