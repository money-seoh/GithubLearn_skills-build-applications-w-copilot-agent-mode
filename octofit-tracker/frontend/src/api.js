const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'

export function getApiUrl(resource) { return `${apiBaseUrl}/api/${resource}/` }
export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}
export async function fetchCollection(resource) { const response = await fetch(getApiUrl(resource)); if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`); return normalizeCollection(await response.json()) }
export const apiConfiguration = { baseUrl: apiBaseUrl, isCodespaces: Boolean(codespaceName) }