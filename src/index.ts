type Method = 'HEAD' | 'GET'

type Options = {
  method?: Method,
  interval?: number,
  timeout?: number,
}

export function awaitResponse(url: RequestInfo | URL, options?: Options): Promise<boolean> {
  const timeout = options?.timeout ?? 60_000 * 5
  const interval = options?.interval ?? 50
  const method = options?.method ?? 'GET'
  return new Promise(async (resolve, reject) => {
    const startTimestamp = Date.now()
    while(true) {
      const found = await checkEndpoint(url, method, timeout - (Date.now() - startTimestamp))
      if(found) {
        return resolve(true)
      }
      await sleep(interval)
      if(Date.now() + interval >= startTimestamp + timeout) {
        return reject('awaitResponse timed out')
      }
    }
  })
}

async function checkEndpoint(url: RequestInfo | URL, method: Method, timeout: number) {
  try {
    const response = await fetch(url, {
      method: method,
      signal: AbortSignal.timeout(timeout)
    })
    return response.ok
  } catch {}
  return false
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))