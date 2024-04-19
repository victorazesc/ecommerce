import { Products } from "@/components/products/Products";
import { getAllProducts } from "../actions";
import { ProductDocument } from "@/types/types";

interface SearchProps {
    searchParams: { [key: string]: string | undefined };
}

const normalizeText = (text: string): string => {
    return text
        .replace(/[-_]/g, "")
        .replace(/[^\w\s]/g, "")
        .toLowerCase();
};

const Search: React.FC<SearchProps> = async ({ searchParams }) => {
    const products = await getAllProducts();
    let filteredProducts: ProductDocument[] = [];

    if (products) {
        filteredProducts = products.filter(product => {

            const nameMatches = normalizeText(product.name).includes(normalizeText(searchParams.q || ""));

            const sizeMatches = searchParams.size ? product.sizes.includes(searchParams.size) : true;

            const variantMatches = searchParams.variant ? product.variants.find((value) => { return value.color === searchParams.variant }) : true;

            const minPrice = parseFloat(searchParams.minValue as string) || 0;
            const maxPrice = parseFloat(searchParams.maxValue as string) || Infinity;

            const priceInRange = product.price >= minPrice && product.price <= maxPrice;

            return nameMatches && sizeMatches && variantMatches && priceInRange;
        });
    }

    return (
        <section className="pt-14">
            {
                filteredProducts.length > 0 ?
                    <Products
                        products={filteredProducts}
                        extraClassname=""
                    />
                    :
                    <h3 className="text-sm text-center">
                        Nenhum produto encontrado para a busca realizada
                    </h3>
            }
        </section>
    );
};

export default Search;
