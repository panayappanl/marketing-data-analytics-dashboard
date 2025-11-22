export function calculateCTR(clicks, impressions) {
  if (impressions === 0) {
    return 0
  }
  return (clicks / impressions) * 100
}

