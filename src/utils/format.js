export function formatMoney(num) {
  if (num >= 1_000_000) {
    return `₹${(num / 1_000_000).toFixed(2)} M`
  } else if (num >= 1_000) {
    return `₹${(num / 1_000).toFixed(2)} K`
  } else {
    return `₹${num.toFixed(2)}`
  }
}

export function formatNumber(num) {
  return num.toLocaleString('en-IN')
}

export function formatPercent(num) {
  return `${num.toFixed(2)}%`
}

