"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TIMELINE_PARAM = "timeline";
const START_DATE_PARAM = "start_date";
const END_DATE_PARAM = "end_date";
const TRANSACTION_TYPES_PARAM = "transaction_types";
const TRANSACTION_STATUS_PARAM = "transaction_status";

const ROUTED_ARRAY_SEPARATOR = ",";

const parseArrayParam = (value: string | null): string[] => {
  if (!value) return [];

  return value
    .split(ROUTED_ARRAY_SEPARATOR)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const serializeArrayParam = (
  value: string[] | null | undefined
): string | null => {
  if (!value || value.length === 0) {
    return null;
  }

  return value.join(ROUTED_ARRAY_SEPARATOR);
};

const formatDateParam = (date?: Date | null): string | null => {
  if (!date) return null;

  // Use the ISO date (YYYY-MM-DD) for stability across timezones.
  return date.toISOString().split("T")[0] ?? null;
};

const parseDateParam = (value: string | null): Date | undefined => {
  if (!value) return undefined;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    const fallback = new Date(`${value}T00:00:00`);
    return Number.isNaN(fallback.getTime()) ? undefined : fallback;
  }

  return parsed;
};

const buildSearchParams = (
  existing: Readonly<URLSearchParams>,
  updates: Record<string, string | null>
) => {
  const params = new URLSearchParams(existing.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  return params;
};

type DraftState = {
  timeline: string | null;
  startDate?: Date;
  endDate?: Date;
  transactionTypes: string[];
  transactionStatuses: string[];
};

type AppliedState = {
  timeline: string | null;
  startDate?: Date;
  endDate?: Date;
  transactionTypes: string[];
  transactionStatuses: string[];
};

export type UseFilterSidebarResult = {
  applied: AppliedState;
  draft: DraftState;
  setTimelineDraft: (value: string | null) => void;
  setStartDateDraft: (date?: Date | null) => void;
  setEndDateDraft: (date?: Date | null) => void;
  setTransactionTypesDraft: (value: string[]) => void;
  setTransactionStatusesDraft: (value: string[]) => void;
  applyFilters: () => void;
  resetDraft: () => void;
  clearFilters: () => void;
  isDirty: boolean;
  hasActiveFilters: boolean;
  activeFilterCount: number;
};

const FilterSidebarContext = createContext<UseFilterSidebarResult | undefined>(
  undefined
);

const useFilterSidebarState = (): UseFilterSidebarResult => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timelineParam = searchParams.get(TIMELINE_PARAM);
  const startDateParam = searchParams.get(START_DATE_PARAM);
  const endDateParam = searchParams.get(END_DATE_PARAM);
  const transactionTypesParam = searchParams.get(TRANSACTION_TYPES_PARAM);
  const transactionStatusParam = searchParams.get(TRANSACTION_STATUS_PARAM);

  const appliedTimeline = timelineParam;
  const appliedStartDate = useMemo(
    () => parseDateParam(startDateParam),
    [startDateParam]
  );

  const appliedEndDate = useMemo(
    () => parseDateParam(endDateParam),
    [endDateParam]
  );

  const appliedTransactionTypes = useMemo(
    () => parseArrayParam(transactionTypesParam),
    [transactionTypesParam]
  );

  const appliedTransactionStatuses = useMemo(
    () => parseArrayParam(transactionStatusParam),
    [transactionStatusParam]
  );

  const [timelineDraft, setTimelineDraft] = useState<string | null>(
    appliedTimeline
  );
  const [startDateDraft, setStartDateDraft] = useState<Date | undefined>(
    appliedStartDate
  );
  const [endDateDraft, setEndDateDraft] = useState<Date | undefined>(
    appliedEndDate
  );
  const [transactionTypesDraft, setTransactionTypesDraft] = useState<string[]>(
    appliedTransactionTypes
  );
  const [transactionStatusesDraft, setTransactionStatusesDraft] = useState<
    string[]
  >(appliedTransactionStatuses);

  useEffect(() => {
    setTimelineDraft(appliedTimeline);
  }, [appliedTimeline]);

  useEffect(() => {
    setStartDateDraft(appliedStartDate);
  }, [appliedStartDate]);

  useEffect(() => {
    setEndDateDraft(appliedEndDate);
  }, [appliedEndDate]);

  useEffect(() => {
    setTransactionTypesDraft(appliedTransactionTypes);
  }, [appliedTransactionTypes]);

  useEffect(() => {
    setTransactionStatusesDraft(appliedTransactionStatuses);
  }, [appliedTransactionStatuses]);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = buildSearchParams(searchParams, updates);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams]
  );

  const applyFilters = useCallback(() => {
    updateSearchParams({
      [TIMELINE_PARAM]: timelineDraft,
      [START_DATE_PARAM]: formatDateParam(startDateDraft),
      [END_DATE_PARAM]: formatDateParam(endDateDraft),
      [TRANSACTION_TYPES_PARAM]: serializeArrayParam(transactionTypesDraft),
      [TRANSACTION_STATUS_PARAM]: serializeArrayParam(transactionStatusesDraft),
    });
  }, [
    timelineDraft,
    startDateDraft,
    endDateDraft,
    transactionTypesDraft,
    transactionStatusesDraft,
    updateSearchParams,
  ]);

  const resetDraft = useCallback(() => {
    setTimelineDraft(appliedTimeline);
    setStartDateDraft(appliedStartDate);
    setEndDateDraft(appliedEndDate);
    setTransactionTypesDraft(appliedTransactionTypes);
    setTransactionStatusesDraft(appliedTransactionStatuses);
  }, [
    appliedTimeline,
    appliedStartDate,
    appliedEndDate,
    appliedTransactionTypes,
    appliedTransactionStatuses,
  ]);

  const clearFilters = useCallback(() => {
    setTimelineDraft(null);
    setStartDateDraft(undefined);
    setEndDateDraft(undefined);
    setTransactionTypesDraft([]);
    setTransactionStatusesDraft([]);

    updateSearchParams({
      [TIMELINE_PARAM]: null,
      [START_DATE_PARAM]: null,
      [END_DATE_PARAM]: null,
      [TRANSACTION_TYPES_PARAM]: null,
      [TRANSACTION_STATUS_PARAM]: null,
    });
  }, [updateSearchParams]);

  const startDateDraftValue = formatDateParam(startDateDraft);
  const endDateDraftValue = formatDateParam(endDateDraft);

  const isDirty = useMemo(() => {
    const appliedStartValue = startDateParam ?? null;
    const appliedEndValue = endDateParam ?? null;
    const appliedTypesValue = serializeArrayParam(appliedTransactionTypes);
    const appliedStatusesValue = serializeArrayParam(
      appliedTransactionStatuses
    );
    const draftTypesValue = serializeArrayParam(transactionTypesDraft);
    const draftStatusesValue = serializeArrayParam(transactionStatusesDraft);

    return (
      timelineDraft !== appliedTimeline ||
      startDateDraftValue !== appliedStartValue ||
      endDateDraftValue !== appliedEndValue ||
      draftTypesValue !== appliedTypesValue ||
      draftStatusesValue !== appliedStatusesValue
    );
  }, [
    timelineDraft,
    appliedTimeline,
    startDateDraftValue,
    startDateParam,
    endDateDraftValue,
    endDateParam,
    transactionTypesDraft,
    appliedTransactionTypes,
    transactionStatusesDraft,
    appliedTransactionStatuses,
  ]);

  return {
    applied: {
      timeline: appliedTimeline,
      startDate: appliedStartDate,
      endDate: appliedEndDate,
      transactionTypes: appliedTransactionTypes,
      transactionStatuses: appliedTransactionStatuses,
    },
    draft: {
      timeline: timelineDraft,
      startDate: startDateDraft,
      endDate: endDateDraft,
      transactionTypes: transactionTypesDraft,
      transactionStatuses: transactionStatusesDraft,
    },
    setTimelineDraft,
    setStartDateDraft: (date?: Date | null) =>
      setStartDateDraft(date ?? undefined),
    setEndDateDraft: (date?: Date | null) => setEndDateDraft(date ?? undefined),
    setTransactionTypesDraft,
    setTransactionStatusesDraft,
    applyFilters,
    resetDraft,
    clearFilters,
    isDirty,
    hasActiveFilters:
      Boolean(appliedTimeline) ||
      Boolean(appliedStartDate) ||
      Boolean(appliedEndDate) ||
      appliedTransactionTypes.length > 0 ||
      appliedTransactionStatuses.length > 0,
    activeFilterCount:
      Number(Boolean(appliedTimeline)) +
      Number(Boolean(appliedStartDate)) +
      Number(Boolean(appliedEndDate)) +
      appliedTransactionTypes.length +
      appliedTransactionStatuses.length,
  };
};

export const FilterSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useFilterSidebarState();

  return (
    <FilterSidebarContext.Provider value={value}>
      {children}
    </FilterSidebarContext.Provider>
  );
};

export const useFilterSidebar = (): UseFilterSidebarResult => {
  const context = useContext(FilterSidebarContext);

  if (!context) {
    throw new Error(
      "useFilterSidebar must be used within a FilterSidebarProvider"
    );
  }

  return context;
};

export default useFilterSidebar;
