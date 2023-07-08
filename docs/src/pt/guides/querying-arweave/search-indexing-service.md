---
locale: pt
---
# Serviço de Indexação de Pesquisa

tl;dr

- Sintaxe compatível com o GraphQL do Arweave
- Tempos de resposta mais rápidos para consultas complexas (por exemplo, pesquisa de tags múltiplas)
- Mais opções de consulta
---

O serviço de pesquisa gratuito da [Goldsky](https://goldsky.com) utiliza um backend otimizado que permite pesquisas mais rápidas para consultas complexas em blocos e transações do arweave, e também introduz sintaxe adicional de consulta para casos de uso de pesquisa difusa e com caracteres coringa.

A sintaxe de pesquisa GraphQL é uma superconjunto da [sintaxe GraphQL do Arweave](./queryingArweave.md). É totalmente compatível com versões anteriores e retornará os mesmos resultados para as mesmas consultas, mas possui alguns modificadores adicionais que podem ser úteis.

- Filtros de tag flexíveis
  - Pesquise apenas por nome ou valor da tag
- Filtros de tag avançados
  - Pesquisa difusa
  - Pesquisa com caracteres coringa
- Filtrar apenas transações L1

Para necessidades ou ideias de recursos personalizados, não hesite em entrar em contato com a equipe da Goldsky por e-mail ou no Discord!

## Pontos Finais do Gateway de Pesquisa

Atualmente, a única versão desta sintaxe está hospedada na Goldsky. Se alguém tiver interesse em hospedar seu próprio gateway com a mesma sintaxe, sinta-se à vontade para entrar em contato com a equipe da [Goldsky](https://goldsky.com) para obter ajuda.

- [Serviço de Pesquisa Goldsky](https://arweave-search.goldsky.com/graphql)

## Recursos

### Filtros de Tag Flexíveis

A Sintaxe do Gateway de Pesquisa é menos restrita e permite pesquisar apenas pelo nome ou valor da tag.

#### Exemplos

Pesquisar transações com o valor da tag 'cat'

```graphql:no-line-numbers
query somente_valores {
  transactions(
    first: 10,
    tags: [
      {
        values: ["cat"]
      }
    ]
  ) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```

Pesquisar transações que possuem uma tag `In-Response-To-ID`

```graphql:no-line-numbers
query somente_nome {
  transactions(
    first: 10,
    tags: [
      {
        name: "In-Response-To-ID"
      }
    ]
  ) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```


### Filtros de Tag Avançados

A Sintaxe do Gateway de Pesquisa oferece um parâmetro adicional para o filtro de tag, `match`.

| Valor de Combinação | Descrição | 
|-------------|-------------|
| EXATO | (padrão) somente correspondências exatas. |
| CARACTER_CORINGA | Permite * para corresponder a qualquer quantidade de caracteres, ou seja, `text/*` |
| DIFUSO_E | Correspondência difusa contendo todos os termos de pesquisa |
| DIFUSO_OU | Correspondência difusa contendo pelo menos um termo de pesquisa |

Abra o playground e experimente algumas das consultas a seguir!

Pesquisando todas as transações com um tipo de conteúdo de imagem usando um caractere coringa
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: "image/*", match: WILDCARD}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### Pesquisa Difusa

A pesquisa difusa é muito poderosa e pode buscar texto 'similar' com muitas variações.

Pesquisando todas as transações com 'cat' OU 'dog' (ou CAT ou doG ou cAts ou CAAts, etc.). Portanto, a tag poderia conter pelo menos um termo semelhante a um gato ou a um cachorro.

```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_OR"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

Pesquisar transações que possuam valores de tag semelhantes a gatos E cachorros
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_AND"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### Excluir Transações Agrupadas (L2)

Basta definir `bundledIn: NULL`

```graphql:no-line-numbers
query apenas_l1 {
  transactions(
    first: 10,
    bundledIn: null
  ) 
  {
    edges {
      node {
        id
        signature
        owner {
          address
        }
        block {
          height
        }
      }
    }
  }
}
```