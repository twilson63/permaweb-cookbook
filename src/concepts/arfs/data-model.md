---
---

# ArFS Data Model

Because of Arweave's permanent and immutable nature, traditional file structure operations such as renaming and moving files or folders cannot be accomplished by simply updating on-chain data. ArFS works around this by defining an append-only transaction data model based on the metadata tags found in the Arweave [Transaction Headers.](https://docs.arweave.org/developers/server/http-api#transaction-format)


This model uses a bottom-up reference method, which avoids race conditions in file system updates. Each file contains metadata that refers to the parent folder, and each folder contains metadata that refers to its parent drive. A top-down data model would require the parent model (i.e. a folder) to store references to its children.

These defined entities allow the state of the drive to be constructed by a client to look and feel like a file system

- Drive Entities contain folders and files

- Folder Entities contain other folders or files

- File Entities contain both the file data and metadata

- Snapshot entities contain a state rollups of all files and folder metadata within a drive

## Entity relationships

The following diagram shows the high level relationships between drive, folder, and file entities, and their associated data. More detailed information about each Entity Type can be found [here](./entity-types.md). 

<img :src="$withBase('/entity-relationship-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

<div style="text-align: center; font-size: .75em;">Entity Relationship Diagram</div>

As you can see, each file and folder contains metadata which points to both the parent folder and the parent drive. The drive entity contains metadata about itself, but not the child contents. So clients must build drive states from the lowest level and work their way up.

## Metadata Format

Metadata stored in any Arweave transaction tag will be defined in the following manner:

```json
{ "name": "Example-Tag", "value": "example-data" }
```

Metadata stored in the Transaction Data Payload will follow JSON formatting like below:

```json
{
    "exampleField": "exampleData"
}
```

fields with a `?` suffix are optional.

```json
{
  "name": "My Project",
  "description": "This is a sample project.",
  "version?": "1.0.0",
  "author?": "John Doe"
}
```

Enumerated field values (those which must adhere to certain values) are defined in the format "value 1 | value 2".

All UUIDs used for Entity-Ids are based on the [Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) standard.

There are no requirements to list ArFS tags in any specific order.