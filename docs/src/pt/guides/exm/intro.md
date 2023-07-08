---
locale: pt
---
# Máquina de Execução (EXM)

**A Máquina de Execução (EXM)** é uma plataforma de desenvolvedor que oferece a capacidade de criar e aproveitar **funções baseadas em blockchain (permanentes) sem servidor** sem a necessidade de conhecimento ou acesso a tecnologias blockchain como carteiras e tokens.

Isso permite ainda mais a criação de aplicativos **componíveis**, **imutáveis** e **descentralizados** de maneira livre de atritos.

## Funções sem servidor em Arweave

As funções sem servidor são armazenadas no Arweave por meio do intermediário EXM, que também armazena uma cópia em cache para servir rapidamente os aplicativos a qualquer momento. As funções possuem estado (armazenam dados) e, portanto, um único ID da função aponta para alguns dados, bem como a lógica para interagir e atualizar esses dados.

A EXM lida com o armazenamento e a execução, eliminando a necessidade de manter um servidor dedicado, reduzindo os custos de manutenção e adicionando uma camada de modularidade.

A modularidade também traz a componibilidade para selecionar e montar funções em várias combinações para criar aplicativos personalizados adequados às nossas necessidades. Essas funções, e as interações com elas, são **armazenadas permanentemente na cadeia**, não podem ser adulteradas e estão disponíveis para qualquer pessoa visualizar, tornando-as **imutáveis** e **descentralizadas**.

Além disso, a EXM cobre o custo de upload dos dados para o Arweave e torna o processo criptograficamente agnóstico para os desenvolvedores.

![Funções em servidores dedicados vs funções sem servidor em blockchains](~@source/images/exm-serverless-functions.png)

## Como funciona nos bastidores?

Um usuário envia uma solicitação de transação para um servidor EXM dedicado. Com a ajuda da Computação Verificável, a Máquina de Execução é capaz de processar solicitações de usuários de maneira rápida e eficiente, eliminando a necessidade de tecnologia blockchain como tokens e carteiras, mantendo ainda um resultado descentralizado. A EXM então atualiza sua camada de cache com o estado atualizado, ao mesmo tempo que faz o upload dos dados para o Arweave. A camada de cache é usada como auxílio para servir rapidamente os aplicativos a qualquer momento.

Além disso, a EXM consegue manter um ambiente minimamente confiável, pois os usuários podem verificar as transações e o estado atual do contrato/funções usando a Avaliação Preguiçosa.

<details>
<summary><strong>Explicação da Computação Verificável</strong></summary>

<strong>A computação verificável</strong> é uma forma de computação que aproveita os benefícios de um sistema centralizado, garantindo ainda um resultado descentralizado.

Cada função sem servidor tem a capacidade de ler ou atualizar o estado de alguma informação. Usando a computação verificável, esse estado é armazenado em cache em um servidor centralizado, o que permite melhor desempenho, já que não é necessário consenso durante o processamento, mas a informação está sempre disponível para verificação pelos usuários. Isso permite que os usuários façam uma "avaliação preguiçosa", mesmo quando ela está armazenada na camada de cache antes de ser movida para a cadeia.

![Explicação da Computação Verificável](~@source/images/exm-verifiable-computing.png)

Para que a computação verificável funcione perfeitamente, algumas partes principais devem ser implementadas.

- <strong>Executor</strong>: Um software que processa as solicitações de transação do usuário e as armazena em cache.
- <strong>Processor</strong>: Um pipeline (sistema) centralizado responsável por receber transações de um único ou vários usuários. Após receber os diferentes blocos de transações enviadas, o processador deve reavaliar o contrato inteligente com os novos dados. À medida que as transações são recebidas, o estado mais recente do contrato inteligente deve ser atualizado e salvo com acessibilidade ao usuário. O processador é responsável por ordenar as transações, geralmente por data e hora.
- <strong>Conveyor</strong>: Um sistema centralizado que estabelece uma ponte entre um blockchain baseado em banco de dados. Todas as transações recebidas pelo processador devem ser enviadas para o transportador, que garantirá o armazenamento dessas operações em um blockchain baseado em banco de dados, como o Arweave.
</details>
<br/>

<details>
<summary><strong>Explicação da Avaliação Preguiçosa</strong></summary>

![Explicação da Avaliação Preguiçosa](~@source/images/exm-lazy-evaluation.png)

<strong>Avaliação preguiçosa</strong>, como o próprio nome sugere, é um método para avaliar preguiçosamente contratos inteligentes e seu estado atual no blockchain. O próprio contrato inteligente e quaisquer interações (operações de gravação) com eles são armazenados na cadeia e podem ser acessados por qualquer usuário.

O objetivo é transferir o ônus do processamento dos nós para os usuários. O usuário pode optar por avaliar e interpretar o código do contrato inteligente e as interações com ele localmente para verificar o estado atual do contrato.

Isso elimina a necessidade de os nós armazenarem uma cópia completa do estado atual de uma cadeia e chegarem a um consenso sobre ele. Isso reduz o custo e melhora o desempenho, respectivamente.

Como todos têm acesso aos mesmos dados, todos os interpretarão da mesma forma, garantindo que todos tenham acesso ao mesmo estado atual das informações.
</details>
<br/>

## Vantagens de usar Funções sem Servidor

- As funções sem servidor adicionam uma camada de modularidade e podem ser compostas de acordo com vários requisitos de aplicativos.
- Correções de bugs e integrações de novos recursos são mais fáceis de implementar por segmentação.
- A Máquina de Execução possui uma camada de cache para servir rapidamente os aplicativos.
- A Máquina de Execução utiliza um sistema centralizado enquanto garante um resultado descentralizado.
- A Máquina de Execução busca ser criptoagnóstica.