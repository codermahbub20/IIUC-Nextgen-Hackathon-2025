import type { Deal, DealPriority, DealStage } from "../../types/type"


export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value)
}

export const formatDate = (date?: string) => {
  if (!date) return "Not set"
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const getPriorityColor = (priority: DealPriority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-blue-100 text-blue-700"
  }
}

export const getTotalValue = (deals: Deal[], stage?: DealStage) => {
  const dealsToSum = stage ? deals.filter((d) => d.stage === stage) : deals
  return dealsToSum.reduce((sum, deal) => sum + deal.value, 0)
}

export const getWeightedValue = (deals: Deal[]) => {
  return deals
    .filter((d) => !["closed-won", "closed-lost"].includes(d.stage))
    .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0)
}
