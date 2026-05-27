import { NextRequest, NextResponse } from "next/server";

import { requireBearerAuth, withSecurityHeaders } from "@/lib/auth";
import { getProducts } from "@/lib/mock-db";
import { sanitizeText } from "@/lib/utils";
import { productQuerySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  if (!requireBearerAuth(request)) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = productQuerySchema.safeParse(query);

  if (!parsed.success) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Invalid query parameters." }, { status: 400 }),
    );
  }

  const { search, category, status, page, limit } = parsed.data;
  let products = getProducts();

  if (search) {
    const keyword = sanitizeText(search).toLowerCase();
    products = products.filter((product) =>
      [product.name, product.description, product.sku, product.category].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }

  if (category) products = products.filter((product) => product.category === category);
  if (status) products = products.filter((product) => product.status === status);

  products = [...products].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = products.slice(start, start + limit);

  return withSecurityHeaders(
    NextResponse.json(
      { data, total, page, totalPages },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      },
    ),
  );
}
