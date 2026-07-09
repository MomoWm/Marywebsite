import type { Product } from "@/lib/types";
import data from "./products.json";

/**
 * Product catalog. The data now lives in products.json so it can be edited
 * from the Pages CMS dashboard with no code — this file just types it.
 */
export const products = data as unknown as Product[];
