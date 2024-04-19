"use client"

import * as React from "react";

import { cn } from "@/libs/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { FilterIcon } from "lucide-react";
import { colorMapping } from "@/helpers/colorMapping";;
import { MinMaxValueSelector } from "./MinMaxValueSelector";
import { VariantsDocument } from "@/types/types";
import { useRouter } from "next/navigation";


const sizes = [
  "P",
  "M",
  "G",
  "GG"
]

export function FilterDesktop
  ({ className }: any) {
  const [selectedMinValue, setSelectedMinValue] = React.useState<[number]>()
  const [selectedMaxValue, setSelectedMaxValue] = React.useState<[number]>()
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedVariant, setSelectedVariant] = React.useState<VariantsDocument>();
  const [value, setValue] = React.useState("");

  const router = useRouter();

  const handleChangeFilter = ({ size, variant, search, maxValue, minValue }: { size?: string, variant?: string, search?: string, maxValue?: [number], minValue?: [number] }) => {
    
    setValue(search ?? value)

    if (size) {
      setSelectedSize(size ?? selectedSize)
    }
    
    if (variant) {
      setSelectedVariant({ color: variant })
    }
    if (maxValue) {
      setSelectedMaxValue(maxValue)
    }
    if (minValue) {
      setSelectedMinValue(minValue)
    }
    
    router.push(`/search?size=${encodeURIComponent(size ? size : selectedSize ? selectedSize : '')}&&variant=${encodeURIComponent(variant ? variant : selectedVariant?.color ? selectedVariant.color : '')}&&q=${encodeURIComponent(search ? search : value ? value : '')}&&maxValue=${encodeURIComponent(maxValue ? maxValue[0] : selectedMaxValue ? selectedMaxValue[0] : '')}&&minValue=${encodeURIComponent(minValue ? minValue[0] : selectedMinValue ? selectedMinValue[0] : '')}`);
  };




  return (
    <div className={className}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <FilterIcon size={20} />
            </NavigationMenuTrigger>
            <NavigationMenuContent disableOutsidePointerEvents>
              <ul className="p-4 md:w-[400px] lg:w-[500px]">

                <div className='flex flex-col gap-2.5 py-4 justify-center'>
                  <h3 className="text-lg">Tamanho</h3>
                  <div className="grid grid-cols-auto-fill-32 gap-2.5	mt-5">

                    {sizes.map((size: string, index: number) => (
                      <button
                        key={index}
                        className={`flex items-center justify-center border border-solid border-border-primary px-1 py-1.5 bg-black rounded 
              transition duration-150 ease hover:border-border-secondary text-13 ${selectedSize === size ? 'bg-white text-black' : ''}`}
                        onClick={() => handleChangeFilter({ size })}
                      >
                        <span>{size}</span>
                      </button>
                    ))}
                  </div>
                </div>


                <div className='flex flex-col gap-2.5 py-4'>
                  <h3 className="text-lg">Cor</h3>
                  <div className="grid grid-cols-auto-fill-32 gap-2.5	mt-5">
                    {Object.keys(colorMapping).map((key: string, index: number) => (
                      <button
                        key={index}
                        className={`border border-solid border-border-primary w-8 h-8 flex justify-center relative rounded 
                       transition duration-150 ease hover:border-border-secondary ${selectedVariant?.color === key ? 'border-border-secondary' : ''}`}
                        style={{ backgroundColor: colorMapping[key] }}
                        onClick={() => handleChangeFilter({ variant: key })}
                        title={`Color ${key}`}
                      >
                        <span className={selectedVariant?.color === key ? 'w-2.5 absolute bottom-selected h-px bg-white' : ''} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className='flex flex-col gap-2.5 py-4'>
                  <h3 className="text-lg">Valor</h3>
                  <MinMaxValueSelector label={'Minimo'} min={0} max={500} defaultValue={selectedMinValue} onChange={(value: any) => { handleChangeFilter({ minValue: value }) }} />
                  <MinMaxValueSelector label={'Máximo'} min={selectedMinValue ? selectedMinValue[0] : 0} max={500} defaultValue={selectedMaxValue} onChange={(value: any) => { handleChangeFilter({ maxValue: value }) }} />
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='flex w-full border border-[#2E2E2E] rounded-md overflow-hidden'>
        <span className='h-[40px] w-[40px] px-3 flex items-center justify-center'>
          <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{ color: 'currentcolor' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z" fill="currentColor"></path>
          </svg>
        </span>
        <input
          placeholder="Buscar Produtos..."
          value={value}
          aria-label="Search"
          className='w-full h-[40px] px-3 bg-[#0A0A0A] text-sm focus:outline-none'
          type="search"
          onChange={(e) => {
            handleChangeFilter({ search: e.currentTarget.value })
          }}
        />
      </div>
    </div>
  )
}

