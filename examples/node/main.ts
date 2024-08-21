import { createApp, defineEventHandler, toNodeListener } from "h3";
import { waitResponse } from '../../src/index.ts'
import { createServer } from "node:http";

const app = createApp();

app.use(defineEventHandler(() => "Hello world!"));

testAwait()
await sleep(2000)

createServer(toNodeListener(app)).listen(8080)

async function testAwait() {
  await waitResponse('http://localhost:8080/')
  console.log('found')
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}