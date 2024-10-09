---
locale: ja
---
# Posting Transactions using Ardrive Turbo

Posting transactions using Turbo can be accomplished using the `@ardrive/turbo-sdk` JavaScript package.

## Installing the @ardrive/turbo-sdk

To install `@ardrive/turbo-sdk` run

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @ardrive/turbo-sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @ardrive/turbo-sdk
```

  </CodeGroupItem>
</CodeGroup>

## Initializing Turbo Client

There are multiple ways to upload data using the `turbo` sdk. You can:

- upload a `file`
- upload a `data-item`

When uploading a `data-item` with the `turbo` sdk, you will use `ar-bundles` to create the `data-item` and add `tags`. 

### Data-Item (recommended)

```js
import fs from 'node:fs'
import { TurboFactory } from '@ardrive/turbo-sdk/node';
import { ArweaveSigner, createData } from 'arbundles';


if (!process.env.PATH_TO_WALLET) {
  console.error("Please set PATH_TO_WALLET in your env.")
  process.exit()
}

const JWK = JSON.parse(fs.readFileSync(process.env.PATH_TO_WALLET).toString());

const turbo = TurboFactory.authenticated({ privateKey: JWK, });

const signer = new ArweaveSigner(JWK);
```

### File
```js
import { TurboFactory } from '@ardrive/turbo-sdk/node';
import fs from 'fs';

if (!process.env.PATH_TO_WALLET) {
  console.error("Please set PATH_TO_WALLET in your env.")
  process.exit()
}

const JWK = JSON.parse(fs.readFileSync(process.env.PATH_TO_WALLET).toString());

const turbo = TurboFactory.authenticated({ privateKey: JWK });

const filePath = new URL('path/to/file', import.meta.url).pathname;
const fileSize = fs.statSync(filePath).size;
const dataItemOpts = {
    //target: ,
    // anchor: ,
    tags: [{name: 'test', value: 'test'}] // add tags
  }
  const uploadResult = await turbo.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    signal: AbortSignal.timeout(10_000), // Optional: cancel the upload after 10 seconds
    dataItemOpts // Optional
  });
  console.log(JSON.stringify(uploadResult, null, 2));
```

Example Output:

```console
{
  "id": "1mPoz28tMAnYecZTya4g6cHSIQz37zAAwr_uC0IUcxU",
  "timestamp": 1704990130970,
  "winc": "0",
  "version": "0.2.0",
  "deadlineHeight": 1341385,
  "dataCaches": [
    "arweave.net"
  ],
  "fastFinalityIndexes": [
    "arweave.net"
  ],
  "public": "j0Ki2cJHca6HoC4B3y0ZxFKEe9c539AO5KlfDj76KpWOSx5xtbiDUndEWmJxE-p9ayAI8nF5sSJeRfNpuD4g831fmUbTFvUXKNKcfLJ4knDewyY7YNtVGcjBrNRDbsMPhC6UKiquyewRhBlu3YNyEvC9hV4otuwgGI1QcPQmqL9lztpSbwtV00qQIhYAyDbUCmPU6GMPjgk3o-YTDam0rny80tJnxQu5xvLAH3x-nnaAYVsc4-oDvpKKDzq-i5GzSZAFfiWXlYs80fts0Y-T2w3649IgHIjvPy72jYS6y02HKaL9guTczSQfa5ILhE0XotIFgjTkP0LEhHNVmrG7XA5XyKdgV3tyWi1qPrHs-Se5miuZsD0Mz_tBiVZ_AmqQbUYAmyYmEnuB_NpWJoBj18ItZfP1Bq7BvjriJJmpsOab95hEkQCEJHSHRAkH72aS_oz-bM6lymNtOj68NGzTZ0y0hq9b2FSKFhQbrxQpGSbQQ4p6tnoKF_B2n1xTE1xAU3R5Ju-2CZsGCW6kf2JBVTvyQrU5njVHeAS5niOkaJEzlEoaHvaSZF48AvMKB1nZCKG3xbHdQA8EGWNJ_7D-L5BbH2-7Y6CY-9KNS7HMIFTp39lqWzMJ4gyQzDzOh1vaG8bckm0CSqB9WXJxKNALgOpQmvGKDHZIODDSyZ1b8GE",
  "signature": "D58BO0hRPeqkQ_m9SFRiZze1CHZzxek-grsAs0xSsfzi6FNUQDDZyzadX4cd4aWxJaw4APti-lFHjh8_eUfwO2Qblo5wY-WDi3DU9LPasdzu4P0QFhsWk_hZwQslunAtH8NnPdbD8cnfeHKabvVcpXRDwndQX-7TJwjndAHDEFuN1fB-t445i8_z6GK4XYSgM253gFcL_KC0gD5UUcxLk5OGNPuDXPKIAVPsHGzzx4861t4BvB8EYo2YRpveu3LA6bRdXbG4q312JdUZMTBoZP1-QqwcHiFtQg2YLMZAM07YbyTMaTwMa6l3EhffpDuZ_llAWtQjlDw5egu4rnWxPZos17bSN-ReiH_NTBKjlHz54gBa-Q2YT58qXEj2XzfpIENdlhVxjmmWmIiMtrr58oOws9mB5yyIFHeXUbk1U4EZc7mbNDEEmDjTpHnAIVM83aGDOux7H2UpDV9UMBPYS1CX_huW4ACXJ6XqLH5E6Kc6_WXWUwEsoGKarK0A1WiDpKhGkA41KgKHLZ5CbACJ0bWoaa4YBLQgFjowZXwDsn3s6t78aAqpx_meVI67Eg4P7ELDish8CY9NcMHMXeEBHsctNHtCdJXQLRWf6CyYkmf2T7ym1DP4R58FkpBpkVXEUadFyshJe0nfB9ie17f_njuPpKWN3d2OODZVarxtRsI",
  "owner": "GtDQcrr2QRdoZ-lKto_S_SpzEwiZiHVaj3x4jAgRh4o"
}
```

## Posting a `Data-Item` (recommended)

```js
const signer = new ArweaveSigner(JWK);
const signedDataItem = createData(JSON.stringify({ "some": "data" }), signer, {
  tags: [{ name: 'test', value: 'test' }] // add tags
});
await signedDataItem.sign(signer);

const uploadResult = await turbo.uploadSignedDataItem({
  dataItemStreamFactory: () => signedDataItem.getRaw(),
  dataItemSizeFactory: () => signedDataItem.getRaw().length,
  signal: AbortSignal.timeout(10_000), // Optional: cancel the upload after 10 seconds

});

console.log(JSON.stringify(uploadResult, null, 2));
```

Example Output:

```console
{
  "id": "agcPXVfw92w_JI5v8o6C_Gsixd_BDMaHqNSStX4Eed8",
  "timestamp": 1704990453564,
  "winc": "0",
  "version": "0.2.0",
  "deadlineHeight": 1341387,
  "dataCaches": [
    "arweave.net"
  ],
  "fastFinalityIndexes": [
    "arweave.net"
  ],
  "public": "j0Ki2cJHca6HoC4B3y0ZxFKEe9c539AO5KlfDj76KpWOSx5xtbiDUndEWmJxE-p9ayAI8nF5sSJeRfNpuD4g831fmUbTFvUXKNKcfLJ4knDewyY7YNtVGcjBrNRDbsMPhC6UKiquyewRhBlu3YNyEvC9hV4otuwgGI1QcPQmqL9lztpSbwtV00qQIhYAyDbUCmPU6GMPjgk3o-YTDam0rny80tJnxQu5xvLAH3x-nnaAYVsc4-oDvpKKDzq-i5GzSZAFfiWXlYs80fts0Y-T2w3649IgHIjvPy72jYS6y02HKaL9guTczSQfa5ILhE0XotIFgjTkP0LEhHNVmrG7XA5XyKdgV3tyWi1qPrHs-Se5miuZsD0Mz_tBiVZ_AmqQbUYAmyYmEnuB_NpWJoBj18ItZfP1Bq7BvjriJJmpsOab95hEkQCEJHSHRAkH72aS_oz-bM6lymNtOj68NGzTZ0y0hq9b2FSKFhQbrxQpGSbQQ4p6tnoKF_B2n1xTE1xAU3R5Ju-2CZsGCW6kf2JBVTvyQrU5njVHeAS5niOkaJEzlEoaHvaSZF48AvMKB1nZCKG3xbHdQA8EGWNJ_7D-L5BbH2-7Y6CY-9KNS7HMIFTp39lqWzMJ4gyQzDzOh1vaG8bckm0CSqB9WXJxKNALgOpQmvGKDHZIODDSyZ1b8GE",
  "signature": "QNgpeIZrgJ3mu3NB9iZeyXGeKJaZ_Efp-QQd7_gbAp2Z1WhqWnQHtf_uKjLOf7sfNZLyo1igMwXv0LMmILr0QRsx1bVQ1WSAHnJb11F7YEoyfiD7veSEJ-0284NIO7Ixy_AQqf5X41kmL5025Oy1NY6jy7ftQ-hBSs3jyQ0_Af1-6SZ8VAnsIQW-G2vXIralVyTkYm49USKYL8vok4Twh1ICCDj-NMqBSBtDA5lL4pmZ06OXi7jZ1dR3QDBKtD6YdomdM5ccmfyNDb95c7A-uqwVp87R5kZnMIVfQ7JhZdCrTly2dwhW6yIA6tyHSRHmP_n2esALj2_R2uYxJnU-uCE2934YFFQX-jxOchUB3vWBIYzL-v-iY0eWRQZqg5lCYMhZ8jnwrBun_e1N_9-ODsD1nnHs0fEqqrTqnEoKQRJTbIN8qmBJbPlulRmPI_x0O-601UuUQ-6BmghzXZLaQvklMwMrzEI0A3FShM7ZY0zfXj8PUB-4BSUSHXQlyT697DGYTAOuClUXs39SFp2mPP7voeMOKFUr8r0xi52pJcesAhKQOmIqMVjywqwS9089t5-JPKbA6JZKLygMZdxJ3evq7Dq9Y6K6scM2TXT6Tr7w2cP1_jNc0fomo6WjUt3y1KY1WYphmgVG_6_oMZigAK1itwtLAOQ_43PMefla7OE",
  "owner": "GtDQcrr2QRdoZ-lKto_S_SpzEwiZiHVaj3x4jAgRh4o"
}
```

## Posting a `File`

```js
const filePath = new URL('path/to/file', import.meta.url).pathname;
const fileSize = fs.statSync(filePath).size;
const dataItemOpts = {
    //target: 'string',
    // anchor: 'string',
    tags: [{name: 'test', value: 'test'}] // add tags
  }
const uploadResult = await turbo.uploadFile({
	fileStreamFactory: () => fs.createReadStream(filePath),
	fileSizeFactory: () => fileSize,
	signal: AbortSignal.timeout(10_000), // Optional: cancel the upload after 10 seconds
  dataItemOpts // Optional
});
console.log(JSON.stringify(uploadResult, null, 2));
```

Example Output:

```console
{
  "id": "68h8-kGbKGJMQD8nOCsRl_0mJKpxQSpmL42OJq5nCxQ",
  "timestamp": 1704990009421,
  "winc": "0",
  "version": "0.2.0",
  "deadlineHeight": 1341384,
  "dataCaches": [
    "arweave.net"
  ],
  "fastFinalityIndexes": [
    "arweave.net"
  ],
  "public": "j0Ki2cJHca6HoC4B3y0ZxFKEe9c539AO5KlfDj76KpWOSx5xtbiDUndEWmJxE-p9ayAI8nF5sSJeRfNpuD4g831fmUbTFvUXKNKcfLJ4knDewyY7YNtVGcjBrNRDbsMPhC6UKiquyewRhBlu3YNyEvC9hV4otuwgGI1QcPQmqL9lztpSbwtV00qQIhYAyDbUCmPU6GMPjgk3o-YTDam0rny80tJnxQu5xvLAH3x-nnaAYVsc4-oDvpKKDzq-i5GzSZAFfiWXlYs80fts0Y-T2w3649IgHIjvPy72jYS6y02HKaL9guTczSQfa5ILhE0XotIFgjTkP0LEhHNVmrG7XA5XyKdgV3tyWi1qPrHs-Se5miuZsD0Mz_tBiVZ_AmqQbUYAmyYmEnuB_NpWJoBj18ItZfP1Bq7BvjriJJmpsOab95hEkQCEJHSHRAkH72aS_oz-bM6lymNtOj68NGzTZ0y0hq9b2FSKFhQbrxQpGSbQQ4p6tnoKF_B2n1xTE1xAU3R5Ju-2CZsGCW6kf2JBVTvyQrU5njVHeAS5niOkaJEzlEoaHvaSZF48AvMKB1nZCKG3xbHdQA8EGWNJ_7D-L5BbH2-7Y6CY-9KNS7HMIFTp39lqWzMJ4gyQzDzOh1vaG8bckm0CSqB9WXJxKNALgOpQmvGKDHZIODDSyZ1b8GE",
  "signature": "fSuRHFXbuWAuIIEAquGD5hwOLU8uy0sVAu3mCwyitRlxI2wDgB8F_8mrF4dsv8-Jab3jb8vjVB0LrRWlStCGTnL3JStr0C8d-UdTHyQk3EfWPmikrZuE1cHdBjTyys9Y-8lmGR0bY5fT8GA_xj48coQhNNKSU4MYvo9m0stAY7Vy5dnzp0xOvyvZuWzlLzQqwsI-1nNMCh9LvVUenGO-yOArUNNeCGL2y55qnNcFpCs8TDla3plRiddND5CkR3vkLWpMAa_irBYXB2m3ekIqGmBTBbww0YjAR9AUt9PXKibysrbADvDEa5siWEPEa48dVwLes5PtSw9s6e8X6ief8Y3cUX5QPqnPTv5Bb4T51HutMuSb2Dj78_G4tBjrkfZKUNu3U9uOBWp8fZ-N4E1buvkuM9-yAtsfRfrUfxmwdNZ9KFGuog-ffJ0lor6sdq_CjUTUo4RkwvQcOI5nZi2_AGEsfoDTusqio2pbps7E8zgU4op2vQSxZXGoYaMPrKxA6HIptPP3rZVbXJMLfSccesjylkGozdQZaWtXdhbQKRmCYouSUWMuxngCRaHVA-W1ImU-4fyX3aRi4XNZBT3b63D_QwU-cI7zlUWnEkX6E79MFlWJoVXNm94fP92wGZUsesogsiifqMBIelkHW9Otr76XFr140AsTpyZj3wqPDEc",
  "owner": "GtDQcrr2QRdoZ-lKto_S_SpzEwiZiHVaj3x4jAgRh4o"
}
```

## Resources

- Dive into the [Code](https://github.com/ardriveapp/turbo-sdk)
- Join the discussion in the [ArDrive Discord](https://discord.com/invite/ya4hf2H)
