export type PRODUCT_RESPONSE = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
};

export type PRODUCT_CATEGORY_RESPONSE = string[];
