"use client";

import { ProductImages } from "@/components/products/ProductImages";
import { ProductDocument, VariantsDocument } from "@/types/types";
import { Session } from "next-auth";
import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import AddToCart from "../cart/AddToCart";
interface SingleProduct {
    product: string;
    session: Session | null
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
    const productPlainObject: ProductDocument = JSON.parse(product);
    const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(productPlainObject.variants[0]);

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    return (
        <div className="flex flex-wrap justify-between gap-8">
            <div className="grow-999 basis-0">
                <ProductImages
                    name={productPlainObject.name}
                    selectedVariant={selectedVariant}
                />
            </div>

            <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
                <div className='w-full border border-solid rounded border-border-primary bg-background-secondary'>
                    <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary" >
                        <h1 className="text-base font-semibold">{productPlainObject.name}</h1>
                        <span className="text-sm">R$ {productPlainObject.price}</span>
                        <p className="text-sm">{productPlainObject.description}</p>
                    </div>

                    <AddToCart
                        session={session}
                        product={productPlainObject}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                    />
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm">COMPOSIÇÃO</AccordionTrigger>
                        <AccordionContent>
                            <p>
                                Trabalhamos com programas de monitoramento para garantir o cumprimento de nossos padrões sociais, ambientais e de saúde e segurança de nossos produtos. Para avaliar a conformidade, desenvolvemos um programa de auditorias e planos de melhoria contínua.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-sm">CUIDADOS</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <p> Cuidar das suas roupas é cuidar do meio ambiente.</p>
                            <p>
                                Lavagens em temperaturas mais baixas e ciclos de centrifugação delicados são mais suaves para as roupas e ajudam a proteger a cor, a forma e a estrutura do tecido. Além disso, reduzem a quantidade de energia utilizada nos processos de cuidado.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-sm">ORIGEM</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <p>
                                Trabalhamos com os nossos fornecedores, trabalhadores, sindicatos e organizações internacionais para desenvolver uma cadeia de abastecimento na qual os direitos humanos sejam respeitados e promovidos, contribuindo para os Objetivos de Desenvolvimento Sustentável das Nações Unidas.
                            </p>
                            <p>
                                Graças à colaboração com os nossos fornecedores, trabalhamos para conhecer as instalações e processos utilizados na fabricação dos nossos produtos para compreender a sua rastreabilidade.
                            </p>
                            <p>
                                Fabricado no Brasil
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};