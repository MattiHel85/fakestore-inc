export interface HeaderProps {
    title: string
    body?: string | null
}

export interface HomeProps {
    productOfTheMonthId: number | undefined;
    setProductOfTheMonthId?: (productId: number) => void;
}