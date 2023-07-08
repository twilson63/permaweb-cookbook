---
locale: zh
---
# Spheron

Spheron协议是一个去中心化平台，旨在简化现代dapps的创建。它为开发人员提供无缝体验，可以在去中心化网络上快速部署、自动扩展和个性化内容分发。

Spheron使用GitHub集成来处理持续部署，并使我们能够将自定义DNS集成到任何给定的部署中。

## 设立Spheron账户所需的内容

* 一个GitHub账户
* 一个permaweb应用标识符并部署在permaweb上

::: tip
要使用Spheron部署Arweave应用，您需要Pro Plan，价格为每月20美元。
:::

## 认证/登录

Spheron依赖于GitHub、GitLab或BitBucket repo的部署，与Vercel类似。

要登录Spheron，请转到[Spheron Aqua仪表板](https://app.spheron.network/)，并选择您首选的认证方式。

## 导入repo

登录后，您将看到用户仪表板。在仪表板右上角点击"New Project"按钮导入一个repo。选择您想要的repo，并选择对Arweave进行部署的选项。

## 连接到DNS

现在您已导入项目并完成部署，请转到"Domains"选项卡。输入域名、环境，并选择将部署指向的域名。

在继续之前，系统会要求您验证已配置的记录。请在域名管理器中更新记录。更新DNS可能需要最多72小时。你会看到类似下方图片的内容:

<img src="https://arweave.net/8BNk8spFayPCdCHx1XrsoMtMdX1-qsDYAORPJ8BNZ3Y" />

更新完成后，您需要在Spheron中进行验证。点击"Verify"按钮，您应该一切就绪，准备就绪。现在，每当您在GitHub上部署新版本时，您的域名将更新为最新版本！🎉

::: tip
要创建完全分散化的应用程序，请确保使用[ArNS](https://ar.io/arns)或任何分散式DNS服务器。
:::

## 总结

Spheron是将Permaweb应用程序部署到Arweave并将其重定向到自定义域的简单方法。通过组合持续集成和持续部署，确保开发人员在各方面都能获得顺畅的体验！