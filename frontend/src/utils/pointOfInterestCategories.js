const categoryLabels = {
  PARK: 'Parc',
  VIEWPOINT: 'Mirador',
  CULTURE: 'Cultura',
  TRANSPORT: 'Transport',
  SPORTS: 'Esports',
  PUBLIC_SERVICE: 'Servei públic',
  OTHER: 'Altres',
}

export function getPointOfInterestCategoryLabel(category) {
  return categoryLabels[category] || 'Altres'
}
