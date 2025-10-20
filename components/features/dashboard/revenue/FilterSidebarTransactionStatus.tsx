import { FilterSidebarMultiSelect } from "./FilterSidebarMultiSelect";

const transactionStatus = [
  {
    label: "Successful",
    value: "successful",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Failed",
    value: "failed",
  },
];

function FilterSidebarTransactionStatus() {
  return (
    <FilterSidebarMultiSelect
      label="Transaction Status"
      placeholder="Select Transaction Status"
      items={transactionStatus}
      name="transactionStatus"
    />
  );
}

export default FilterSidebarTransactionStatus;
