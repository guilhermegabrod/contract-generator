export function applyMask(value: string, mask?: 'cpf' | 'cnpj' | 'currency'): string {
  if (!mask) return value

  const digits = value.replace(/\D/g, '')

  switch (mask) {
    case 'cpf': {
      // 000.000.000-00
      return digits
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }
    case 'cnpj': {
      // 00.000.000/0000-00
      return digits
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    }
    case 'currency': {
      // R$ 1.000,00
      const cents = digits.slice(0, 12)
      if (!cents) return ''
      const padded = cents.padStart(3, '0')
      const integer = padded.slice(0, -2).replace(/^0+/, '') || '0'
      const decimal = padded.slice(-2)
      const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `${formatted},${decimal}`
    }
    default:
      return value
  }
}

export function stripMask(value: string, mask?: 'cpf' | 'cnpj' | 'currency'): string {
  if (!mask) return value
  if (mask === 'currency') {
    // Converte "1.234,56" → "1234.56" para uso em cálculos
    return value.replace(/\./g, '').replace(',', '.')
  }
  return value.replace(/\D/g, '')
}
