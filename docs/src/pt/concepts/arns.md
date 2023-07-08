---
locale: pt
---
# ArNS - Sistema de Nomes Arweave
## Visão geral
O Sistema de Nomes Arweave (ArNS) é a agenda telefônica alimentada pelo Smartweave da PermaWeb.  

É um sistema de nomes descentralizado e resistente à censura, habilitado pelos Gateways AR.IO e usado para conectar nomes amigáveis a aplicativos, páginas e dados da PermaWeb.

Esse sistema funciona de forma semelhante ao DNS tradicional, onde um usuário pode comprar um nome em um registro e os servidores de nomes DNS resolvem esses nomes em endereços IP.  

Com o ArNS, o registro é descentralizado, permanente e armazenado no Arweave (com Smartweave) e cada gateway AR.IO atua como cache e resolvedor de nomes. Os usuários podem registrar um nome dentro do Registro ArNS, como "meu-nome" e definir um ponteiro para qualquer ID de transação Arweave. Os Gateways AR.IO resolverão esse nome como um de seus próprios subdomínios, por exemplo, https://laserilla.arweave.net e encaminharão todas as solicitações para o respectivo ID de transação Arweave associado. Cada nome registrado também pode ter subnomes associados a ele, que apontam para um ID de transação Arweave, por exemplo, https://v1_laserilla.arweave.net, proporcionando ainda mais flexibilidade e controle ao proprietário.

## O Registro ArNS
<!-- // TODO: link para o conceito smartweave // -->

O ArNS usa o protocolo Smartweave para gerenciar seus registros de nomes. Cada registro, ou nome, é alugado por um usuário e vinculado a um token ANT. É possível registrar vários nomes ArNS em um único ANT, mas não é possível registrar vários ANTs em um único nome ArNS - os gateways não saberiam para onde apontar o ID de roteamento.

Os nomes ArNS podem ter até 32 caracteres, incluindo números [0-9], letras [a-z] e traços [-]. Os traços não podem ser terminais, por exemplo, -meunome.

## ANTs (Tokens de Nome Arweave)

ANTs são uma parte crucial do ecossistema ArNS - eles são a chave real para possuir um nome ArNS. Quando você registra um nome ArNS em um ANT, o ANT se torna o método de transferência desse nome. O registro ArNS não se importa com quem possui o ANT, ele apenas sabe a que nome o ANT pertence.

Dentro dos ANTs, você pode desenvolver qualquer funcionalidade desejada, dentro do escopo da lista de transações de código-fonte aprovadas pelo registro ArNS. Isso inclui NFTs, PSTs, DAOs ou até mesmo aplicativos completos.

## Subnomes

Subnomes são registros mantidos e gerenciados pelo seu ANT (Token de Nome Arweave). Esses registros podem ser criados e gerenciados mesmo sem possuir um nome ARNS e serão transferidos junto com o ANT quando enviado para um novo proprietário. Da mesma forma, se o seu nome ArNS expirar e você registrar seu ANT em um novo nome ArNS, todos os seus subnomes permanecerão intactos.

Exemplo: você possui oldName.arweave.net. 

então: Você cria o subnome "meu" - meu_oldName.arweave.net.

então: oldName.arweave.net expira e você registra newName.arweave.net para o seu ANT.

agora: o subnome "meu_" está acessível em newName - meu_newName.arweave.net. 

Abaixo está um exemplo de um contrato de Estado ANT:

```json
{
  "saldos": { "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ": 1 },
  "controlador": "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  "evoluir": null,
  "nome": "ArDrive OG Logo",
  "proprietário": "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  "registros": {
    "@": { "IDtransação": "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    "subnome1": { "IDtransação": "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  "ticker": "ANT-ARDRIVE-OG-LOGO"
}
```
o registro base "@" é o ID de roteamento inicial para o ANT. se você registrou 'meu-nome' neste ANT e tentasse acessá-lo via meu-nome.arweave.net, você seria redirecionado para o ID de transação do registro "@".

se você tentasse acessar subnome1_meu-nome.arweave.net, obteria o ID de transação de 'subnome1'. 

ANTs, teoricamente, podem ter um número ILIMITADO de subnomes. No entanto, quantos serão atendidos depende do nível usado com o nome ArNS.