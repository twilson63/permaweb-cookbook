---
locale: pt
---
# Portais

---

Os dados carregados para a rede Arweave (ou a [permaweb](https://cookbook.arweave.dev/concepts/permaweb.html)) nem sempre são facilmente manipuláveis ​​imediatamente.

### O que é um portal?

Os portais são às vezes chamados de "porta de entrada para a permaweb". Eles atuam como uma interface entre a Arweave e os usuários finais, facilitando o acesso a dados ou o uso de aplicativos da permaweb por meio de um navegador da web.

Por exemplo, ao acessar um arquivo HTML armazenado na Arweave, ele será exibido como uma página da web em seu navegador. O mesmo acontece ao visualizar imagens, baixar arquivos, visualizar dados JSON ou qualquer outro arquivo armazenado na Arweave. Isso torna a interação com a permaweb muito semelhante ao uso da web tradicional.

### Outras funções dos portais

Além de servir dados para que os usuários acessem, os portais oferecem outros serviços, como:

- Caching de dados e transações acessados ​​com frequência
- Indexação e consulta de transações (por meio de tags da Arweave e uma interface de GraphQl)
- Semeando transações em toda a rede Arweave
- Moderação de conteúdo (políticas de conteúdo para escolher quais dados são ou não servidos)

### Portais e o Protocolo Arweave

Embora os portais desempenhem um papel importante ao permitir que o conteúdo seja acessado na Arweave, eles **não** fazem parte do protocolo principal.

Isso significa que hospedar e executar portais é separado da execução de um nó que garante a segurança da rede Arweave (embora sejam frequentemente executados juntos).

Como os portais não fazem parte do protocolo principal, não há uma estrutura de incentivos incorporada, como as recompensas ou incentivos para mineração. Isso permite que os operadores de portais ou serviços externos escolham como desejam estruturar seu sistema de incentivos, levando a um modelo mais descentralizado e democrático. Aplicações individuais podem até mesmo operar seu próprio portal para melhorar o armazenamento em cache e o desempenho de seus aplicativos da permaweb.

Alguns portais populares incluem o [arweave.net](https://arweave.net/), administrado pela equipe da Arweave, e outros como [arweave.live](https://arweave.live/) e [g8way.io](https://g8way.io). No entanto, a operação de portais está se tornando mais fácil e acessível por meio de equipes como a [AR.IO](https://ar.io/).

### Fontes e Leitura Adicional

- [ArWiki](https://arwiki.wiki/#/en/gateways)
- [AR.IO](https://ar.io/)