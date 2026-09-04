import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  hint?: string;
}

interface Props {
  id: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  labelId: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

/** Accessible dark/gold listbox replacing the native select. */
export function PositionSelect({
  id,
  value,
  options,
  placeholder,
  labelId,
  invalid,
  describedBy,
  onChange,
  onBlur,
  buttonRef,
}: Props) {
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const [active, setActive] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const localBtn = useRef<HTMLButtonElement | null>(null);
  const btnRef = buttonRef ?? localBtn;
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const commit = (index: number) => {
    const opt = options[index];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      setActive(selectedIndex >= 0 ? selectedIndex : 0);
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(active);
    }
  };

  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  return (
    <div className="relative" ref={wrapRef}>
      <button
        id={id}
        ref={btnRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}`}
        aria-invalid={Boolean(invalid)}
        aria-describedby={describedBy}
        onClick={() => {
          setActive(selectedIndex >= 0 ? selectedIndex : 0);
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        onBlur={(e) => {
          if (!wrapRef.current?.contains(e.relatedTarget as Node)) onBlur?.();
        }}
        className={cn(
          "w-full flex items-center gap-3 border px-4 py-3 text-left font-sans text-base transition-colors",
          "bg-card text-card-foreground focus-visible:outline-2 focus-visible:outline-gold",
          invalid ? "border-destructive" : open ? "border-gold" : "border-border hover:border-gold/60",
        )}
      >
        <span className={cn("min-w-0 flex-1 truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={cn("shrink-0 text-gold transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          aria-labelledby={labelId}
          tabIndex={-1}
          className="absolute z-50 mt-1 max-h-72 w-full overflow-y-auto border border-gold/50 bg-card shadow-xl"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === active;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(i)}
                className={cn(
                  "flex cursor-pointer items-start gap-3 px-4 py-3 text-sm leading-snug transition-colors",
                  isActive ? "bg-secondary text-gold" : "text-card-foreground",
                  isSelected && "bg-gold/10 text-gold",
                )}
              >
                <span className="min-w-0 flex-1 break-words">
                  {opt.label}
                  {opt.hint && (
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      {opt.hint}
                    </span>
                  )}
                </span>
                {isSelected && <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
