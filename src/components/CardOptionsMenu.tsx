import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CardOptionsMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} aria-label="Mais opções" className="p-1 text-muted hover:text-ink">
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-40 w-44 overflow-hidden rounded-lg border border-line bg-surface shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-paper"
          >
            <Pencil size={16} />
            Editar cartão
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-danger hover:bg-danger-bg"
          >
            <Trash2 size={16} />
            Excluir cartão
          </button>
        </div>
      )}
    </div>
  );
}