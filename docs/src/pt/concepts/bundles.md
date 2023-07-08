---
locale: pt
---
# Pacotes de Transações

### O que é um Pacote?

---

Um pacote de transação é um tipo especial de transação no Arweave. Ele permite que várias outras transações e/ou itens de dados sejam agrupados dentro dele. Como os pacotes de transação contêm muitas transações aninhadas, eles são essenciais para a capacidade do Arweave de escalar para milhares de transações por segundo.

Os usuários enviam transações para um serviço de agrupamento, como o [Bundlr.network](https://bundlr.network), que as combina em um "pacote" com outras transações e as envia para a rede.

### Como os Pacotes ajudam o Arweave?

---

#### Disponibilidade

Os serviços de agrupamento garantem que as transações agrupadas sejam postadas no Arweave de forma confiável, sem quedas.

Os IDs de transação das transações agrupadas são imediatamente disponibilizados, o que significa que os dados podem ser acessados instantaneamente como se já estivessem na rede Arweave.

#### Confiabilidade

As transações postadas no Arweave ocasionalmente podem falhar em confirmar (resultando em uma transação descartada) devido a vários motivos, como alta atividade de rede. Nesses casos, as transações podem se tornar **órfãs**, ou seja, presas na mempool e, eventualmente, removidas.

Os agrupadores resolvem esse problema, continuamente tentando enviar dados agrupados para o Arweave, garantindo que não falhem ou fiquem presos na mempool.

#### Escalabilidade

Os pacotes podem armazenar até 2<sup>256</sup> transações, cada uma delas sendo liquidada como uma única transação no Arweave. Isso faz com que o espaço do bloco do Arweave possa ser escalonado para suportar praticamente qualquer caso de uso.

#### Flexibilidade

Como o agrupamento é realizado por serviços de agrupamento construídos sobre o Arweave, isso abre a possibilidade de pagamento pelo armazenamento com diferentes moedas. O [Bundlr.network](https://bundlr.network) suporta pagamentos em várias tokens (como ETH, MATIC e SOL) para o envio de dados para o Arweave.

### O que são Pacotes Aninhados?

---

Os pacotes podem incluir itens de dados para o envio ao Arweave e esses itens de dados também podem ser um pacote.

Isso significa que é possível enviar um pacote de pacotes, ou seja, **pacotes aninhados**.

Os pacotes aninhados não possuem limites teóricos na profundidade de aninhamento, o que significa que o rendimento das transações pode ser drasticamente aumentado.

Pacotes aninhados podem ser úteis quando você possui diferentes grupos de dados agrupados que deseja garantir que cheguem ao Arweave juntos e ao mesmo tempo.

Fontes e Leitura Adicional:

[Documentação do Bundlr](https://docs.bundlr.network)

[Padrão ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)