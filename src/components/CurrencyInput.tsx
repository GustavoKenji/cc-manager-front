import { useEffect, useRef, useState } from 'react';

function formatarCentavos(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function CurrencyInput({
  value,
  onChange,
  className,
  required,
}: {
  value: number; // valor em reais (ex: 1234.56)
  onChange: (value: number) => void;
  className?: string;
  required?: boolean;
}) {
  const [cents, setCents] = useState(Math.round(value * 100));
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincroniza se o valor vier de fora (ex: abrir o form em modo edição)
  useEffect(() => {
    setCents(Math.round(value * 100));
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitos = e.target.value.replace(/\D/g, '');
    const novosCents = digitos === '' ? 0 : Number(digitos);
    setCents(novosCents);
    onChange(novosCents / 100);
  }

  // Mantém o cursor sempre no fim — como o preenchimento é da direita pra
  // esquerda, não faz sentido editar no meio do valor.
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }, [cents]);

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      required={required}
      value={formatarCentavos(cents)}
      onChange={handleChange}
      className={className}
    />
  );
}