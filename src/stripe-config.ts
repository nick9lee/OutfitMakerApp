export const STRIPE_PRODUCTS = {
  OutfitMakerApp: {
    priceId: 'price_1RUuMxKiivHFmlp99Mo3JiE3',
    name: 'OutfitMakerApp',
    description: 'try on outfits',
    mode: 'subscription' as const,
  },
} as const;

export type ProductId = keyof typeof STRIPE_PRODUCTS;