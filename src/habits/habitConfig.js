/** Habit IDs and copy — keep IDs stable for localStorage. */
export const HABITS = [
  {
    id: 'spar',
    label: 'No Spar visits',
    category: 'finance',
    description: 'Avoid Spar; shop at Tesco, Lidl, or Aldi only.',
  },
  {
    id: 'bigshop',
    label: 'Planned weekly shop',
    category: 'finance',
    description: 'One big supermarket shop per week, not frequent top-ups.',
  },
  {
    id: 'amazon',
    label: 'No impulse Amazon',
    category: 'finance',
    description: 'Wishlist + 48h wait before buying.',
  },
  {
    id: 'workout',
    label: 'Home workout done',
    category: 'health',
    description: 'Any exercise counts (replaces gym).',
  },
  {
    id: 'subs',
    label: 'No unused streaming',
    category: 'mindset',
    description: 'Watch actively or cancel. Netflix, Disney+, YouTube Premium, Crunchyroll, Prime.',
  },
  {
    id: 'save',
    label: 'Spent within budget',
    category: 'finance',
    description: 'Discretionary spend was intentional and planned today.',
  },
]

export const CATEGORY_LABELS = {
  finance: 'Finance',
  health: 'Health',
  mindset: 'Mindset',
}
