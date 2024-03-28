## Part 1: Deploying a Renderer on Arweave

In this tutorial, you'll learn how to deploy a renderer on the Arweave network that displays text content fetched from the permaweb. Additionally, you will deploy a "Hello, World!" text file using Bundlr and render it using the deployed renderer.

### Prerequisites

Before we begin, make sure you have the following:

-   Basic knowledge of JavaScript, HTML, and CSS
-   [Bundlr CLI](https://www.npmjs.com/package/@bundlr-network/cli) installed and configured

### Step 1: Create the "Hello, World!" text file

Create a new directory and cd into it. 

Create a new text file called `hello-world.txt` and add the following content:

```
Hello, World!
```

### Step 2: Deploy the "Hello, World!" text file using Bundlr

First, we need to create a wallet. Run the following command.

```
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

To deploy your `hello-world.txt` file to the permaweb using Bundlr, open your terminal, make sure you're still in the folder containing the `hello-world.txt` file, and run the following command:

```
npx bundlr upload hello-world.txt -c arweave -h https://node2.bundlr.network -w ./wallet.json
```

Once the deployment is complete, you will receive a transaction ID for the "Hello, World!" text file, looking something like this:

```
Uploaded to https://arweave.net/BWCMQc0fXFabjYgEWbbKCUDG13KW4AEB5DUTJC8r4-8
```

The part after https://arweave.net/ is your transaction id. You can click on the whole link to see your content.

### Step 3: Create your renderer HTML file

Create a new HTML file for your renderer called `renderer.html`. Copy the provided code into the file, but remove the translation-related code as we will only focus on deploying the renderer in this tutorial:


```
<!DOCTYPE html>
<html lang="en">
  <head>
	  // Todo
  </head>
  <body>
    <div id="content"></div>

    <script>
		// Todo
    </script>
  </body>
</html>
```

### Step 4: Add the script to fetch content from Arweave and apply styling

Now, let's add the JavaScript code to fetch the data for the transaction specified by the `tx` query parameter and render it in the `content` div. We will also apply modern and colorful styling to the rendered text.

First, add the following style block inside the `<head>` section of your `renderer.html`:

```
<style>
  body {
    font-family: "Poppins", sans-serif;
    background-color: #ffe9d6;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  #content {
    background-color: #fffcf9;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  #content p {
    font-size: 1.8rem;
    color: #eb5e28;
    margin: 0;
    line-height: 1.5;
  }
</style>
```

Next, add the provided script right within the `<script>` tags in your `renderer.html`:

```
  const contentDiv = document.getElementById("content");
  const txid = new URLSearchParams(window.location.search).get("tx");

  if (txid) {
    async function fetchTextFromArweave(txid) {
      const response = await fetch(`https://g8way.io/${txid}`);
      const text = await response.text();
      console.log(`text being rendered ${text}`);
      return text;
    }

    fetchTextFromArweave(txid)
      .then((text) => {
        contentDiv.innerHTML = `<p>${text}</p>`;
      })
      .catch((error) => {
        console.error(error);
        contentDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  } else {
    contentDiv.innerHTML = "<p>Please add a tx id in the url</p>";
  }
````

This script fetches the text content from Arweave using the transaction ID provided in the URL and displays it in the `content` div. If there's an error or if the transaction ID is not provided, it will display an appropriate message to the user.


### Step 5: Deploy the renderer to Arweave

We can now deploy our script using the same command as we did for our hello-world.txt file, replacing it with render.html:

```
npx bundlr upload renderer.html -c arweave -h https://node2.bundlr.network -w ./wallet.json
```


### Step 6: Test your renderer
To test your renderer, append a `tx` query parameter with the valid Arweave transaction ID of your deployed `hello-world.txt` to the URL:

`https://arweave.net/your-renderer-transaction-id/?tx=hello-world-transaction-id`

Replace `your-renderer-transaction-id` with the actual transaction ID of your deployed renderer, and `hello-world-transaction-id` with the transaction ID of your deployed `hello-world.txt` file.

Your renderer should now fetch and display the "Hello, World!" content from the specified transaction.

