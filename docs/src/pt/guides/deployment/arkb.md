---
locale: pt
---
# arkb

## Requisitos
É necessário ter uma carteira Arweave para implantar usando o `arkb` para cobrir os custos de transação de dados.

## Instalação

Para instalar o `arkb`, execute
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g arkb
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```
  </CodeGroupItem>
</CodeGroup>

## Implantação

Ao fazer upload de um diretório de arquivos ou de um aplicativo Permaweb, por padrão o `arkb` implanta cada arquivo separadamente como uma transação L1, com a opção de agrupar as transações usando Bundlr.

## Build Estático
Os aplicativos Permaweb são gerados estaticamente, o que significa que o código e o conteúdo são gerados antecipadamente e armazenados na rede.

Abaixo está um exemplo de um site estático. Para implantá-lo no Permaweb, o diretório `build` será passado como argumento para a opção `deploy`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### Implantação Padrão

A implantação como uma transação L1 pode levar mais tempo para ser confirmada, pois é carregada diretamente na rede Arweave.

```console
arkb deploy [diretório] --carteira [caminho para a carteira]
```
<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### Implantação Agrupada
Para implantar usando Bundlr, você precisará <a href="#fornecer-fundos-para-o-bundlr">fornecer fundos para um nó Bundlr</a>.

O node2 do Bundlr permite transações gratuitas abaixo de 100kb.

Você pode adicionar tags identificáveis personalizadas à implantação usando a sintaxe `nome-tag/valor-tag`. 

```console
arkb deploy [diretório] --use-bundler [nó Bundlr] --carteira [caminho para a carteira] --nome-tag [nome da tag] --valor-tag [valor da tag]
```
<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## Outros Comandos

#### Fornecer Fundos para o Bundlr

```console
arkb fund-bundler [valor] --use-bundler [nó Bundlr]
```

<sub style="float:right">\* O financiamento de uma instância do Bundlr pode levar até 30 minutos para ser processado</sub>
#### Salvar Arquivo de Chave

```console
arkb wallet-save [caminho para a carteira]
``` 

Após salvar sua chave, você pode executar comandos sem a opção --wallet-file, como este

```console
arkb deploy [caminho para o diretório]
```

#### Verificar Saldo da Carteira
```console
arkb balance
```