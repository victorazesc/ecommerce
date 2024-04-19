import { Products } from "@/components/products/Products";
import Link from "next/link";
import { getItems } from "./action";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { Suspense } from "react";
import { Loader } from "@/components/common/Loader";

export async function generateMetadata() {
    return {
        title: "Wishlists | Ecommerce Template",
        description: `Wishlists at e-commerce template made by Marcos Cámara`,
    };
}

const Wishlists = async () => {
    const session: Session | null = await getServerSession(authOptions);

    if (session?.user) {
        return (
            <Suspense
                fallback={
                    <div className="flex items-center justify-center h-[calc(100vh-91px)]">
                        <Loader height={30} width={30} />
                    </div>
                }>
                <ProductsWishlists session={session} />
            </Suspense>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-91px)] gap-2 px-4">
            <h1 className="mb-6 text-4xl font-bold">SUA LISTA DE DESEJOS ESTÁ VAZIA</h1>
            <p className="mb-4 text-lg">Não registrado? Você deve estar para salvar seus produtos favoritos.</p>
            <Link
                className="flex font-medium	 items-center bg-[#0C0C0C] justify-center text-sm min-w-[160px] max-w-[160px] h-[40px] px-[10px] rounded-md border border-solid border-[#2E2E2E] transition-all hover:bg-[#1F1F1F] hover:border-[#454545]"
                href="/login"
            >
                Login
            </Link>
        </div>
    );
}

const ProductsWishlists = async ({ session }: { session: Session }) => {
    const filteredWishlist = await getItems(session.user._id);

    if (filteredWishlist && filteredWishlist?.length > 0) {
        return (
            <div className="pt-12">
                <h2 className="mb-5 text-xl font-bold sm:text-2xl">SUA LISTA DE DESEJOS</h2>
                <Products
                    products={filteredWishlist}
                    extraClassname={"colums-mobile"}
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-91px)] gap-2 px-4">
            <h1 className="mb-6 text-4xl font-bold">SUA LISTA DE DESEJOS ESTÁ VAZIA</h1>
            <p className="mb-4 text-lg">Quando você adicionar algo à lista de desejos, ele aparecerá aqui. Quer começar?</p>
            <Link
                className="flex font-medium	 items-center bg-[#0C0C0C] justify-center text-sm min-w-[160px] max-w-[160px] h-[40px] px-[10px] rounded-md border border-solid border-[#2E2E2E] transition-all hover:bg-[#1F1F1F] hover:border-[#454545]"
                href="/"
            >
                Começar
            </Link>
        </div>
    )
}

export default Wishlists;
