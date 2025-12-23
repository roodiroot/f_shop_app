import { SelectedFilters } from "@/hooks/use-catalog-filters";

export const buildTextFilters = (selected: SelectedFilters) => {
  const f: any = {};
  for (const [field, values] of Object.entries(selected)) {
    if (!values?.length) continue;
    f[field] = { in: values };
  }
  return f;
};
