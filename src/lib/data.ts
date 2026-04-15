import productWhiteTee from "@/assets/product-white-tee.jpg";
import productBlackTee from "@/assets/product-black-tee.jpg";
import productNavyTee from "@/assets/product-navy-tee.jpg";
import productOliveTee from "@/assets/product-olive-tee.jpg";
import productGreyTee from "@/assets/product-grey-tee.jpg";
import productBurgundyTee from "@/assets/product-burgundy-tee.jpg";
import productSandTee from "@/assets/product-sand-tee.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  colorHex: string;
  sizes: string[];
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export const products: Product[] = [
  {
    id: "essential-black",
    name: "Essential Black Tee",
    price: 49,
    description: "Crafted from 100% organic Pima cotton, the Essential Black Tee offers an unparalleled softness with a refined fit. A wardrobe staple reimagined with premium materials and meticulous construction.",
    color: "Black",
    colorHex: "#1a1a1a",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: productBlackTee,
    category: "essentials",
    rating: 4.9,
    reviewCount: 128,
    featured: true,
  },
  {
    id: "essential-white",
    name: "Essential White Tee",
    price: 49,
    description: "Pure, minimal, and effortlessly elegant. Our Essential White Tee is cut from heavyweight organic cotton with a relaxed silhouette that drapes beautifully.",
    color: "White",
    colorHex: "#f5f5f0",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: productWhiteTee,
    category: "essentials",
    rating: 4.8,
    reviewCount: 95,
    featured: true,
  },
  {
    id: "classic-navy",
    name: "Classic Navy Tee",
    price: 55,
    description: "Deep navy dyed with eco-conscious processes. The Classic Navy features a slightly oversized cut with reinforced seams for lasting durability.",
    color: "Navy",
    colorHex: "#1b2a4a",
    sizes: ["S", "M", "L", "XL"],
    image: productNavyTee,
    category: "classic",
    rating: 4.7,
    reviewCount: 72,
    featured: true,
  },
  {
    id: "heritage-olive",
    name: "Heritage Olive Tee",
    price: 55,
    description: "Military-inspired olive with a modern edge. Garment-dyed for a unique, lived-in look that gets better with every wash.",
    color: "Olive",
    colorHex: "#5c6b3c",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: productOliveTee,
    category: "heritage",
    rating: 4.6,
    reviewCount: 54,
    featured: false,
  },
  {
    id: "minimal-grey",
    name: "Minimal Grey Tee",
    price: 49,
    description: "The perfect mid-tone grey. Understated and versatile, this tee pairs with everything. Made from a proprietary cotton-modal blend for exceptional comfort.",
    color: "Grey",
    colorHex: "#9a9a9a",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: productGreyTee,
    category: "essentials",
    rating: 4.8,
    reviewCount: 86,
    featured: false,
  },
  {
    id: "statement-burgundy",
    name: "Statement Burgundy Tee",
    price: 59,
    description: "Rich burgundy with depth and character. A statement piece that elevates any outfit. Premium ring-spun cotton with a brushed interior for added warmth.",
    color: "Burgundy",
    colorHex: "#6b1d2a",
    sizes: ["S", "M", "L", "XL"],
    image: productBurgundyTee,
    category: "statement",
    rating: 4.7,
    reviewCount: 41,
    featured: true,
  },
  {
    id: "desert-sand",
    name: "Desert Sand Tee",
    price: 52,
    description: "Warm sand tones inspired by desert landscapes. This relaxed-fit tee features dropped shoulders and a slightly elongated body for a contemporary silhouette.",
    color: "Sand",
    colorHex: "#c4a882",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: productSandTee,
    category: "heritage",
    rating: 4.5,
    reviewCount: 38,
    featured: false,
  },
];

export const reviews: Review[] = [
  { id: "r1", author: "Alex M.", rating: 5, date: "2026-03-15", text: "The quality is insane. Best t-shirt I've ever owned — the fabric feels incredible against the skin." },
  { id: "r2", author: "Jordan K.", rating: 5, date: "2026-03-10", text: "Finally, a brand that gets it. Minimal design, premium quality. Ordered 3 more colors immediately." },
  { id: "r3", author: "Sam R.", rating: 4, date: "2026-02-28", text: "Great fit and excellent material. Slightly pricey but worth every penny for the quality." },
  { id: "r4", author: "Casey L.", rating: 5, date: "2026-02-20", text: "These tees have completely replaced everything else in my wardrobe. Obsessed." },
  { id: "r5", author: "Riley T.", rating: 5, date: "2026-02-15", text: "The attention to detail is remarkable. Even the packaging feels premium." },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
