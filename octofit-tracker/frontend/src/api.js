const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(resource) { return `${apiBaseUrl}/api/${resource}/` }
export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs
  return []
}
export async function fetchEndpoint(endpoint, resource) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  return normalizeCollection(await response.json())
}
export const apiConfiguration = { baseUrl: apiBaseUrl, isCodespaces: Boolean(codespaceName) }
export { apiBaseUrl }