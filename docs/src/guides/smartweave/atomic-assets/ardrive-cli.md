# Deploy and Register Atomic Assets using ArDrive CLI

Atomic Assets need to be registered to be capable of being traded on the Permaweb. You can upload your assets using services like `ardrive-cli` and give the asset the proper data tags, then use this cli to register the asset.

## Guide to publish an atomic asset using ArDrive-cli and `asset-registar` cli.

### Setup

> Requires NodeJS - https://nodejs.org and jq - https://jqlang.github.io/jq/download/

```
npm i -g ardrive-cli
npm i -g asset-registar
```

### Create Atomic Assets Tags

Using a text editor, we want to create a new file called `data.json` and in this new file add the following:

```json
{
  "dataGqlTags": {
    "Type": "ASSET_TYPE_HERE",
    "Title": "TITLE_HERE",
    "Description": "DESCRIPTION_HERE",
    "License": "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8",
    "App-Name": "SmartWeaveContract",
    "App-Version": "0.3.0",
    "Contract-Src": "Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ",
    "Indexed-By": "ucm",
    "Init-State": "{ \"ticker\": \"ATOMIC\", \"name\": \"ASSET_NAME_HERE\", \"balances\": { \"YOUR_WALLET_ADDRESS\": UNITS_HERE }, \"claimable\": [] }"
  }
}
```

Now that you have your tags initialized you need to take every uppercase word and replace it with the values that are unique to your asset.

ASSET_TYPE_HERE:

This should be a one word description of your asset, "image", "audio", "video". etc.

TITLE_HERE:

A title that describes your asset, it should not be longer than 150 characters.

DESCRIPTION_HERE:

A description that you want to show up in search results or list results for your asset.

ASSET_NAME_HERE:

The name of your asset, in one word or connected with dashes ex. "AA-ALIEN-WITH-BEER".

YOUR_WALLET_ADDRESS:

The wallet address you want to give ownership too.

UNITS_HERE:

The number of fractional units you want to provide for this asset, if there can only be one owner then the replace with 1, if you want 100 owners replace with 100.

save the file as `data.json`

### Copy the asset you want to publish to this directory.

---

### Uploading with new arweave wallet.

Create a wallet or copy your wallet.json here.

```sh
ardrive generate-seedphrase
# copy the seed phrase that is in the output and include in the next command where the `...` are.
# generate wallet
ardrive generate-wallet -s "..." > wallet.json
```

Using `ardrive-cli` we are going to create a drive and a folder.

```sh
# create drive and folder
export FOLDER=$(ardrive create-drive -w ./wallet.json -n "My Atomic Assets"  --turbo |  jq -r '.created[] | select(.type == "folder").entityId')
# upload atomic asset
export ASSET=$(ardrive upload-file -w ./wallet.json -F ${FOLDER} --metadata-file ./data.json -l ASSET_FILE_HERE --turbo | jq -r '.created[] | select(.type == "file").dataTxId')
```

> NOTE: if your file is larger than 500k, you will need to add credits to your ardrive wallet, you can do this by going to https://ardrive.io and logging in with your wallet file.


### Register asset

Once the asset is uploaded with the Atomic Asset Tags, now all you have to do is call `asset-register <assetId>`

```sh
asset-registar ${ASSET}
```

### CONGRATS! 

You should be able to find your asset on ar://bazar by typing in the contractId in the search bar.