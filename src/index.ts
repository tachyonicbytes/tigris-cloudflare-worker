/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Tigris } from "@tigrisdata/core";
import { Catalog } from "./db/models/catalog";

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

function add(a: number, b: number): number {
  return a + b;
}

async function tigrisMain() {
	const tigrisClient = new Tigris();
	await tigrisClient.getDatabase().initializeBranch();
	await tigrisClient.registerSchemas([Catalog]);

	const db = tigrisClient.getDatabase();
	const collection = db.getCollection<Catalog>(Catalog);
	const cursor = collection.findMany();
	const results = await cursor.toArray();
	return results.length;
}


export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		// return new Response("Hello World!");
		// const result = add(5, 3);
		const result = tigrisMain();

		// Create a response with the result
		const response = new Response(`The result of addition is ${result}`, {
			headers: { 'content-type': 'text/plain' },
		});

		return response;

	},
};
