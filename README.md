# URBAN VITAL — Official E-Commerce Website

Official e-commerce website for **URBAN VITAL**, a premium brand of children's multivitamin powders crafted exclusively from 100% natural ingredients without chemical preservatives or artificial sweeteners.

---

## 🌿 Brand Facts

- **100% Natural Resources**: Freeze-dried real strawberries, sprouted barley malt, heirloom criollo cocoa, and Bourbon vanilla pods.
- **Zero Preservatives**: 0% synthetic chemicals, zero artificial colorings or sweeteners.
- **Mixes with Water or Milk**: Dissolves smoothly in 10 seconds.
- **Net Weight**: 200g per pouch (20 full daily servings).

### The Four Variants:
1. **SPROUT** — *Strawberry Flavour* — Supports Growth & Immunity (Pink & Sage)
2. **GOLD** — *Malt Flavour* — Supports Bone & Heart Health (Amber & Gold)
3. **JUNIOR** — *Cocoa Flavour* — Supports Focus & Energy (Cocoa & Copper)
4. **CORE** — *Vanilla Flavour* — Daily Energy & Immunity (Cream & Gold)

---

## ✨ Features & Architecture

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS**
- **3D Tilt & Depth Parallax Hero**: GPU-accelerated interactive showcase reacting to cursor proximity with `translateZ` multi-layer parallax and specular sheen.
- **Design Tokens**: Strict semantic palette (`--cream`, `--ink`, `--berry`, `--leaf`, `--malt`, `--gold`, `--cocoa`, `--copper`, `--vanilla`) and Fraunces serif typography.
- **5 Signature Motifs**: Diagonal split dividers, pill badges, dark 3-claim ribbon, leaf markers, and organic splash curve masks.
- **Complete Shopping Experience**:
  - Home Page (`/`) with story sections, benefits, 3D Hero, and FAQs
  - Shop Listing Page (`/shop`) with pill filter chips and comparison matrix
  - Dynamic Product Detail (`/shop/[variant]`) with live zero-layout-shift variant switcher
  - Cart (`/cart`) with 5s polite Undo toast and free-shipping progress ribbon
  - Checkout (`/checkout`) with 3-step navigation, form validation, and receipt view

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
