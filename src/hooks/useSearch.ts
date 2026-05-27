"use client";

import { useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";

export function useSearch(initialValue = "") {
  const [search, setSearch] = useState(initialValue);
  const debouncedSearch = useDebounce(search, 300);

  return { search, setSearch, debouncedSearch };
}
