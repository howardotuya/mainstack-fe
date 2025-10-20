import { FilterSidebarMultiSelect } from "./FilterSidebarMultiSelect";

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
  return (
    <FilterSidebarMultiSelect
      label="Transaction Type"
      placeholder="Select Transaction Type"
      items={transactionTypes}
      name="transactionTypes"
    />
  );
}

export default FilterSidebarTransactionType;
