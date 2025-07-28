---
locale: zh
---
# 执行机器 API 令牌

EXM 旨在成为与加密无关，只需一个 API 令牌（也称为密钥）即可进行交互。此 API 密钥在 EXM 中大多数操作（如部署和写操作）中是必需的。

## 创建 API 令牌

要创建 API 令牌，必须执行以下步骤：

- 前往[主页](https://exm.dev/)。
- 选择首选的注册/登录方式。

![EXM 登录选项](~@source/images/exm-sign-in-options.png)

- 在重定向到仪表板后，点击“新建令牌”。

![创建新的 API 令牌](~@source/images/exm-create-token.png)

- 复制生成的令牌，并在 SDK 或 CLI 中使用它。

## 安全处理 API 令牌

该令牌是对我们帐户的标识，允许我们访问与之相关的功能。因此，确保保持此令牌的机密性以防止任何垃圾邮件和攻击对我们的功能至关重要。最佳方法是使用环境变量来实现。

有两种存储环境变量的方法：

1. 通过命令行：

在项目目录中执行以下命令：

```bash
export EXM_PK=<your_api_token>
```

2. 通过 `dotenv` SDK：

- 在命令行中运行以下命令：

  ```bash
  npm install dotenv

  #OR

  yarn add dotenv
  ```
- 在文件中导入库并使用变量：

  ```jsx
  import dotenv from "dotenv";
  dotenv.config();
  ```

然后，可以在文件中引用此密钥作为 `process.env.EXM_PK`，而无需将其暴露或推送到版本控制系统中，例如 GitHub。