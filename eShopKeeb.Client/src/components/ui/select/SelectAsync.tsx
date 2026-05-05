import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
  description?: string;
};

type SelectAsyncProps = {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  multiple?: boolean;
  disabled?: boolean;
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  loadOptions: (query: string) => Promise<SelectOption[]>;
  renderValue?: (option: SelectOption | SelectOption[] | null) => string;
  className?: string;
};

const EMPTY_LABEL = 'Select an option';

function normalizeValue(value?: string | string[]) {
  if (!value) return [] as string[];
  return Array.isArray(value) ? value : [value];
}

export function SelectAsync({
  label,
  placeholder = EMPTY_LABEL,
  searchPlaceholder = 'Search...',
  noResultsText = 'No results found',
  multiple = false,
  disabled = false,
  value,
  onValueChange,
  loadOptions,
  renderValue,
  className,
}: SelectAsyncProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(normalizeValue(value));
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 350);

  const selectedValues = value !== undefined ? normalizeValue(value) : internalValue;

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedValues.includes(option.value)),
    [options, selectedValues]
  );

  const fetchOptions = useCallback(
    async (query: string) => {
      setIsLoading(true);
      try {
        const nextOptions = await loadOptions(query);
        setOptions(nextOptions);
      } finally {
        setIsLoading(false);
      }
    },
    [loadOptions]
  );

  useEffect(() => {
    if (!isOpen) return;
    void fetchOptions(debouncedSearch);
  }, [debouncedSearch, fetchOptions, isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(normalizeValue(value));
    }
  }, [value]);

  const commitValue = useCallback(
    (nextValues: string[]) => {
      if (value === undefined) {
        setInternalValue(nextValues);
      }
      onValueChange?.(multiple ? nextValues : nextValues[0] ?? '');
      if (!multiple) {
        setIsOpen(false);
      }
    },
    [multiple, onValueChange, value]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      const nextValues = multiple
        ? selectedValues.includes(optionValue)
          ? selectedValues.filter((current) => current !== optionValue)
          : [...selectedValues, optionValue]
        : [optionValue];

      commitValue(nextValues);
    },
    [commitValue, multiple, selectedValues]
  );

  const displayValue =
    renderValue?.(
      multiple ? selectedOptions : selectedOptions[0] ?? null
    ) ??
    (selectedOptions.length > 0
      ? multiple
        ? selectedOptions.map((option) => option.label).join(', ')
        : selectedOptions[0].label
      : placeholder);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {label ? (
        <label className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      ) : null}

      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen((current) => !current)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full justify-between gap-3 px-3 text-left font-normal',
          !selectedValues.length && 'text-muted-foreground'
        )}
      >
        <span className="min-w-0 flex-1 truncate">{displayValue}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
      </Button>

      {isOpen ? (
        <div className="absolute z-50 mt-2 w-full rounded-xl border bg-popover p-2 shadow-lg">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 pl-9"
              autoFocus
            />
          </div>

          <div className="mt-2 max-h-72 overflow-auto rounded-lg border bg-background">
            {isLoading ? (
              <div className="flex items-center justify-center px-4 py-8 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : options.length === 0 ? (
              <div className="flex items-center justify-center px-4 py-8 text-sm text-muted-foreground">
                {noResultsText}
              </div>
            ) : (
              <div className="p-1">
                {options.map((option) => {
                  const selected = selectedValues.includes(option.value);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50',
                        selected && 'bg-accent text-accent-foreground'
                      )}
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border">
                        {selected ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{option.label}</span>
                        {option.description ? (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export type { SelectOption, SelectAsyncProps };
