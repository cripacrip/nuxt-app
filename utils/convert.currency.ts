export const convertCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('USD', {
        style: 'currency',
        currency: 'USD',
    }).format(+amount)
}