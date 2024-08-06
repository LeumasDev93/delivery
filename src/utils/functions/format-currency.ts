

export function FormatCurrency(value: number) {
    return value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "CVE"
    })
}