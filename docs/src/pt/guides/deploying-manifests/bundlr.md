---
locale: pt
---
### Bundlr CLI

---

`bundlr upload-dir <folder>` faz o upload de um diretório local para o Arweave e gera automaticamente um manifesto para os arquivos.

Se você deseja fazer o upload do seu próprio arquivo de manifesto manualmente, usando a flag `--content-type "application/x.arweave-manifest+json"` em qualquer transação irá designá-la como uma transação de manifesto.

### Bundlr JS Client

---

Usando o trecho a seguir, você pode fazer o upload de um diretório local para o Arweave e gerar automaticamente um manifesto para os arquivos:

```js
await bundlr.uploadFolder("./caminho/para/diretório", {
     indexFile: "./arquivoIndex.html", // arquivo index opcional (arquivo que o usuário irá carregar ao acessar o manifesto)
     batchSize: 50, // número de itens a serem enviados de uma vez
     keepDeleted: false   // se deseja manter itens previamente excluídos de envios anteriores
    }) // retorna o ID do manifesto
```

Se você deseja fazer o upload do seu próprio arquivo de manifesto manualmente, `await bundlr.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` irá designar o `data` enviado como uma transação de manifesto.

---

Fonte e Leitura Adicional: [Documentação do Bundlr](https://docs.bundlr.network/docs/overview)