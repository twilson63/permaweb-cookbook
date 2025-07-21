# Zero to Deployed: Your First Full Stack Permaweb App

Build and deploy a complete permaweb application in 30 minutes. This guide takes you from zero setup to a live, permanently stored web application on Arweave.

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed on your machine
- **Wander wallet extension** installed in your browser
- **Basic JavaScript knowledge** (variables, functions, async/await)
- **10-15 AR tokens** for deployment costs (get from [faucet](https://faucet.arweave.net/) for testnet)

**Time to complete:** 25-30 minutes

## Step 1: Environment Setup (5 minutes)

### Install Required Tools

Create a new directory and initialize your project:

```bash
mkdir my-permaweb-app
cd my-permaweb-app
npm init -y
```

Install the essential permaweb development tools:

```bash
npm install --save-dev vite
npm install arweave @permaweb/aoconnect
npm install --save-dev @permaweb/deploy-permaweb
```

### Verify Your Environment

Test that everything is working:

```bash
# Check Node.js version (should be 18+)
node --version

# Verify Wander is installed
# Open your browser and look for the Wander extension icon
```

Create a basic `package.json` scripts section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "permaweb-deploy"
  }
}
```

## Step 2: Build Your Application (15 minutes)

### Create the Project Structure

Set up your application files:

```bash
mkdir src
touch index.html src/main.js src/style.css
```

### HTML Foundation

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Permaweb App</title>
    <link rel="stylesheet" href="./src/style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>🌐 My Permaweb App</h1>
            <button id="connect-wallet">Connect Wander</button>
            <span id="wallet-address" class="hidden"></span>
        </header>
        
        <main>
            <div id="content">
                <h2>Welcome to the Permaweb!</h2>
                <p>This application is permanently stored on Arweave.</p>
                
                <div class="feature-card">
                    <h3>✨ Permanent Storage</h3>
                    <p>Your data lives forever on the blockchain</p>
                </div>
                
                <div class="feature-card">
                    <h3>🔒 Decentralized</h3>
                    <p>No single point of failure or control</p>
                </div>
                
                <div class="feature-card">
                    <h3>🚀 Fast Deployment</h3>
                    <p>Deploy in minutes, not hours</p>
                </div>
            </div>
            
            <div id="transaction-section" class="hidden">
                <h3>Store a Message Forever</h3>
                <textarea id="message-input" placeholder="Enter your permanent message..."></textarea>
                <button id="store-message">Store on Arweave</button>
                <div id="transaction-result"></div>
            </div>
        </main>
    </div>
    
    <script type="module" src="./src/main.js"></script>
</body>
</html>
```

### CSS Styling

Create `src/style.css`:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

#app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding: 1rem 0;
    border-bottom: 2px solid rgba(255,255,255,0.2);
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

button {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

button:hover {
    background: rgba(255,255,255,0.3);
    border-color: rgba(255,255,255,0.5);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.hidden {
    display: none;
}

.feature-card {
    background: rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1rem 0;
    backdrop-filter: blur(10px);
}

.feature-card h3 {
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
}

#wallet-address {
    font-family: monospace;
    background: rgba(0,0,0,0.2);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
}

#transaction-section {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 12px;
    margin-top: 2rem;
}

#message-input {
    width: 100%;
    height: 120px;
    padding: 1rem;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 8px;
    background: rgba(255,255,255,0.1);
    color: white;
    resize: vertical;
    font-family: inherit;
    margin-bottom: 1rem;
}

#message-input::placeholder {
    color: rgba(255,255,255,0.7);
}

#transaction-result {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: rgba(0,255,0,0.1);
    border: 1px solid rgba(0,255,0,0.3);
}

.success {
    background: rgba(0,255,0,0.1) !important;
    border-color: rgba(0,255,0,0.3) !important;
    color: #90EE90;
}

.error {
    background: rgba(255,0,0,0.1) !important;
    border-color: rgba(255,0,0,0.3) !important;
    color: #FFB6C1;
}
```

### JavaScript Functionality

Create `src/main.js`:

```javascript
import Arweave from 'arweave';

// Initialize Arweave
const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

// DOM elements
const connectButton = document.getElementById('connect-wallet');
const walletAddress = document.getElementById('wallet-address');
const transactionSection = document.getElementById('transaction-section');
const messageInput = document.getElementById('message-input');
const storeButton = document.getElementById('store-message');
const transactionResult = document.getElementById('transaction-result');

// Application state
let wallet = null;
let userAddress = null;

// Utility functions
function truncateAddress(address) {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

function showResult(message, isError = false) {
    transactionResult.textContent = message;
    transactionResult.className = isError ? 'error' : 'success';
    transactionResult.style.display = 'block';
}

// Wallet connection
async function connectWallet() {
    try {
        connectButton.textContent = 'Connecting...';
        connectButton.disabled = true;
        
        // Check if Wander is available
        if (!window.arweaveWallet) {
            throw new Error('Wander extension not found. Please install Wander.');
        }
        
        // Connect to Wander
        await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
        
        // Get user address
        userAddress = await window.arweaveWallet.getActiveAddress();
        
        // Update UI
        walletAddress.textContent = truncateAddress(userAddress);
        walletAddress.classList.remove('hidden');
        connectButton.style.display = 'none';
        transactionSection.classList.remove('hidden');
        
        showResult('✅ Wallet connected successfully!');
        
    } catch (error) {
        console.error('Wallet connection failed:', error);
        showResult(`❌ Connection failed: ${error.message}`, true);
        connectButton.textContent = 'Connect Wander';
        connectButton.disabled = false;
    }
}

// Store message on Arweave
async function storeMessage() {
    const message = messageInput.value.trim();
    
    if (!message) {
        showResult('❌ Please enter a message to store', true);
        return;
    }
    
    if (!userAddress) {
        showResult('❌ Please connect your wallet first', true);
        return;
    }
    
    try {
        storeButton.textContent = 'Storing...';
        storeButton.disabled = true;
        
        // Create transaction
        const transaction = await arweave.createTransaction({
            data: message
        });
        
        // Add tags
        transaction.addTag('Content-Type', 'text/plain');
        transaction.addTag('App-Name', 'MyFirstPermawebApp');
        transaction.addTag('App-Version', '1.0.0');
        transaction.addTag('Timestamp', Date.now().toString());
        
        // Sign transaction with Wander
        await window.arweaveWallet.sign(transaction);
        
        // Post transaction
        const response = await arweave.transactions.post(transaction);
        
        if (response.status === 200) {
            const txId = transaction.id;
            showResult(`
                ✅ Message stored permanently! 
                Transaction ID: ${txId}
                View at: https://arweave.net/${txId}
            `);
            messageInput.value = '';
        } else {
            throw new Error(`Transaction failed with status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Storage failed:', error);
        showResult(`❌ Storage failed: ${error.message}`, true);
    } finally {
        storeButton.textContent = 'Store on Arweave';
        storeButton.disabled = false;
    }
}

// Event listeners
connectButton.addEventListener('click', connectWallet);
storeButton.addEventListener('click', storeMessage);

// Initialize app
console.log('🌐 Permaweb app initialized!');
```

### Test Locally

Start your development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app running locally.

## Step 3: Deploy to the Permaweb (10 minutes)

### Build for Production

Create your production build:

```bash
npm run build
```

### Configure Deployment

Create `deploy.config.js` in your project root:

```javascript
export default {
    deployFolder: 'dist',
    indexFile: 'index.html',
    excludeFiles: [
        '**/.*',
        '**/*.map',
        '**/node_modules/**'
    ]
};
```

### Deploy Your Application

Deploy to the permaweb:

```bash
npm run deploy
```

Follow the prompts to:
1. Connect your Wander wallet
2. Confirm the transaction (check gas fees)
3. Wait for confirmation

After successful deployment, you'll receive:
- **Transaction ID**: Your app's permanent address
- **Permaweb URL**: `https://arweave.net/[transaction-id]`
- **Gateway URL**: Alternative access points

## Step 4: Understanding What You Built (5 minutes)

### Application Architecture

Your permaweb app consists of:

**Frontend Components:**
- **HTML**: Semantic structure with wallet integration
- **CSS**: Modern styling with glassmorphism effects
- **JavaScript**: Arweave SDK integration and wallet connectivity

**Permaweb Features:**
- **Permanent storage**: Your app will exist forever
- **Decentralized hosting**: No single point of failure
- **Wallet integration**: Direct blockchain interaction
- **Transaction capabilities**: Store data on-chain

### Key Technologies Used

- **Arweave**: Permanent storage blockchain
- **Wander**: Browser wallet for Arweave
- **Vite**: Modern build tool for fast development
- **Permaweb Deploy**: Simplified deployment tooling

### What Happens During Deployment

1. **Build process**: Vite bundles your code for production
2. **File preparation**: Static assets are prepared for upload
3. **Transaction creation**: Files are packaged into an Arweave transaction
4. **Signing**: Your wallet signs the transaction
5. **Network broadcast**: Transaction is sent to Arweave miners
6. **Confirmation**: Your app becomes permanently accessible

## Next Steps

Congratulations! You've successfully deployed your first permaweb application. Here are your next learning pathways:

### For Builders
- **Advanced wallet integration**: Implement multi-wallet support
- **Data persistence**: Build apps with permanent user data
- **Framework integration**: Use React, Vue, or Svelte with permaweb
- **Smart contracts**: Integrate with AO processes for backend logic

### For Explorers  
- **GraphQL querying**: Learn to query Arweave data efficiently
- **Data analysis**: Explore transaction patterns and network usage
- **Indexing services**: Use Goldsky for advanced data queries

### Troubleshooting

**Common Issues:**

| Problem | Solution |
|---------|----------|
| Wander not detected | Install Wander browser extension |
| Build fails | Check Node.js version (18+ required) |
| Deployment timeout | Ensure sufficient AR balance |
| Wallet won't connect | Refresh page and try again |

**Need Help?**
- Visit the [Arweave Discord](https://discord.gg/arweave)
- Check the [Permaweb Cookbook](https://cookbook.arweave.dev)
- Browse [community resources](/community/)

## Resources

- **Source code**: [View on GitHub](https://github.com/permaweb/cookbook-zero-deploy)
- **Live example**: [Demo application](https://arweave.net/example-tx-id)
- **Documentation**: [Arweave Developer Docs](https://docs.arweave.org)
- **Community**: [Arweave Builders Discord](https://discord.gg/arweave)

---

**Estimated cost**: 0.1-0.5 AR tokens (~$0.10-$0.50 USD)  
**Deployment time**: 2-5 minutes  
**Permanence**: Forever ♾️