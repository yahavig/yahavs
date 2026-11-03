import { readFile } from "fs/promises";
import { join } from "path";

const EMPTY = { affiliate: true, groups: [] };

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
    if (!valid.length) return { affiliate, groups: [] };

    if (!categories.length) {
      return { affiliate, groups: [{ id: "all", label: null, products: valid }] };
    }

    const known = new Set(categories.map((c) => c.id));
    const groups = categories
      .map((c) => ({ id: c.id, label: c.label, products: valid.filter((p) => p.category === c.id) }))
      .filter((g) => g.products.length);

    const rest = valid.filter((p) => !known.has(p.category));
    if (rest.length) groups.push({ id: "other", label: "עוד", products: rest });

    return { affiliate, groups };
  } catch {
    return EMPTY;
  }
}
