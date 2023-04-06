# Execution Machine API Token

EXM seeks to be crypto agnostic and requires only a single API token (also known as key) to interact with. This API key is required for most actions in EXM like deployments and write operations.

## Creating an API Token

For creating an API token, the following steps must be performed:

- Go to the [main page](https://exm.dev/).
- Choose the preferred method to Sign-Up/ Sign-In.

![EXM Sign In Options](~@source/images/exm-sign-in-options.png)

- After being redirected to the dashboard, click on "New Token".

![Create New API Token](~@source/images/exm-create-token.png)

- Copy the token that has been generated and use it with the SDK or CLI.

## Handling API Token safely

The token is an identifier to our account and lets us access functions associated with it. Hence, it is vital to ensure this token is kept secret to prevent any spams and attacks to our functions. The best way to do so is using environment variables.

There are two ways to store environment variables:

1. Through the command line:

In the directory of the project, pass the following command:

```bash
export EXM_PK=<your_api_token>
```

2. Through the `dotenv` sdk:

- Run the following in the command line:

  ```bash
  npm install dotenv

  #OR

  yarn add dotenv
  ```
- Import the library in file using the variables:

  ```jsx
  import dotenv from "dotenv";
  dotenv.config();
  ```

Then this key can be refered inside files as `process.env.EXM_PK` without exposing it or pushing it to version control systems like GitHub.