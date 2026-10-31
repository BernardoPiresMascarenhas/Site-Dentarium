"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectGroup = { label: string; options: string[] };

/**
 * Seleção de tratamento no padrão "combobox só de seleção" (WAI-ARIA APG):
 * o foco fica no botão e a opção ativa é indicada por aria-activedescendant.
 * A lista rola dentro do painel, sem arrastar a página. O valor vai para o
 * formulário por um input oculto com o mesmo `name`.
 */
export function TreatmentSelect({
  id,
  name,
  labelId,
  defaultValue,
  groups,
}: {
  id: string;
  name: string;
  labelId: string;
  defaultValue: string;
  groups: SelectGroup[];
}) {
  const baseId = useId();
  const listId = `${baseId}-lista`;
  const options = useMemo(() => groups.flatMap((g) => g.options), [groups]);
  /** Índice global da primeira opção de cada grupo. */
  const offsets = useMemo(
    () => groups.reduce<number[]>((acc, g, i) => [...acc, i === 0 ? 0 : acc[i - 1] + groups[i - 1].options.length], []),
    [groups],
  );
  const optionId = (i: number) => `${baseId}-opcao-${i}`;

  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(defaultValue)));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: "", at: 0 });

  const show = (index = options.indexOf(value)) => {
    setActive(Math.max(0, index));
    setOpen(true);
  };
  const choose = (index: number) => {
    setValue(options[index]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Mantém a opção ativa visível dentro do painel, sem rolar a página.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`);
    if (!list || !el) return;
    // O painel é o offsetParent das opções; o rótulo fixo do grupo cobre ~2,25rem do topo.
    const top = el.offsetTop;
    const header = 40;
    if (top - header < list.scrollTop) list.scrollTop = top - header;
    else if (top + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = top + el.offsetHeight - list.clientHeight + 8;
    // optionId depende só de baseId, estável.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  /** Digitar letras salta para a primeira opção que começa com elas. */
  const typeahead = (key: string) => {
    const now = Date.now();
    const t = typed.current;
    t.text = now - t.at > 700 ? key : t.text + key;
    t.at = now;
    const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
    const start = open ? active + 1 : options.indexOf(value) + 1;
    const order = [...options.slice(start), ...options.slice(0, start)];
    const hit = order.find((o) => norm(o).startsWith(norm(t.text)));
    if (hit === undefined) return;
    const index = options.indexOf(hit);
    if (open) setActive(index);
    else setValue(hit);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.min(last, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(last);
        }
        break;
      case "PageDown":
        if (open) {
          e.preventDefault();
          setActive((i) => Math.min(last, i + 6));
        }
        break;
      case "PageUp":
        if (open) {
          e.preventDefault();
          setActive((i) => Math.max(0, i - 6));
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else show();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) choose(active);
        break;
      default:
        if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) typeahead(e.key);
    }
  };

  return (
    <div ref={rootRef} className="relative mt-2">
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`flex h-[3.25rem] w-full items-center justify-between gap-3 rounded-[var(--radius-sm)] border bg-ivory px-4 text-left text-[1rem] text-ink transition-[border-color,background-color,box-shadow] duration-300 ease-soft hover:border-taupe-line focus:outline-none focus-visible:border-clay focus-visible:bg-paper focus-visible:shadow-[0_0_0_4px_var(--taupe-tint)] ${
          open ? "border-clay bg-paper shadow-[0_0_0_4px_var(--taupe-tint)]" : "border-taupe-soft"
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`size-4 shrink-0 text-clay transition-transform duration-300 ease-soft ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        tabIndex={-1}
        hidden={!open}
        className="select-panel absolute inset-x-0 top-full z-30 mt-2 max-h-[min(20rem,55svh)] overflow-y-auto overscroll-contain rounded-[var(--radius-md)] border border-taupe-soft bg-paper p-1.5 shadow-[0_24px_48px_-28px_rgba(63,66,63,0.55)]"
      >
        {groups.map((g, gi) => {
          const groupLabel = `${baseId}-grupo-${gi}`;
          return (
            <div key={g.label} role="group" aria-labelledby={g.label ? groupLabel : undefined}>
              {g.label && (
                <p
                  id={groupLabel}
                  className="sticky top-0 z-10 -mx-1.5 bg-paper px-4 pt-3 pb-1.5 text-[0.72rem] font-semibold tracking-[0.08em] text-clay uppercase"
                >
                  {g.label}
                </p>
              )}
              {g.options.map((option, oi) => {
                const i = offsets[gi] + oi;
                const selected = option === value;
                return (
                  <div
                    key={option}
                    id={optionId(i)}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(i)}
                    className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-[0.95rem] transition-colors duration-150 ${
                      i === active ? "bg-taupe-tint text-ink" : "text-ink"
                    } ${selected ? "font-semibold" : ""}`}
                  >
                    {option}
                    {selected && <Check aria-hidden strokeWidth={2} className="size-4 shrink-0 text-clay" />}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
