/** Resolve display label for a habit category id (from API-loaded categories list). */
export function habitCategoryLabel(categories, categoryId) {
  if (!categoryId || !Array.isArray(categories)) return '—'
  const c = categories.find((x) => x && x.id === categoryId)
  return c && typeof c.label === 'string' ? c.label : categoryId
}
