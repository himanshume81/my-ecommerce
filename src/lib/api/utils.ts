export type ApiListResponse<T> = T[] | { data?: T[]; items?: T[] };

export function getListItems<T>(response: ApiListResponse<T>): T[] {
  return Array.isArray(response) ? response : response.items ?? response.data ?? [];
}
