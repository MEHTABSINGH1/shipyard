export type Category = "Board" | "Apparel" | "Gear" | "Accessory";

export type Product = {
  id: string; // lowercase-with-dashes, used as React key and URL segment
  name: string;
  price: number; // in USD
  category: Category;
  tagline: string;
  description: string;
  emoji: string;
  rating: number; // 0–5
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "wave-runner",
    name: "Wave Runner",
    price: 129,
    category: "Board",
    tagline: "A nimble shortboard for fast, punchy waves.",
    description:
      "Built from a lightweight epoxy core, the Wave Runner snaps through tight turns and holds its line on steep faces. Ideal for intermediate to advanced surfers.",
    emoji: "🏄",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "harbor-hoodie",
    name: "Harbor Hoodie",
    price: 59,
    category: "Apparel",
    tagline: "Heavyweight cotton for cold dock mornings.",
    description:
      "A brushed-fleece hoodie with a double-lined hood and kangaroo pocket. Pre-shrunk organic cotton keeps its shape wash after wash.",
    emoji: "🧥",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "anchor-bottle",
    name: "Anchor Bottle",
    price: 24,
    category: "Accessory",
    tagline: "Keeps drinks cold for 24 hours.",
    description:
      "Double-walled stainless steel with a leak-proof lid. Fits standard cup holders and survives drops onto the deck.",
    emoji: "🧴",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "tide-watch",
    name: "Tide Watch",
    price: 189,
    category: "Gear",
    tagline: "Live tide charts on your wrist.",
    description:
      "Water-resistant to 100 m with built-in tide tables for over 3,000 beaches, a moon-phase dial and a two-week battery.",
    emoji: "⌚",
    rating: 4.4,
    inStock: false,
  },
  {
    id: "sailor-cap",
    name: "Sailor Cap",
    price: 29,
    category: "Apparel",
    tagline: "Sun-faded canvas with a curved brim.",
    description:
      "Washed cotton canvas cap with an adjustable brass buckle strap. Gets better looking the more salt and sun it sees.",
    emoji: "🧢",
    rating: 4.2,
    inStock: true,
  },
  {
    id: "deck-lantern",
    name: "Deck Lantern",
    price: 45,
    category: "Gear",
    tagline: "Rechargeable light for night watches.",
    description:
      "A warm 300-lumen LED lantern with three brightness modes, USB-C charging and a hanging hook. Runs 40 hours on low.",
    emoji: "🏮",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "compass-key",
    name: "Compass Keyring",
    price: 15,
    category: "Accessory",
    tagline: "Never lose your bearings (or your keys).",
    description:
      "A working liquid-filled brass compass on a sturdy split ring. A small gift for anyone who loves the open water.",
    emoji: "🧭",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "dry-bag",
    name: "Dry Bag 20L",
    price: 35,
    category: "Gear",
    tagline: "Roll-top waterproof bag for kayak trips.",
    description:
      "Welded-seam PVC tarpaulin with a roll-top closure and shoulder strap. Floats when sealed and keeps gear bone dry.",
    emoji: "🎒",
    rating: 4.5,
    inStock: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
