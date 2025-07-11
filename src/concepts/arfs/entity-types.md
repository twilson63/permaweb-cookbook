---
---

# ArFS Entity Types

## Overview

Arweave transactions are composed of transaction headers and data payloads. 

ArFS entities, therefore, have their data split between being stored as tags on their transaction header and encoded as JSON and stored as the data of a transaction. In the case of private entities, JSON data and file data payloads are always encrypted according to the protocol processes defined below.

- Drive entities require a single metadata transaction, with standard Drive tags and encoded JSON with secondary metadata.

- Folder entities require a single metadata transaction, with standard Folder tags and an encoded JSON with secondary metadata.

- File entities require a metadata transaction, with standard File tags and an encoded Data JSON with secondary metadata relating to the file.

- File entities also require a second data transaction, which includes a limited set of File tags and the actual file data itself.

- Snapshot entities require a single transaction. which contains a Data JSON with all of the Drive’s rolled up ArFS metadata and standard Snapshot GQL tags that identify the Snapshot.

## Drive

A drive is the highest level logical grouping of folders and files. All folders and files must be part of a drive, and reference the Drive ID of that drive.

When creating a Drive, a corresponding folder must be created as well. This will act as the root folder of the drive. This separation of drive and folder entity enables features such as folder view queries, renaming, and linking.

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<uuid>"
Drive-Privacy: "<public | private>"
Drive-Auth-Mode?: "password"
Entity-Type: "drive"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<user defined drive name>",
    "rootFolderId": "<uuid of the drive root folder>"
}
```

<div style="text-align: center; font-size: .75em;">Drive Entity Transaction Example</div>

## Folder

A folder is a logical grouping of other folders and files. Folder entity metadata transactions without a parent folder id are considered the Drive Root Folder of their corresponding Drives. All other Folder entities must have a parent folder id. Since folders do not have underlying data, there is no Folder data transaction required.

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "folder"
Folder-Id: "<uuid>"
Parent-Folder-Id?: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<user defined folder name>"
}
```

<div style="text-align: center; font-size: .75em;">Folder Entity Transaction Example</div>

## File

A File contains uploaded data, like a photo, document, or movie. 


In the Arweave File System, a single file is broken into 2 parts - its metadata and its data.


In the Arweave File System, a single file is broken into 2 parts - its metadata and its data.

A File entity metadata transaction does not include the actual File data. Instead, the File data must be uploaded as a separate transaction, called the File Data Transaction. The File JSON metadata transaction contains a reference to the File Data Transaction ID so that it can retrieve the actual data. This separation allows for file metadata to be updated without requiring the file itself to be reuploaded. It also ensures that private files can have their JSON Metadata Transaction encrypted as well, ensuring that no one without authorization can see either the file or its metadata.

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<user defined file name with extension eg. happyBirthday.jpg>",
    "size": "<computed file size - int>",
    "lastModifiedDate": "<timestamp for OS reported time of file's last modified date represented as milliseconds since unix epoch - int>",
    "dataTxId": "<transaction id of stored data>",
    "dataContentType": "<the mime type of the data associated with this file entity>",
    "pinnedDataOwner": "<the address of the original owner of the data where the file is pointing to>" # Optional
}
```

<div style="text-align: center; font-size: .75em;"> Pin Files </div>

Since the version v0.13, ArFS suports Pins. Pins are files whose data may be any transaction uploaded to Arweave, that may or may not be owned by the wallet that created the pin.

When a new File Pin is created, the only created transaction is the Metadata Transaction. The `dataTxId` field will point it to any transaction in Arweave, and the optional `pinnedDataOwner` field is gonna hold the address of the wallet that owns the original copy of the data transaction.

<div style="text-align: center; font-size: .75em;">File Data Transaction Example</div>

The File Data Transaction contains limited information about the file, such as the information required to decrypt it, or the Content-Type (mime-type) needed to view in the browser.

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<file mime-type | application/octet-stream>"
 { File Data - Encrypted if private }
```

<div style="text-align: center; font-size: .75em;">File Metadata Transaction Example</div>

The the File Metadata Transaction contains the GQL Tags necessary to identify the file within a drive and folder.

Its data contains the JSON metadata for the file. This includes the file name, size, last modified date, data transaction id, and data content type.

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"
 { File JSON Metadata - Encrypted if private }
```

## Snapshot

ArFS applications generate the latest state of a drive by querying for all ArFS transactions made relating to a user's particular `Drive-Id`. This includes both paged queries for indexed ArFS data via GQL, as well as the ArFS JSON metadata entries for each ArFS transaction.

For small drives (less than 1000 files), a few thousand requests for very small volumes of data can be achieved relatively quickly and reliably. For larger drives, however, this results in long sync times to pull every piece of ArFS metadata when the local database cache is empty. This can also potentially trigger rate-limiting related ArWeave Gateway delays.

Once a drive state has been completely, and accurately generated, in can be rolled up into a single snapshot and uploaded as an Arweave transaction. ArFS clients can use GQL to find and retrieve this snapshot in order to rapidly reconstitute the total state of the drive, or a large portion of it. They can then query individual transactions performed after the snapshot.

This optional method offers convenience and resource efficiency when building the drive state, at the cost of paying for uploading the snapshot data. Using this method means a client will only have to iterate through a few snapshots instead of every transaction performed on the drive.

### Snapshot Entity Tags

Snapshot entities require the following tags. These are queried by ArFS clients to find drive snapshots, organize them together with any other transactions not included within them, and build the latest state of the drive.

```json
ArFS: "0.13"
Drive-Id: "<drive uuid that this snapshot is associated with>"
Entity-Type: "snapshot"
Snapshot-Id: "<uuid of this snapshot entity>"
Content-Type: "<application/json>"
Block-Start: "<the minimum block height from which transactions were searched for in this snapshot, eg. 0>"
Block-End: "<the maximum block height from which transactions were searched for in this snapshot, eg 1007568>"
Data-Start: "<the first block in which transaction data was found in this snapshot, eg 854300"
Data-End: "<the last block in which transaction was found in this snapshot, eg 1001671"
Unix-Time: "<seconds since unix epoch>"
```

<div style="text-align: center; font-size: .75em;">Snapshot Transaction GQL tags example</div>

### Snapshot Entity Data

A JSON data object must also be uploaded with every ArFS Snapshot entity. THis data contains all ArFS Drive, Folder, and File metadata changes within the associated drive, as well as any previous Snapshots. The Snapshot Data contains an array `txSnapshots`. Each item includes both the GQL and ArFS metadata details of each transaction made for the associated drive, within the snapshot's start and end period.

A `tsSnapshot` contains a `gqlNode` object which uses the same GQL tags interface returned by the Arweave Gateway. It includes all of the important `block`, `owner`, `tags`, and `bundledIn` information needed by ArFS clients. It also contains a `dataJson` object which stores the correlated Data JSON for that ArFS entity.

For private drives, the `dataJson` object contains the JSON-string-escaped encrypted text of the associated file or folder. This encrypted text uses the file's existing `Cipher` and `Cipher-IV`. This ensures clients can decrypt this information quickly using the existing ArFS privacy protocols.

```json
{
  "txSnapshots": [
    {
      "gqlNode": {
        "id": "bWCvIc3cOzwVgquD349HUVsn5Dd1_GIri8Dglok41Vg",
        "owner": {
          "address": "hlWRbyJ6WUoErm3b0wqVgd1l3LTgaQeLBhB36v2HxgY"
        },
        "bundledIn": {
          "id": "39n5evzP1Ip9MhGytuFm7F3TDaozwHuVUbS55My-MBk"
        },
        "block": {
          "height": 1062005,
          "timestamp": 1669053791
        },
        "tags": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "ArFS",
            "value": "0.11"
          },
          {
            "name": "Entity-Type",
            "value": "drive"
          },
          {
            "name": "Drive-Id",
            "value": "f27abc4b-ed6f-4108-a9f5-e545fc4ff55b"
          },
          {
            "name": "Drive-Privacy",
            "value": "public"
          },
          {
            "name": "App-Name",
            "value": "ArDrive-App"
          },
          {
            "name": "App-Platform",
            "value": "Web"
          },
          {
            "name": "App-Version",
            "value": "1.39.0"
          },
          {
            "name": "Unix-Time",
            "value": "1669053323"
          }
        ]
      },
      "dataJson": "{\"name\":\"november\",\"rootFolderId\":\"71dfc1cb-5368-4323-972a-e9dd0b1c63a0\"}"
    }
  ]
}
```

<div style="text-align: center; font-size: .75em;">Snapshot Transaction JSON data example</div>



## Schema Diagrams

The following diagrams show complete examples of Drive, Folder, and File entity Schemas.

### Public Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">Public Drive Schema</div>

### Private Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">Private Drive Schema</div>


