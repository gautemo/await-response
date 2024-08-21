type Method = 'HEAD' | 'GET'

/** Options to control how to wait for the response */
type Options = {
  /** Specify a HEAD or GET request. 
   * If not specified, defaults to 'GET' */
  method?: Method,
  /** Specify in milliseconds how often to request the URL. 
   * If not specified, defaults to 50 milliseconds */
  interval?: number,
  /** Specify in milliseconds when to timeout the waiting. 
   * If not specified, defaults to 300000 milliseconds */
  timeout?: number,
}

/**
* wait for succesfull response
*
* @param url The URL to request
* @param options Options to control how to wait for the response
* @returns The Promise with the response
*/
export function waitResponse(url: RequestInfo | URL, options?: Options): Promise<Response> {
  const timeout = options?.timeout ?? 60_000 * 5
  const interval = options?.interval ?? 50
  const method = options?.method ?? 'GET'
  return new Promise(async (resolve, reject) => {
    const startTimestamp = Date.now()
    while(true) {
      const response = await checkEndpoint(url, method, timeout - (Date.now() - startTimestamp))
      if(response) {
        return resolve(response)
      }
      await sleep(interval)
      if(Date.now() + interval >= startTimestamp + timeout) {
        return reject('awaitResponse timed out')
      }
    }
  })
}

async function checkEndpoint(url: RequestInfo | URL, method: Method, timeout: number): Promise<Response | null> {
  try {
    const response = await fetch(url, {
      method: method,
      signal: AbortSignal.timeout(timeout)
    })
    if(response.ok) {
      return response
    }
  } catch {}
  return null
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))