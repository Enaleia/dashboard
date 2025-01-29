import { TableItem, SortState } from "@/types";

export const processTableData = (
  data: TableItem[],
  partnerType: string,
  sortState: SortState
) => {
  return [...data]
    .filter(record => partnerType === 'See all' || record.type === partnerType)
    .sort((a, b) => {
      if (sortState.criteria === 'action_count') {
        return sortState.isAscending ? a.action_count - b.action_count : b.action_count - a.action_count;
      }
      return sortState.isAtoZ ? a.country.localeCompare(b.country) : b.country.localeCompare(a.country);
    });
};