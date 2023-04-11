# Search Gateway 

tl;dr

- Backwards compatible syntax
- Faster response times for complex queries (ie multi-tag search)
- More filter options
---

Goldsky's search gateway uses an optimized backend that allows for faster searches for complex queries across arweave blocks and transactions, and also introduces additional querying syntax for fuzzy and wildcard search use-cases. 

The Search Gateway GraphQL syntax is a superset of the [Arweave GraphQL syntax](./queryingArweave.md). It's fully backwards compatible and will return the same results for the same queries, but has some additional modifiers that can be useful. 

- Flexible tag filters
	- Search for just a tag name or value
- Advanced tag filters
	- Fuzzy search
	- Wildcard search
- Filter for L1 transactions only


## Search Gateway Endpoints

Currently, the only version of this syntax is hosted Goldsky. If anybody is interested in hosting their own gateway with the same syntax, feel free to contact the [Goldsky](https://goldsky.com) for help.

- [Goldsky Search Gateway](https://arweave-search.goldsky.com/graphql)

## Features

### Flexible Tag Filters

The Search Gateway Syntax is less strict, and allows for searching just for the Tag name or value

#### Examples
Search for transactions with the tag value 'cat'

```graphql:no-line-numbers
query just_values {
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

Search for transactions that have an `In-Response-To-ID`

```graphql:no-line-numbers
query just_name {
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


### Advanced tag filters

The Search Gateway Syntax offers an additional parameter to the tag filter, `match`.

| Match value | Description | 
|-------------|-------------|
| EXACT | (default) exact matches only. |
| WILDCARD | Enables * to match any amount of characters, ie. `text/*` |
| FUZZY_AND | Fuzzy match containing all search terms |
| FUZZY_OR | Fuzzy match containing at least one search term |


Open up the playground and try some of the following queries!

Searching all transactions with an image content type using a wildcard
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

### Fuzzy Search

Fuzzy search is very powerful, and can search for 'similar' text with many variations. 

Searching all transactions with 'cat' OR 'dog' (or CAT or doG or cAts or CAAts etcs). So the tag could contain at least of cat-like or dog-like term.

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

Search for transactions that have cat-like AND dog-like tag values
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

### Exclude Bundled (L2) Transactions

Simply set `bundledIn: NULL`

```graphql:no-line-numbers
query just_l1 {
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
