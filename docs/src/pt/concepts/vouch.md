---
locale: pt
---
# Vouch
## Visão geral
#### Protocolo Vouch
Arweave introduziu o conceito do ANS-109 Vouch (Assertor de Identidade). É um padrão que usa um formato de transação específico juntamente com algumas tags para permitir que qualquer pessoa na permaweb "atesta" a identidade e humanidade de qualquer endereço Arweave.

Adicionar um padrão como o ANS-109 à permaweb ajudará a minimizar ataques Sybil e comportamentos maliciosos, tornando a experiência dos usuários da permaweb mais segura.

#### VouchDAO
VouchDAO é uma camada de verificação descentralizada liderada pela comunidade construída em cima do padrão Vouch. Os desenvolvedores criam serviços de atestação e os membros da comunidade VouchDAO votam em quais desses serviços de verificação são considerados confiáveis.

Assim que um novo serviço for criado, o endereço dele será colocado em votação na interface [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk). Se essa votação for aprovada, ele será adicionado como um Voucher verificado.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## Como funciona
Os desenvolvedores têm a capacidade de criar diferentes serviços Vouch para atestar a carteira Arweave de um usuário com base em um conjunto específico de requisitos. Um exemplo atual disso é o serviço do Twitter, que é o primeiro serviço Vouch, e que já atestou mais de 180 endereços Arweave até o momento.

O estado do contrato inteligente VouchDAO possui um atributo chamado `vouched`. Esse estado é atualizado sempre que um usuário é verificado. O objeto `vouched` armazena uma lista de endereços atestados no seguinte formato:
```
ENDEREÇO_USUÁRIO_ATESTADO:[
  {
    service:"ENDEREÇO_SERVIÇO_1"
    transaction:"ID_TX"
  },
   {
    service:"ENDEREÇO_SERVIÇO_2"
    transaction:"ID_TX"
  }
]
```

Os usuários verificados receberão o token ANS-109 enviado para sua carteira para indicar que a carteira foi atestada por aquele serviço.

## Formato da transação ANS-109
| Nome da Tag | _Opcional?_ | Valor da Tag |
|---|---|---|
|App-Name|False|`Vouch`|
|Vouch-For|False|Endereço Arweave que está sendo atestado nesta transação|
|App-Version|True|`0.1`|
|Verification-Method|True|Método de verificação de identidade da pessoa. Exemplo - `Twitter`/`Pessoalmente`/`Gmail`/`Facebook`|
|User-Identifier|True|Um identificador para o usuário com base no método de verificação. Exemplo - `abhav@arweave.org`|

## Recursos
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Contrato VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)