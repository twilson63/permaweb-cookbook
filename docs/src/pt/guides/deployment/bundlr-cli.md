---
locale: pt
---
# CLI Bundlr

## Requisitos
É necessário possuir uma carteira Arweave para efetuar o deploy. Se o tamanho do diretório for maior que 100kb, é necessário possuir uma instância Bundlr financiada.

## Instalação

Para instalar o Bundlr CLI, execute o comando:

<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @bundlr-network/client
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @bundlr-network/client
```
  </CodeGroupItem>
</CodeGroup>


## Build Estático
Aplicações de Permaweb são geradas de forma estática, o que significa que o código e o conteúdo são gerados antecipadamente e armazenados na rede.

Abaixo está um exemplo de um site estático. Para implantá-lo no Permaweb, o diretório `build` será passado como argumento para a flag `upload-dir`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## Deploy

```console
bundlr upload-dir [caminho para a pasta] -w [caminho para a carteira] --index-file [index.html] -c [moeda] -h [nó Bundlr]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Outros Comandos

#### Financiar Bundlr

```console
bundlr fund [valor] -h [nó Bundlr] -w [caminho para a carteira] -c [moeda]
```
<sub style="float:right">\* Financiar uma instância Bundlr pode levar até 30 minutos para ser processado</sub>

#### Verificar Saldo do Bundlr
```console
bundlr balance [endereço da carteira] -h [nó Bundlr] -c arweave
```