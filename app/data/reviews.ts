export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string; // ISO yyyy-mm-dd
};

export const reviews: Review[] = [
  { id: "r1", productId: "wave-runner", author: "Kai", rating: 5, title: "Fast and loose", body: "Turns on a dime and paddles better than my old board. Holding up great after a season.", date: "2026-08-14" },
  { id: "r2", productId: "wave-runner", author: "Mara", rating: 4, title: "Great for small days", body: "Really fun in waist-high surf. A bit twitchy when it gets bigger, but that's a shortboard for you.", date: "2026-07-02" },
  { id: "r3", productId: "wave-runner", author: "Dev", rating: 5, title: "Worth every dollar", body: "Light, strong, and the finish is beautiful.", date: "2026-06-21" },
  { id: "r4", productId: "harbor-hoodie", author: "Priya", rating: 5, title: "Warmest hoodie I own", body: "Thick without being stiff. Hood actually stays on in the wind.", date: "2026-10-03" },
  { id: "r5", productId: "harbor-hoodie", author: "Tom", rating: 4, title: "Runs slightly large", body: "Size down if you like a fitted look. Quality is excellent.", date: "2026-09-11" },
  { id: "r6", productId: "anchor-bottle", author: "Lena", rating: 5, title: "Ice still there next day", body: "Left it in a hot car and the ice survived. Impressive.", date: "2026-08-30" },
  { id: "r7", productId: "anchor-bottle", author: "Sam", rating: 5, title: "Survived a drop on the dock", body: "Small dent, zero leaks.", date: "2026-07-19" },
  { id: "r8", productId: "anchor-bottle", author: "Ade", rating: 4, title: "Solid bottle", body: "Lid is a little tight at first but loosens up.", date: "2026-05-08" },
  { id: "r9", productId: "tide-watch", author: "Rui", rating: 5, title: "Tide tables are spot on", body: "Matches the harbour board every time. Battery easily lasts two weeks.", date: "2026-09-27" },
  { id: "r10", productId: "tide-watch", author: "Hana", rating: 4, title: "Love it, wish it was back in stock", body: "Bought one for my partner and now I want my own.", date: "2026-08-05" },
  { id: "r11", productId: "sailor-cap", author: "Jo", rating: 4, title: "Classic look", body: "Fades nicely in the sun. The buckle is a nice touch.", date: "2026-07-25" },
  { id: "r12", productId: "sailor-cap", author: "Felix", rating: 4, title: "Comfortable", body: "Light enough for a full day on the water.", date: "2026-06-12" },
  { id: "r13", productId: "deck-lantern", author: "Nora", rating: 5, title: "Perfect anchor light", body: "Warm light that doesn't ruin your night vision. Charges quickly over USB-C.", date: "2026-10-10" },
  { id: "r14", productId: "deck-lantern", author: "Omar", rating: 4, title: "Bright and tough", body: "Survived a rainy weekend without issues.", date: "2026-09-01" },
  { id: "r15", productId: "compass-key", author: "Bea", rating: 4, title: "Cute gift", body: "Compass actually works. Gave a few away as gifts.", date: "2026-08-18" },
  { id: "r16", productId: "compass-key", author: "Luis", rating: 5, title: "Never losing my keys", body: "Heavy enough that I always notice it in my pocket.", date: "2026-04-29" },
  { id: "r17", productId: "dry-bag", author: "Ines", rating: 5, title: "Bone dry after a capsize", body: "Flipped the kayak twice, phone and lunch stayed dry.", date: "2026-09-15" },
  { id: "r18", productId: "dry-bag", author: "Kofi", rating: 4, title: "Great size", body: "20L fits a change of clothes, towel and snacks.", date: "2026-07-07" },
];

export function getReviews(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}
