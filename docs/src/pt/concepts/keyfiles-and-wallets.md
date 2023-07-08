---
locale: pt
---
# Carteiras e Chaves

---

### Carteiras Arweave

Na Arweave, uma carteira garante um endereço único no blockchain. O endereço é usado para rastrear o saldo do $AR e interagir com a rede Arweave - como enviar transações ou interagir com [SmartWeave Contracts](../guides/smartweave/warp/intro.md).

Como na maioria dos blockchains, o conceito de carteira na Arweave é um pouco enganoso.

Uma carteira não "possui" nenhum token em si; os saldos dos tokens são armazenados no blockchain e vinculados ao endereço da carteira. Em vez disso, uma carteira armazena o par de chaves criptográficas público-privadas que podem ser usadas para assinar transações para publicar dados ou transferir tokens. O proprietário da carteira (a pessoa com acesso à **chave privada** da carteira) é a única pessoa que pode assinar transações para o endereço e acessar seus fundos. 

### Par de Chaves e Formato da Carteira

A Arweave usa pares de chaves *4096 bit* RSA-PSS armazenados no formato JWK (JSON Web Keys). O formato JWK pode ser usado para armazenar muitos tipos de chaves criptográficas, não apenas pares de chaves RSA.

Aqui está o conteúdo de um arquivo JWK que descreve um par de chaves RSA-PSS. Os valores estão abreviados para que não sejam usados acidentalmente como remetente ou destinatário de uma transação na blockchain. Ao armazenar pares de chaves RSA-PSS, o valor associado a `n` no JWK é a **chave pública** de sua carteira e pode ser compartilhado com segurança sem comprometer a segurança da sua carteira.

```json
{
	"d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
	"dp": "DezP9yvB13s9edjhYz6Dl...",
	"dq": "SzAT5DbV7eYOZbBkkh20D...",
	"e": "AQAB",
	"ext": true,
	"kty": "RSA",
	"n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
	"p": "5ht9nFGnpfW76CPW9IEFlw...",
	"q": "tedJwzjrsrvk7o1-KELQxw...",
	"qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

A sua **chave privada** também é armazenada no JWK, principalmente sob o valor associado a `d`, mas também é parcialmente derivada de alguns dos outros valores no JWK. A **chave privada** é como a senha da sua carteira - que pode ser usada para criar assinaturas digitais (como assinar transações) ou para descriptografar dados.

Esses JWKs são arquivos `json` reais criados e exportados de um aplicativo de carteira como o [Arweave.app](https://arweave.app) ou gerados através de código usando [arweave-js](https://github.com/ArweaveTeam/arweave-js).

Ao usar um aplicativo de carteira para gerar seu par de chaves, a sua **chave privada** também pode ser representada como uma **frase de sementes** mnemônica, que em alguns casos pode ser usada como uma alternativa para assinar transações e/ou recuperar sua carteira.

### Segurança da Carteira

A sua **chave privada** deve ser mantida confidencial o tempo todo, pois ela tem a capacidade de transferir tokens do seu endereço para o de outras pessoas. Como desenvolvedor, certifique-se de não incluir o arquivo de chave em nenhum repositório público do GitHub ou hospedá-lo em qualquer outro lugar publicamente.

### Endereços de Carteira

Curiosamente, o endereço da sua carteira é derivado da sua **chave pública**. Embora seja seguro compartilhar sua **chave pública** com outras pessoas, uma **chave pública** de *4096 bit* é um pouco grande para compartilhar convenientemente. Para reduzir essa sobrecarga e tornar os endereços de carteira um pouco mais legíveis para as pessoas, o hash `SHA-256` da **chave pública** é codificado em `Base64URL` e usado como endereço da carteira. Isso vincula de forma segura e determinística um endereço de carteira único de 43 caracteres à **chave pública** da carteira e fornece uma forma conveniente para que qualquer pessoa com a **chave pública** possa verificá-la.

### Carteiras

[Arweave.app](https://arweave.app/welcome) - Carteira web da Arweave para implantar dados permanentes, conectar suas contas com segurança a aplicativos descentralizados e navegar na rede.

[ArConnect](https://www.arconnect.io/) - Extensão de navegador para Carteira Arweave

### Fontes e Leitura Adicional:
[Arweave Docs](https://docs.arweave.org/developers/server/http-api#key-format)

[JSON Web Key Format (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)