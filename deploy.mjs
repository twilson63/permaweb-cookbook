import Bundlr from "@bundlr-network/client";
import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import fs from "fs";
import Arweave from "arweave";

const ANT = "YcUbL7_j2DLxvMX0dqOu8N73mrcCRzovsE5Mw22uLmc";
const arweave = Arweave.init({ host: "arweave.net", port: 443, protocol: "https" });
//const jwk = JSON.parse(fs.readFileSync('../wallet.json', 'utf-8'))
const jwk = JSON.parse(Buffer.from(process.env.COOKBOOK, "base64").toString("utf-8"));

const bundlr = new Bundlr.default("https://node2.irys.xyz", "arweave", jwk);
const warp = WarpFactory.custom(arweave, defaultCacheOptions, "mainnet").useArweaveGateway().build();

const contract = warp.contract(ANT).connect(jwk);
// upload folder
const result = await bundlr.uploadFolder("./src/.vitepress/dist", {
	indexFile: "index.html",
});
console.log('manifest id:', result.id)

// update ANT

await contract.writeInteraction({
	function: "setRecord",
	subDomain: "@",
	transactionId: result.id,
});

console.log("Deployed Cookbook, please wait 20 - 30 minutes for ArNS to update!");
