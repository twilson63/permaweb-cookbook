---
locale: pt
---
# Spheron

O Protocolo Spheron é uma plataforma descentralizada projetada para simplificar a criação de dapps modernos. Ele oferece uma experiência perfeita para desenvolvedores, permitindo implantação rápida, dimensionamento automático e entrega de conteúdo personalizado em redes descentralizadas.

O Spheron usa uma integração com o GitHub para lidar com implantações contínuas e nos dá a capacidade de integrar DNS personalizado a qualquer implantação específica.

## O que você precisará para configurar uma conta no Spheron

* Uma conta no GitHub
* Um identificador de aplicativo permaweb implantado na permaweb

::: Dica
Para implantar aplicativos Arweave usando o Spheron, você precisará do Plano Pro, que custa $ 20 / mês.
:::

## Autenticação / Login

O Spheron depende de repositórios do GitHub, GitLab ou BitBucket para suas implantações, assim como o Vercel.

Para fazer login no Spheron, vá para o [painel Spheron Aqua](https://app.spheron.network/) e selecione sua autenticação preferida.

## Importar repositório

Após fazer login, você verá o painel do usuário. Clique no botão "Novo Projeto" no canto superior direito do painel para importar um repositório. Selecione o repositório desejado e escolha a opção de implantar no Arweave.

## Conectando ao DNS

Agora que você importou seu projeto e implantou, vá para a guia "Domínios". Insira o nome de domínio, o ambiente e selecione um domínio para apontar a implantação.

Antes de continuar, você será solicitado a verificar seus registros configurados. Atualize o registro no gerenciador de domínio. A atualização de um DNS pode levar até 72 horas. Você verá algo semelhante à imagem abaixo:

<img src="https://arweave.net/8BNk8spFayPCdCHx1XrsoMtMdX1-qsDYAORPJ8BNZ3Y" />

Depois de atualizar, você precisará verificar no Spheron. Clique no botão `Verificar` e você estará pronto para começar. Agora, sempre que você implantar uma nova versão no GitHub, seu domínio será atualizado com a versão mais recente!🎉

::: Dica
Para criar um aplicativo totalmente descentralizado, certifique-se de usar [ArNS](https://ar.io/arns) ou qualquer servidor DNS descentralizado.
:::

## Resumo

O Spheron é uma maneira simples de implantar aplicativos Permaweb no Arweave e redirecioná-los para domínios personalizados. Combinando integração contínua e implantação contínua, garantindo uma experiência de desenvolvedor tranquila em todos os aspectos!