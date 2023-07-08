---
locale: pt
---
# Manifestos de Caminho

## Visão geral

Ao fazer o upload de arquivos para o Arweave, cada arquivo recebe seu próprio ID de transação exclusivo. Por padrão, esses IDs não são agrupados ou organizados de nenhuma maneira específica.

Uma foto do seu gato pode ser armazenada com um ID de transação [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw), enquanto outra com [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0) como seu ID de transação.

| Gato1 | Gato2 |
|-------|-------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300"> | <img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

Esses IDs de transação são um pouco difíceis de serem manipulados e dificultam a localização de todos os seus arquivos relevantes. Sem um manifesto de caminho, se você carregasse 100 fotos do seu gato, precisaria acompanhar **100 IDs e links diferentes!**

Manifestos de Caminho são uma maneira de vincular várias transações a um único ID de transação base e atribuir-lhes nomes de arquivo legíveis por humanos. Em relação ao exemplo do gato, você pode ter um único ID de transação base para lembrar e usá-lo como uma pasta - acessando suas fotos de gato com nomes de arquivo mais memoráveis como [{id base}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{id base}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg), etc.

A criação de conjuntos agrupados de nomes de arquivo legíveis é essencial para criar aplicações práticas no Arweave e permite hospedar sites ou outras coleções de arquivos, conforme explorado nos exemplos abaixo.

### Para que você pode usar manifestos?

---

Sempre que você precisar agrupar arquivos de maneira hierárquica, os manifestos podem ser úteis. Por exemplo:

- **Armazenamento de coleções NFT:**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

Isso espelha a abordagem comum de caminho de base usada por coleções NFT ao vincular imagens NFT e metadados em uma API de armazenamento ou IPFS.

- **Hospedagem de sites:**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png

### Estrutura de Manifesto

---

Manifestos de Caminho são um formato especial de transação criada e publicada no Arweave usando as Tags:

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

e possuem dados de transação formatados em JSON que correspondem ao exemplo abaixo.

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

Fonte e leitura adicional na documentação oficial de Manifestos de Caminho do Arweave: [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)