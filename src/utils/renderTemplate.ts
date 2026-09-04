/**
 * Substitui {{placeholders}} no corpo do contrato pelos valores do formulário.
 * Placeholders ainda não preenchidos aparecem em destaque.
 */
export function renderTemplate(
  body: string,
  data: Record<string, string>,
  highlight = false
): string {
  return body.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = data[key]?.trim()
    if (value) return value
    if (highlight) return `<mark class="placeholder">${match}</mark>`
    return match
  })
}

/**
 * Conta quantos placeholders ainda não foram preenchidos.
 */
export function countMissingFields(body: string, data: Record<string, string>): number {
  const matches = body.match(/\{\{(\w+)\}\}/g) ?? []
  const unique = [...new Set(matches)]
  return unique.filter(m => {
    const key = m.replace(/\{\{|\}\}/g, '')
    return !(data[key]?.trim())
  }).length
}
