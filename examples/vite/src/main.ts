import { waitResponse } from '../../../src/index.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `looking for localhost:5173`

await waitResponse('http://localhost:5173/')

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `found`
