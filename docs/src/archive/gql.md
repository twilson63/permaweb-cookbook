# Complete GraphQL Structure for Transactions
The following GraphQL query returns all of the properties of a transaction captured by the indexing service.

```graphql:no-line-numbers
query {
    transactions {
        
        pageInfo { 
          hasNextPage
        }
        edges {
            cursor
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                parent {
                    id
                }
            }
        }
    }
}

```

## Pagination
By default, GraphQL queries return the first 10 results. Larger result sets can be requested by adding the `first: X` option (where `X` is a value from 1 to 100) to the transactions query.
```graphql{4}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
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
If there are more than 100 items in the result set, subsequent pages of results can be retrieved by using a cursor.
```graphql{13-15,17}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
If there are subsequent result pages `hasNextPage` will have a value of `true`. Take the `cursor` value of the last item in the result set and use it as the value for the `after` query parameter.
```graphql{5}
query
{
  transactions(
    first:100,
    after: "WyIyMDIyLTEyLTMwVDE2OjQ0OjIzLjc0OVoiLDEwMF0=",
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
To retrieve the entire results set, repeat the `after` query with an updated `cursor` value from the last item of each page until `hasNextPage` is `false`.

## Rate Limiting
Indexing services will implement rate limiting to prevent attacks and abuse of their services. The `arweave.net/graphql` service limits GraphQL queries to 600 queries every 5 minutes (per IP address). Always check the results of your queries to see if they have a status code in the 200s before parsing the response. A HTTP Status code of 429 will indicate rate limiting is being enforced. A HTTP Status code of 503 usually indicates that the query result set is too large for `arweave.net/graphql`.

## Resources
* For a more complete listing of the Arweave GraphQL schema see the [Arweave GraphQL Guide](https://gql-guide.arweave.dev)
* [ArDB package](../guides/querying-arweave/ardb.md)
* [ar-gql package](../guides/querying-arweave/ar-gql.md)
* For a general guide to graphql [graphql.org/learn](https://graphql.org/learn) is a good starting point
