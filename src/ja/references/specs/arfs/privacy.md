---
prev: "コンテンツタイプ.md"
next: "スキーマ図.md"
---

# プライバシー

Arweave の blockweave は本質的に公開されています。しかし ArFS を利用するアプリ（例：ArDrive）のような場合、軍事レベル（かつ [量子耐性](https://blog.boot.dev/cryptography/is-aes-256-quantum-resistant/#:~:text=Symmetric%20encryption%2C%20or%20more%20specifically,key%20sizes%20are%20large%20enough)）の暗号化を使用しない限り、ユーザーのプライベートデータがコンピュータを離れることはありません。このプライバシーレイヤーは Drive レベルで適用され、ユーザーは Drive を最初に作成する際にその Drive を公開にするかプライベートにするかを決定します。プライベートドライブは ArFS のプライバシーモデルに従う必要があります。

プライベート Drive 内のすべてのファイルは [AES-256-GCM](https://iopscience.iop.org/article/10.1088/1742-6596/1019/1/012008/pdf) を用いた対称暗号で暗号化されます。各プライベート Drive にはマスターの「Drive Key」があり、これはユーザーの Arweave ウォレット署名、ユーザーが定義するドライブパスワード、および一意のドライブ識別子（[uuidv4](https://en.wikipedia.org/wiki/Universally_unique_identifier)）の組み合わせを使用して生成されます。各ファイルは「File Key」を持ち、これは「Drive Key」から導出されます。これにより、ドライブ内の他のファイルへのアクセスを露呈することなく、単一ファイルを共有することが可能になります。

一旦ファイルが暗号化され Arweave に保存されると、そのファイルは永続的にロックされ、ファイルキーなしには復号できません。

## 鍵の導出

プライベートドライブは暗号化に対してグローバルな drive key である `D` と複数の file key `F` を持ちます。これにより、ドライブは必要な数だけ一意に暗号化されたファイルを保持できます。単一ファイルのすべてのバージョンには同じキーが使用されます（新しいファイルバージョンは同じ File-Id を使用するため）。

`D` は Drive および Folder メタデータの暗号化に使用され、`F` は File メタデータおよび実際に保存されるデータの暗号化に使用されます。これら異なる鍵 `D` と `F` を分けることにより、ユーザーはドライブ全体の内容を公開することなく、特定のファイルのみを共有できます。

`D` は、ドライブの id とユーザー提供のパスワードに対する [非ソルト](<https://en.wikipedia.org/wiki/Salt_(cryptography)>) の RSA-PSS 署名を用いた HKDF-SHA256 により導出されます。

`F` も HKDF-SHA256 を使用して、ドライブキーとファイルの id から導出されます。

<img :src="$withBase('/encryption-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

他のウォレット（例：[Wander](https://wander.app/)）はこの鍵導出プロトコルと統合され、Drive Key を導出するために必要な SHA-256 署名を取得するための署名収集 API を公開する形で連携します。

Dart を用いた参考実装は [こちら](https://github.com/ardriveapp/ardrive-web/blob/187b3fb30808bda452123c2b18931c898df6a3fb/docs/private_drive_kdf_reference.dart) にあり、Typescript 実装は [こちら](https://github.com/ardriveapp/ardrive-core-js/blob/f19da30efd30a4370be53c9b07834eae764f8535/src/utils/crypto.ts) にあります。

## Private Drives

ドライブは公開データまたはプライベートデータのいずれかを保存できます。これは Drive エンティティのメタデータ内の `Drive-Privacy` タグで示されます。

```json
Drive-Privacy: "<public | private>"
```

Drive エンティティがプライベートである場合、追加で `Drive-Auth-Mode` タグを使用して Drive Key の導出方法を示す必要があります。ArDrive クライアントは現在、Arweave ウォレットの秘密鍵署名と安全なパスワードを組み合わせてグローバルな Drive Key を導出しています。

```json
Drive-Auth-Mode?: 'password'
```

暗号化されたすべての Drive エンティティには `Cipher` タグと、データを復号するための公開パラメータが指定されていなければなりません。これは `Cipher-*` タグでパラメータを指定することで行われます。例：`Cipher-IV`。もしパラメータがバイトデータであれば、タグ内では Base64 でエンコードする必要があります。

ArDrive クライアントは現在、すべての対称暗号化に AES256-GCM を利用しており、これは 12 バイトのランダムな初期化ベクタ（Initialization Vector）を必要とします。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

さらに、暗号化されたすべてのトランザクションは `Content-Type` タグを `application/octet-stream` に設定しなければならず、`application/json` ではいけません。

プライベート Drive エンティティとそれに対応する Root Folder エンティティは、トランザクションに含まれる JSON ファイルを対称暗号化するためにこれらの鍵と暗号を使用します。これにより、Drive の所有者（および鍵が共有された相手）のみがドライブを開き、ルートフォルダを発見し、ドライブ内の残りの子要素を読み込むことが保証されます。

## Private Files

ファイルがプライベートドライブにアップロードされると、デフォルトでそのファイルもプライベートになり、親ドライブで使用されているのと同じドライブキーを利用します。ドライブ内の各ユニークなファイルは、そのファイル固有の `FileId` に基づく一連のファイルキーを取得します。単一ファイルが新しいバージョンを取得する場合、その `File-Id` は再利用され、そのファイル履歴のすべてのバージョンに同じ File Key が用いられます。

これらのファイルキーは、ドライブ所有者によって必要に応じて共有できます。

プライベートファイルのエンティティでは、メタデータとデータのトランザクションの両方が同じ File Key を使って暗号化されており、データのあらゆる側面が真にプライベートであることを保証します。そのため、ファイルのメタデータとデータのトランザクションの両方に対して、一意の `Cipher-IV` と `Cipher` タグを指定する必要があります：

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

ドライブと同様に、プライベートファイルはそのメタデータおよびデータのトランザクションの両方で `Content-Type` タグを `application/octet-stream` に設定する必要があります：

```json
Content-Type: "application/octet-stream"
```
