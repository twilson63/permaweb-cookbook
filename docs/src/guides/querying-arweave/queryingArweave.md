# Querying Arweave with GraphQL
Arweave provides a simple way of querying for transactions and filtering them by [tags](../concepts/tags.md). Arweave GraphQL-compatible indexing services provide endpoints users can post GraphQL queries to, and also provide a playground for trying queries.

[GraphQL](https://graphql.org) is a flexible query language that services can use to build a customized data schema for clients to query. GraphQL also allows clients to specify which elements of the available data structure they would like to see in the results.

## Public Indexing Services

- [arweave.net graphql](https://arweave.net/graphql) the original graphql endpoint, managed by [ar.io](https://ar.io)
- [goldsky search service](https://arweave-search.goldsky.com/graphql) a public service specifically optimized for search using a superset of the graphql syntax, managed by [goldsky](https://goldsky.com)
- [ar.io decentralized indexing](https://ar-io.dev/graphql) A decentralized network for indexing services. Currently in testing with L1 transactions available.

## Executing a GraphQL Query
To query arweave we’ll need to access it through an indexing service that supports GraphQL. Use one of the GraphQL playgrounds listed above to get started!

Copy and paste in the following query
```graphql:no-line-numbers
query {
  transactions(tags: [{
    name: "App-Name",
    values: ["PublicSquare"]
  }]) 
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

If you’re not familiar with GraphQL it can seem a little overwhelming at first but once you know the structure, it’s fairly easy to read and understand.

```text:no-line-numbers
query { <schema type> ( <filter criteria> ) { <data structure of the results> } }
```
In the example query we pasted our `<schema type>` is `transactions` but we could also query for `blocks`. A full description of Arweave's GraphQL schema is written up in the [Arweave GraphQL Guide](https://gql-guide.arweave.dev). The guide refers to the `filter criteria` as “Query Structures” and the complete data structure definition of `transactions` and `blocks` as “Data Structures”.

When it comes to the `<data structure of the results>`, the thing to note is that you can specify a subset of the complete data structure you’re interested in. For example, the complete data structure for a transactions schema is [listed here](https://gql-guide.arweave.dev/#full-data).

In our case we’re interested in the `id` and complete list of `tags` for any transaction matching our filter criteria.

Hit the big “Play” button in the middle of the playground to run the query.

![image](https://arweave.net/rYfVvFVKLFmmtXmf8KeTvsG8avUXMQ4qOBBTZRHqVU0)

You’ll notice we get back a list of transactions in the results data structure we specified in our original query.

If you’re new to blockchains this is unexpected, we haven’t built anything, why do these results exist? It turns out, the `“PublicSquare”: “App-Name”` tag we’ve filtered for has been in use for a while.

Arweave protocol's founder, Sam Williams, proposed the transaction format a few years ago in a [github code snippet](https://gist.github.com/samcamwilliams/811537f0a52b39057af1def9e61756b2). Since then builders in the ecosystem have been building on and around it, experimenting, posting transactions with those tags.

Back to querying Arweave. You’ll notice in the GraphQL results that there are no readable post messages, just tags and information about posts.

This is because the GraphQL indexing service is concerned with indexing and retrieving header data for transactions and blocks but not their associated data.

To get the data of a transaction we need to look it up using another HTTP endpoint.
```text:no-line-numbers
https://arweave.net/<transaction id>
```

Copy and paste one of the id’s in your query results and modify the above link, appending the `id`. It should look something like this…

https://arweave.net/eaUAvulzZPrdh6_cHwUYV473OhvCumqT3K7eWI8tArk

The result of navigating to that URL in the browser (HTTP GET) would be retrieving the content of the post (stored in the transactions data). In this example it’s…
```text:no-line-numbers
Woah that's pretty cool 😎
```
(For a complete listing arweave HTTP endpoints visit the [HTTP API](https://docs.arweave.org/developers/server/http-api) documentation.)

## Posting a Query From JavaScript
Posting a GraphQL query from javascript isn't much different than posting it in the playground.

First install the `arweave-js` package for easy access to a GraphQL endpoint.
```console:no-line-numbers
npm install --save arweave
```

Then enter a slightly more advanced version of the example query from above and `await` the results of posting it.

```js:no-line-numbers
import Arweave from 'arweave';

// initialize an arweave instance
const arweave = Arweave.init({});

// create a query that selects tx data the first 100 tx with specific tags
const queryObject = {
	query:
	`{
		transactions(
			first:100,
			tags: [
				{
					name: "App-Name",
					values: ["PublicSquare"]
				},
				{
					name: "Content-Type",
					values: ["text/plain"]
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
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

## Multiple Queries
It is possible to post multiple queries in a single round-trip to the GraphQL endpoint. This example queries the `name` transaction (each as a separate query) for two wallet addresses using the now obsolete (replaced by `ar-profile`) but still permanent `arweave-id` protocol.
```graphql:no-line-numbers
query {
	account1: transactions(first: 1, owners:["89tR0-C1m3_sCWCoVCChg4gFYKdiH5_ZDyZpdJ2DDRw"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
	account2: transactions(first: 1, owners:["kLx41ALBpTVpCAgymxPaooBgMyk9hsdijSF2T-lZ_Bg"],
		tags: [
			{
				name: "App-Name",
				values: ["arweave-id"]
			},
			{
				name: "Type",
				values: ["name"]
			}
		]
	) {
		edges {
			node {
				id
					owner {
					address
				}
			}
		}
	}
}
```


## Resources
* [Arweave GQL Reference](../../references/gql.md)
* [ArDB package](./ardb.md)
* [ar-gql package](./ar-gql.md)
* [Search Indexing Service](./search-indexing-service.md)

