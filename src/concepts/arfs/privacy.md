---
---

# ArFS Privacy

The Arweave blockweave is inherently public. But with apps that use ArFS, like ArDrive, your private data never leaves your computer without using military grade (and [quantum resistant](https://blog.boot.dev/cryptography/is-aes-256-quantum-resistant/#:~:text=Symmetric%20encryption%2C%20or%20more%20specifically,key%20sizes%20are%20large%20enough)) encryption. This privacy layer is applied at the Drive level, and users determine whether a Drive is public or private when they first create it. Private drives must follow the ArFS privacy model.

Every file within a Private Drive is symmetrically encrypted using [AES-256-GCM](https://iopscience.iop.org/article/10.1088/1742-6596/1019/1/012008/pdf). Every Private drive has a master "Drive Key" which uses a combination of the user's Arweave wallet signature, a user defined drive password, and a unique drive identifier ([uuidv4](https://en.wikipedia.org/wiki/Universally_unique_identifier)). Each file has its own "File Key" derived from the "Drive Key". This allows for single files to be shared without exposing access to the other files within the Drive.

Once a file is encrypted and stored on Arweave, it is locked forever and can only be decrypted using its file key.

## Deriving Keys

Private drives have a global drive key, `D`, and multiple file keys `F`, for encryption. This enables a drive to have as many uniquely encrypted files as needed. One key is used for all versions of a single file (since new file versions use the same File-Id)

`D` is used for encrypting both Drive and Folder metadata, while `F` is used for encrypting File metadata and the actual stored data. Having these different keys, `D` and `F`, allows a user to share specific files without revealing the contents of their entire drive.

`D` is derived using HKDF-SHA256 with an [unsalted](https://en.wikipedia.org/wiki/Salt_(cryptography)) RSA-PSS signature of the drive's id and a user provided password.

`F` is also derived using HKDF-SHA256 with the drive key and the file's id.

<img :src="$withBase('/encryption-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

Other wallets (like [Wander](https://wander.app/)) integrate with this Key Derivation protocol just exposing an API to collect a signature from a given Arweave Wallet in order to get the SHA-256 signature needed for the [HKDF](https://en.wikipedia.org/wiki/HKDF) to derive the Drive Key.

An example implementation, using Dart, is available [here](https://github.com/ardriveapp/ardrive-web/blob/187b3fb30808bda452123c2b18931c898df6a3fb/docs/private_drive_kdf_reference.dart), with a Typescript implementation [here](https://github.com/ardriveapp/ardrive-core-js/blob/f19da30efd30a4370be53c9b07834eae764f8535/src/utils/crypto.ts).


## Private Drives

Drives can store either public or private data. This is indicated by the `Drive-Privacy` tag in the Drive entity metadata.

```json
Drive-Privacy: "<public | private>"
```

If a Drive entity is private, an additional tag `Drive-Auth-Mode` must also be used to indicate how the Drive Key is derived. ArDrive clients currently leverage a secure password along with the Arweave Wallet private key signature to derive the global Drive Key.

```json
Drive-Auth-Mode?: 'password'
```

On every encrypted Drive Entity, a `Cipher` tag must be specified, along with the public parameters for decrypting the data. This is done by specifying the parameter with a `Cipher-*` tag. eg. `Cipher-IV`. If the parameter is byte data, it must be encoded as Base64 in the tag.

ArDrive clients currently leverage AES256-GCM for all symmetric encryption, which requires a Cipher Initialization Vector consisting of 12 random bytes.

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

Additionally, all encrypted transactions must have the `Content-Type` tag `application/octet-stream` as opposed to `application/json`

Private Drive Entities and their corresponding Root Folder Entities will both use these keys and ciphers generated to symmetrically encrypt the JSON files that are included in the transaction. This ensures that only the Drive Owner (and whomever the keys have been shared with) can open the drive, discover the root folder, and continue to load the rest of the children in the drive.


## Private Files

When a file is uploaded to a private drive, it by default also becomes private and leverages the same drive keys used for its parent drive. Each unique file in a drive will get its own set of file keys based off of that file's unique `FileId`. If a single file gets a new version, its `File-Id` will be reused, effectively leveraging the same File Key for all versions in that file's history.

These file keys can be shared by the drive's owner as needed.

Private File entities have both its metadata and data transactions encrypted using the same File Key, ensuring all facets of the data is truly private. As such, both the file's metadata and data transactions must both have a unique `Cipher-IV` and `Cipher` tag: 

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

Just like drives, private files must have the `Content-Type` tag set as `application/octet-stream` in both its metadata and data transactions:

```json
Content-Type: "application/octet-stream"
```
