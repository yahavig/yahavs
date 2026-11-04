import { readFile } from "fs/promises";
import { join } from "path";

const EMPTY = { affiliate: true, groups: [], featured: [] };
const EMPTY_WITH = (affiliate) => ({ ...EMPTY, affiliate });

/**
 * Reads content/shop.json and returns products grouped by category,
 * in the order the categories are declared. Products without a known
 * category are collected into a trailing group.
 */
export async function getShop() {
  try {
    const raw = await readFile(join(process.cwd(), "content", "shop.json"), "utf-8");
    const { affiliate = true, categories = [], products = [] } = JSON.parse(raw);

    // https/http only — never render a link with another scheme.
    const valid = products.filter((p) => p?.title && /^https?:\/\//i.test(p?.url ?? ""));
    if (!valid.length) return EMPTY_WITH(affiliate);

    const featured = valid
      .filter((p) => p.featured)
      .sort((a, b) => Number(a.featured) - Number(b.featured));

    if (!categories.length) {
      return { affiliate, featured, groups: [{ id: "all", label: null, products: valid }] };
    }

    const known = new Set(categories.map((c) => c.id));
    const groups = categories
      .map((c) => ({ id: c.id, label: c.label, products: valid.filter((p) => p.category === c.id) }))
      .filter((g) => g.products.length);

    const rest = valid.filter((p) => !known.has(p.category));
    if (rest.length) groups.push({ id: "other", label: "עוד", products: rest });

    return { affiliate, featured, groups };
  } catch {
    return EMPTY;
  }
}
