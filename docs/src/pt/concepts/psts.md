---
locale: pt
---
# Visão Geral

---

Os Profit Sharing Tokens (PSTs) são um tipo de SmartWeaveToken que incluem a seguinte estrutura:

| propriedade  | tipo        |
| ------------ | ----------- |
| saldos       | objeto      |
| nome         | string      |
| símbolo      | string      |
| transferir   | método      |
| saldo        | método      |

Os PSTs são normalmente usados para governar um protocolo ou "Comunidade de Compartilhamento de Lucros" (PSC) - similar a um DAO.

### Como os PSTs são distribuídos?

---

Os fundadores de um aplicativo podem criar um número definido de PSTs e distribuí-los conforme considerarem adequado - para manter ou vender para investidores para levantar capital.

Os protocolos podem oferecer PSTs como recompensa por contribuição de trabalho ou conclusão de tarefas para a comunidade, visando incentivar o crescimento.

Os PSTs também podem ser trocados entre si na [Permaswap](https://permaswap.network/#/) (atualmente em testnet), e os desenvolvedores podem configurar permissões de negociação de tokens usando o [Verto Flex](https://github.com/useverto/flex).

### Recursos

---

Os PSTs funcionam como "micro-dividendos". Quando um protocolo é utilizado, uma quantia em gorjeta é separada para ser distribuída entre os titulares. A gorjeta é paga em $AR - **não** na moeda do PST. Isso cria uma relação bastante especial entre o aplicativo sendo desenvolvido e a própria Arweave.

### Benefícios

---

- Oferece uma maneira flexível para os desenvolvedores executarem um protocolo e distribuírem a "propriedade" conforme considerarem adequado
- Os PSTs podem ser usados como pagamento por trabalhos de protocolo ou por tarefas da comunidade
- Os fundadores têm incentivos para aumentar o uso da rede, uma vez que isso está diretamente relacionado à receita
- Os titulares recebem um valor **intrínseco** (recompensas em $AR, não mais "ações")

### Exemplo de PST: Token ARDRIVE

---

O ArDrive é um aplicativo na permaweb que utiliza seu PST, devidamente chamado de ARDRIVE.

Quando alguém paga $AR para fazer upload de dados por meio do ArDrive, uma taxa de comunidade de 15% é distribuída para um único titular de token usando um método aleatório e ponderado.

![Ciclo do PST do ArDrive](~@source/images/ardrive-pst.png)

Um usuário faz upload de dados -> Um titular de token ARDRIVE recebe $AR -> O titular de token ARDRIVE pode usar esse $AR para fazer upload de arquivos -> o ciclo se repete. Espero que isso lhe dê uma boa ideia de como você pode implementar seu próprio PST!

### Explorando os PSTs

---

Ir diretamente para o ViewBlock e o Sonar da Redstone é provavelmente o mais apropriado. Apenas use links que mostrem especificamente os PSTs, para que a pessoa não precise procurá-los.

Você pode usar o [ViewBlock](https://viewblock.io/arweave) para ter uma experiência semelhante ao etherscan ao visualizar contratos de PST, como este [aqui](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

Outra opção é o Sonar, um explorador de contratos inteligentes da Arweave desenvolvido pela [RedStone Finance](https://sonar.redstone.tools/#/app/contracts). Visualize o mesmo contrato [aqui](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).


> Alguns membros da comunidade têm discutido chamar os PSTs de "Permaweb Service Tokens". Ainda há muito a explorar com os PSTs → participe da discussão [aqui](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734) (Discord).