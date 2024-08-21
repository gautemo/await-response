import { createApp, defineEventHandler, toWebHandler } from "h3";
import { waitResponse } from '../../src/index.ts'

const app = createApp();

app.use(defineEventHandler(() => "Hello world!"));

testAwait()
await sleep(2000)

Deno.serve({ port: 8080 }, toWebHandler(app) as unknown as Deno.ServeHandler)

async function testAwait() {
  await waitResponse('http://localhost:8080/')
  console.log('found')
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}