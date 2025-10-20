import { FilterSidebarMultiSelect } from "./FilterSidebarMultiSelect";
import { useFilterSidebar } from "./hooks/useFilterSidebar";

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
  const {
    draft: { transactionStatuses },
    setTransactionStatusesDraft,
  } = useFilterSidebar();

  return (
    <FilterSidebarMultiSelect
      label="Transaction Status"
      placeholder="Select Transaction Status"
      items={transactionStatus}
      name="transactionStatus"
      value={transactionStatuses}
      onChange={(values) => setTransactionStatusesDraft(values)}
    />
  );
}

export default FilterSidebarTransactionStatus;
