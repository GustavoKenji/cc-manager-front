export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-paper p-5">
        <h2 className="mb-2 text-base font-medium">{title}</h2>
        <p className="mb-5 text-sm text-muted">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded border border-line py-2.5">
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded py-2.5 font-medium text-white ${
              danger ? 'bg-danger hover:bg-danger/90' : 'bg-primary hover:bg-primary-hover'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}