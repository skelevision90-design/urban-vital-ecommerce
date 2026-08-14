import { PRODUCT_IMAGES } from "./productImages";

export { PRODUCT_IMAGES };

export interface ProductVariant {
  id: string;
  name: string; // SPROUT, GOLD, JUNIOR, CORE
  tagline: string;
  flavour: string;
  flavourLine: string;
  shortDesc: string;
  description: string;
  price: number;
  weight: string;
  packImage: string;
  accentColor: string; // Primary token
  accentSecondary: string; // Secondary token
  accentClass: string;
  badgeBg: string;
  glowColor: string;
  ingredients: string[];
  keyBenefits: { title: string; desc: string }[];
  nutritionFacts: { label: string; value: string }[];
  usageInstructions: string[];
  storageInfo: string;
  shippingInfo: string;
  rating: number;
  reviewsCount: number;
  colorName: string;
  heroChipDepth: number; // 40-90px for 3D parallax
}

export interface CurrencyConfig {
  symbol: string;
  code: string;
  name: string;
  freeShippingThreshold: number;
  standardShippingRate: number;
  expressShippingRate: number;
}

export const CURRENCY: CurrencyConfig = {
  symbol: "₹",
  code: "INR",
  name: "Indian Rupee",
  freeShippingThreshold: 999,
  standardShippingRate: 0,
  expressShippingRate: 99,
};

export const PRODUCTS: ProductVariant[] = [
  {
    id: "sprout",
    name: "SPROUT",
    tagline: "Supports Growth & Immunity",
    flavour: "Strawberry",
    flavourLine: "Strawberry Flavour",
    shortDesc: "Supports Growth & Immunity with real sun-ripened strawberry puree and immunity botanicals.",
    description: "Formulated specifically for growing bodies, SPROUT delivers essential vitamins and organic plant bioactives that strengthen daily immunity, support cellular growth, and fuel joyful childhood play.",
    price: 699,
    weight: "Net Wt. 200g",
    packImage: PRODUCT_IMAGES.sprout,
    accentColor: "#E2606B", // --berry
    accentSecondary: "#8CC79B", // --leaf
    accentClass: "sprout",
    badgeBg: "bg-[#E2606B]/15 text-[#2A2521] border-[#E2606B]/40",
    glowColor: "rgba(226, 96, 107, 0.28)",
    ingredients: [
      "Freeze-dried Real Strawberry Powder",
      "Organic Acerola Cherry (Natural Vitamin C)",
      "Plant-sourced Vitamin D3 & Zinc",
      "Moringa Oleifera Leaf Extract",
      "Prebiotic Chicory Root Inulin",
      "Natural Beetroot Extract (for color)"
    ],
    keyBenefits: [
      { title: "Immunity Shield", desc: "100% RDA of food-derived Vitamin C and bioavailable Zinc." },
      { title: "Growth Accelerator", desc: "Plant Vitamin D3 & clean micronutrients for skeletal strength." },
      { title: "Gentle Digestion", desc: "Prebiotic fiber that supports a happy gut microbiome." }
    ],
    nutritionFacts: [
      { label: "Vitamin C (from Acerola)", value: "45 mg (100% RDA)" },
      { label: "Vitamin D3 (Plant Lichen)", value: "400 IU (100% RDA)" },
      { label: "Zinc (Elemental)", value: "5 mg (70% RDA)" },
      { label: "Dietary Fiber", value: "2.4 g" },
      { label: "Added Sugar", value: "0 g (Zero)" }
    ],
    usageInstructions: [
      "Add 1 level scoop (10g) of powder into a clean glass.",
      "Pour 150ml of cold or warm water, milk, or oat drink.",
      "Stir briskly for 10 seconds or shake in a bottle until smooth. Drink immediately!"
    ],
    storageInfo: "Store in a cool, dry place away from direct sunlight. Seal zipper tightly after each scoop. Consume within 45 days of opening.",
    shippingInfo: "Ships within 24 hours in 100% recyclable, plastic-free packaging. Delivery in 2-4 business days across India.",
    rating: 4.9,
    reviewsCount: 384,
    colorName: "Pink & Sage",
    heroChipDepth: 45
  },
  {
    id: "gold",
    name: "GOLD",
    tagline: "Supports Bone & Heart Health",
    flavour: "Malt",
    flavourLine: "Malt Flavour",
    shortDesc: "Supports Bone & Heart Health with slow-roasted sprouted barley malt and marine calcium.",
    description: "A comforting, golden malt blend crafted with sprouted cereal grains, algae-sourced Calcium, Vitamin K2 (MK-7), and Magnesium to build unbreakable bones and resilient cardiovascular vitality in active kids.",
    price: 749,
    weight: "Net Wt. 200g",
    packImage: PRODUCT_IMAGES.gold,
    accentColor: "#C0812F", // --malt
    accentSecondary: "#D9A84E", // --gold
    accentClass: "gold",
    badgeBg: "bg-[#C0812F]/15 text-[#2A2521] border-[#C0812F]/40",
    glowColor: "rgba(192, 129, 47, 0.28)",
    ingredients: [
      "Slow-Roasted Sprouted Barley Malt",
      "Aquamin Organic Marine Calcium (from Red Algae)",
      "Natural Vitamin K2 (Menaquinone-7)",
      "Sesame Seed Extract & Magnesium Glycinate",
      "Organic Cardamom Pod Powder"
    ],
    keyBenefits: [
      { title: "Bone Density & Strength", desc: "Plant calcium absorbed 2.4x better than rock-derived chalk." },
      { title: "Heart & Muscle Harmony", desc: "Magnesium and Vitamin K2 that guides calcium straight to bones." },
      { title: "Nourishing Energy", desc: "Complex wholefood malt carbs for sustained schoolyard stamina." }
    ],
    nutritionFacts: [
      { label: "Calcium (Aquamin Algae)", value: "350 mg (60% RDA)" },
      { label: "Vitamin K2 (MK-7)", value: "35 mcg (80% RDA)" },
      { label: "Magnesium", value: "80 mg (40% RDA)" },
      { label: "Protein (Natural Malt)", value: "3.2 g" },
      { label: "Preservatives", value: "0% (Zero)" }
    ],
    usageInstructions: [
      "Scoop 1 level spoonful (10g) into warm or chilled milk.",
      "Whisk or shake for a creamy, rich malt drink.",
      "Perfect with morning breakfast or right after evening sports."
    ],
    storageInfo: "Keep pouch sealed in ambient room temperature. Protect from steam and moisture.",
    shippingInfo: "Dispatched direct from our clean room facility. Fast pan-India delivery.",
    rating: 4.8,
    reviewsCount: 298,
    colorName: "Amber & Gold",
    heroChipDepth: 85
  },
  {
    id: "junior",
    name: "JUNIOR",
    tagline: "Supports Focus & Energy",
    flavour: "Cocoa",
    flavourLine: "Cocoa Flavour",
    shortDesc: "Supports Focus & Energy with single-origin unalkalized cocoa and brain-nourishing omegas.",
    description: "Formulated for sharp focus, classroom alertness, and boundless joyful energy. Crafted with pure heritage Criollo cocoa beans, vegetarian DHA from microalgae, and active B-Complex vitamins.",
    price: 729,
    weight: "Net Wt. 200g",
    packImage: PRODUCT_IMAGES.junior,
    accentColor: "#4A2C1F", // --cocoa
    accentSecondary: "#B4643C", // --copper
    accentClass: "junior",
    badgeBg: "bg-[#4A2C1F]/15 text-[#2A2521] border-[#B4643C]/40",
    glowColor: "rgba(180, 100, 60, 0.28)",
    ingredients: [
      "Cold-Pressed Heirloom Cocoa Powder (Raw & Unsweetened)",
      "Microalgae-derived DHA Omega-3",
      "B-Vitamin Complex from Organic Quinoa Sprouts",
      "Brahmi (Bacopa Monnieri) Standardized Extract",
      "Ceylon Cinnamon Bark Extract"
    ],
    keyBenefits: [
      { title: "Cognitive Focus & Memory", desc: "Natural DHA and Brahmi for memory retention and curiosity." },
      { title: "Cellular Energy Release", desc: "Active food B-Complex that turns meals into steady vitality." },
      { title: "Rich Chocolate Indulgence", desc: "Guilt-free velvety cocoa taste kids eagerly ask for every day." }
    ],
    nutritionFacts: [
      { label: "Algal DHA Omega-3", value: "100 mg" },
      { label: "Vitamin B-Complex (B1, B2, B6, B12)", value: "100% RDA" },
      { label: "Iron (from Curry Leaf)", value: "6 mg (50% RDA)" },
      { label: "Raw Flavanols", value: "120 mg" },
      { label: "Chemical Flavours", value: "0% (Zero)" }
    ],
    usageInstructions: [
      "Mix 1 scoop (10g) in 180ml of milk, oat milk, or smoothie.",
      "Stir until dissolved into silky hot or cold chocolate.",
      "Enjoy before study hours or morning school prep."
    ],
    storageInfo: "Store in a dry cupboard away from heat. Reseal zipper immediately.",
    shippingInfo: "Packaged in airtight foil barrier pouch for fresh aroma retention.",
    rating: 4.9,
    reviewsCount: 421,
    colorName: "Cocoa & Copper",
    heroChipDepth: 60
  },
  {
    id: "core",
    name: "CORE",
    tagline: "Daily Energy & Immunity",
    flavour: "Vanilla",
    flavourLine: "Vanilla Flavour",
    shortDesc: "Daily Energy & Immunity with real Madagascar Bourbon vanilla beans and 18 essential micronutrients.",
    description: "The foundational daily multivitamin powder for every child's breakfast ritual. Infused with aromatic cured vanilla pods, 18 bio-fermented vitamins, and prebiotic oligosaccharides.",
    price: 689,
    weight: "Net Wt. 200g",
    packImage: PRODUCT_IMAGES.core,
    accentColor: "#E9DABC", // --vanilla
    accentSecondary: "#D9A84E", // --gold
    accentClass: "core",
    badgeBg: "bg-[#D9A84E]/20 text-[#2A2521] border-[#D9A84E]/50",
    glowColor: "rgba(217, 168, 78, 0.28)",
    ingredients: [
      "Real Ground Madagascar Bourbon Vanilla Beans",
      "Organic Guava, Lemon, & Holy Basil Vitamin Extracts",
      "Plant Vitamin A (Beta-Carotene) & Vitamin E",
      "Colostrum-like Plant Bio-actives",
      "Organic Tapioca Prebiotic Starch"
    ],
    keyBenefits: [
      { title: "Complete 18-Vitamin Spectrum", desc: "Balances nutritional gaps from picky eating habits." },
      { title: "All-Day Resilient Energy", desc: "No sugar spikes, no crashes — pure sustained daily balance." },
      { title: "Subtle Smooth Flavour", desc: "Pairs effortlessly with water, milk, curd, or breakfast cereal." }
    ],
    nutritionFacts: [
      { label: "Total Vitamins & Minerals", value: "18 Organic Sourced" },
      { label: "Vitamin A (Beta Carotene)", value: "350 mcg (85% RDA)" },
      { label: "Vitamin E (Sunflower)", value: "7 mg (100% RDA)" },
      { label: "Folate (Organic Lemon Peel)", value: "150 mcg (100% RDA)" },
      { label: "Artificial Sweeteners", value: "0% (Zero)" }
    ],
    usageInstructions: [
      "Stir 1 scoop (10g) into plain water, milk, or bowl of porridge.",
      "Blends effortlessly with zero clumps.",
      "Great morning starter for children aged 2 to 14."
    ],
    storageInfo: "Store in a cool dry space. Avoid wet spoons inside the pouch.",
    shippingInfo: "Fast tracked courier with real-time SMS tracking updates.",
    rating: 4.9,
    reviewsCount: 312,
    colorName: "Cream & Gold",
    heroChipDepth: 75
  }
];

export const BRAND_CLAIMS = [
  {
    title: "100% Natural",
    desc: "Made strictly from real fruits, herbs, seeds & organic botanicals.",
    icon: "natural"
  },
  {
    title: "No Preservatives",
    desc: "Zero chemical preservatives, zero artificial sweeteners or synthetic dyes.",
    icon: "preservatives"
  },
  {
    title: "Mixes with Water or Milk",
    desc: "Instantly soluble in 10 seconds without grit or stubborn clumps.",
    icon: "mixes"
  }
];

export const PARENT_TESTIMONIALS = [
  {
    quote: "My 6-year-old was notoriously picky and caught every seasonal cold. Since starting SPROUT Strawberry in her morning milk 4 months ago, she hasn't missed a single day of school. Plus, she actually asks for it!",
    author: "Ananya Sharma",
    childAge: "Mother of Kiara, 6 yrs",
    variant: "SPROUT Strawberry",
    location: "Bengaluru",
    rating: 5,
    verified: true
  },
  {
    quote: "Finding a children's multivitamin without sugar or synthetic junk seemed impossible until we found Urban Vital. GOLD Malt tastes just like traditional wholesome malt drinks without any chemicals. Huge fan.",
    author: "Dr. Rohan Mukherjee",
    childAge: "Father & Paediatrician, Aarav, 8 yrs",
    variant: "GOLD Malt",
    location: "Mumbai",
    rating: 5,
    verified: true
  },
  {
    quote: "JUNIOR Cocoa is our secret weapon before school homework hours! His focus is noticeably sharper, and as a parent, knowing every milligram comes from wholefood cocoa and clean DHA gives me complete peace of mind.",
    author: "Pooja Venkatesh",
    childAge: "Mother of Reyansh, 9 yrs",
    variant: "JUNIOR Cocoa",
    location: "Hyderabad",
    rating: 5,
    verified: true
  }
];

export const FAQS = [
  {
    question: "What age group is Urban Vital multivitamin powder suitable for?",
    answer: "Urban Vital is crafted specifically for growing children aged 2 to 14 years. Our calibrated dosages provide balanced daily nutrition from natural food sources that gently nourish both toddlers and older school-age kids."
  },
  {
    question: "How is Urban Vital different from common drugstore multivitamins?",
    answer: "Most commercial syrups and gummies are packed with up to 40% refined sugar, glucose syrup, synthetic petroleum-derived vitamins, and chemical preservatives. Urban Vital uses 100% real food extracts — freeze-dried fruits, sprouted grains, clean botanicals, and zero synthetic fillers."
  },
  {
    question: "Can I mix it in cold water or only milk?",
    answer: "You can mix it into cold water, warm water, cow's milk, almond/oat milk, or even swirl it into morning oatmeal and yogurt! It dissolves smoothly in 10 seconds."
  },
  {
    question: "How long does one 200g pouch last?",
    answer: "Each pouch contains 200g of powder, providing 20 full daily servings (10g scoop included). For daily use, one pouch lasts 3-4 weeks per child."
  }
];
