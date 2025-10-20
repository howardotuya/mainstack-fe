import { FilterSidebarMultiSelect } from "./FilterSidebarMultiSelect";
import { useFilterSidebar } from "./hooks/useFilterSidebar";

const transactionTypes = [
  {
    label: "Store Transactions",
    value: "store_transactions",
  },
  {
    label: "Get Tipped",
    value: "get_tipped",
  },
  {
    label: "Withdrawals",
    value: "withdrawals",
  },
  {
    label: "Chargebacks",
    value: "chargebacks",
  },
  {
    label: "Cashbacks",
    value: "cashbacks",
  },
  {
    label: "Refer & Earn",
    value: "refer_and_earn",
  },
];

function FilterSidebarTransactionType() {
  const {
    draft: { transactionTypes: selectedTypes },
    setTransactionTypesDraft,
  } = useFilterSidebar();

  return (
    <FilterSidebarMultiSelect
      label="Transaction Type"
      placeholder="Select Transaction Type"
      items={transactionTypes}
      name="transactionTypes"
      value={selectedTypes}
      onChange={(values) => setTransactionTypesDraft(values)}
    />
  );
}

export default FilterSidebarTransactionType;
