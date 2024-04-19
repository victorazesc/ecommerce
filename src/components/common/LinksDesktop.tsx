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

export function LinksDesktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Coleções
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">

              <li className="row-span-2">
                <NavigationMenuLink asChild >
                  <a
                    className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none from-muted/50 to-muted focus:shadow-md bg-center bg-[url('/profile.png')] bg-contain bg-no-repeat"
                    href="https://www.azevedo.click/" target="_blank"
                  >
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/pants" title="CALÇAS">
                Explore calças masculinas essenciais para todas as ocasiões. De chinos clássicos a joggers modernos, encontre o ajuste perfeito em uma variedade de estilos e cores.
              </ListItem>
              <ListItem href="/t-shirts" title="CAMISETAS">
                Nossas camisetas masculinas oferecem estilo atemporal em uma variedade de designs, cores e texturas. De clássico a contemporâneo, encontre a camiseta perfeita para qualquer ocasião.
              </ListItem>
              <ListItem href="/" title="VER TODOS">
                Descubra peças essenciais para todas as ocasiões.
              </ListItem>
              <ListItem href="/sweatshirts" title="MOLETONS">
                Assim como a camiseta, os moletons masculinos são muito mais do que básicos.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-[#1F1F1F]",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-[]">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground text-[#A1A1A1]">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

