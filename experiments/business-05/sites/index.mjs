import { siteConfig as corporateConfig, pages as corporatePages } from "./corporate/site.mjs";
import { siteConfig as servicesConfig, pages as servicesPages } from "./professional-services/site.mjs";
import { siteConfig as catalogConfig, pages as catalogPages } from "./product-catalog/site.mjs";

export const archetypes = [
  { id: "corporate", label: "Corporate", root: new URL("./corporate/", import.meta.url), config: corporateConfig, pages: corporatePages },
  { id: "professional-services", label: "Professional services", root: new URL("./professional-services/", import.meta.url), config: servicesConfig, pages: servicesPages },
  { id: "product-catalog", label: "Product/catalog", root: new URL("./product-catalog/", import.meta.url), config: catalogConfig, pages: catalogPages }
];
