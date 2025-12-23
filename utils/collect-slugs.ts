import { TypeShort } from "@/types/category";

export function collectSlugs(category?: TypeShort): string[] {
  const slugs: string[] = [];

  if (!category) return slugs;

  if (category.slug) {
    slugs.push(category.slug);
  }

  const children = category.children || [];

  for (const child of children) {
    slugs.push(...collectSlugs(child));
  }

  return slugs;
}
