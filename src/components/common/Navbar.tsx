"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Session } from 'next-auth';
import { LinksDesktop } from './LinksDesktop';
import { UserMenu } from './UserMenu';
import SearchInput from './SearchInput';
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from 'next/dynamic';
import { CreditCard, Heart, MenuIcon, ShoppingCart, TriangleIcon, UserRound, X } from 'lucide-react';
import { FilterDesktop } from './FilterDesktop';
import Image from 'next/image';

const EditProfile = dynamic(() => import('./EditProfile'), {
  ssr: false
});

const SignOutButton = dynamic(() => import('../account/SignOutButton'), {
  ssr: false
});

interface Navbar {
  session: Session | null,
  totalItemsCart: number,
  totalWishlists: number | undefined
}

export const Navbar = (
  { session, totalItemsCart, totalWishlists }: Navbar
) => {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  const toggleHeader = () => {
    document.body.style.overflow = 'auto';
    setIsHeaderOpen(!isHeaderOpen);
  };

  const linksData = [
    { path: '/t-shirts', name: 'Camisetas' },
    { path: '/pants', name: 'Calças' },
    { path: '/sweatshirts', name: 'Moletons' },
  ];

  const authLinks = () => {
    if (session?.user) {
      return (
        <>
          <li className='flex lg:hidden'>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center w-full h-full px-4 gap-2 py-2">
                  <UserRound size={20}></UserRound>
                  <span>Editar perfil</span>
                </button>
              </DialogTrigger>
              <EditProfile />
            </Dialog>
          </li>

          <li className='items-center justify-center hidden lg:flex'>
            <UserMenu
              fastSession={session}
            />
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className='flex items-center justify-center'>
            <Link
              href="/login"
              onClick={() => setIsHeaderOpen(false)}
              className='text-sm px-4 py-2 transition-all lg:text-[#A1A1A1] hover:text-[#EDEDED] font-medium'
            >
              Login
            </Link>
          </li>
        </>
      )
    }
  }

  return (
    <header className="pointer-events-auto w-full px-3.5 gap-4 xs:px-6 sm:px-12 py-6 flex items-center justify-between bg-background-secondary border-b border-solid border-border-primary">

      <Link
        className="hidden lg:block"
        href="/"
      >
        <TriangleIcon fill='white' />
      </Link>

      <button
        onClick={() => {
          toggleHeader();
          document.body.style.overflow = 'hidden';
        }}
        className='flex px-1 py-2 lg:hidden'
      >
        <MenuIcon size={20}></MenuIcon>
      </button>




      <div className={`fixed top-0 left-0 h-screen w-full bg-background-secondary py-6 px-3.5 xs:px-6 transition ease duration-200 z-20 translate-x-0 ${isHeaderOpen ? 'translate-x-0' : 'translate-x-hide'}`}>
        <ul className='flex justify-between text-sm gap-9'>
          <li>
            <button onClick={() => {
              toggleHeader();
              document.body.style.overflow = 'auto';
            }}
              className='px-4 py-2'
            >
              <X />
            </button>
          </li>

          {authLinks()}
        </ul>

        <div className='flex items-center justify-center h-full max-h-[90%]'>
          <ul className='flex flex-col justify-between text-sm gap-9'>
            {linksData.map((link, index) => (
              <li key={index} className='flex items-center justify-center'>
                <Link href={link.path} onClick={toggleHeader}>{link.name}</Link>
              </li>
            ))}
            {
              session?.user ?
                <>
                  <li className='flex items-center'>
                    <Link
                      className="flex items-center w-full h-full px-4 gap-2 py-2"
                      onClick={toggleHeader}
                      href="/orders"
                    >
                      <CreditCard size={20} />
                      <span>Ver Pedidos</span>
                    </Link>
                  </li>
                  <li className='px-4 py-2 w-[110px] mx-auto'>
                    <SignOutButton />
                  </li>
                </>
                : ""
            }
          </ul>
        </div>
      </div>

      <ul className='justify-between hidden gap-2 text-sm lg:flex'>
        <li>
          <LinksDesktop />
        </li>
      </ul>

      <FilterDesktop className={'flex w-full rounded-md'} />

      <ul className='flex gap-2'>
        <li className='flex items-center justify-center'>
          <Link
            href="/cart"
            aria-label="Products saved in the shopping cart"
            className='text-sm py-3 px-3 rounded-md transition-all text-[#EDEDED] hover:bg-[#1F1F1F] relative'
          >
            <ShoppingCart size={20} />
            <span
              className='flex items-center bg-[#0072F5] font-medium text-[#EDEDED] justify-center absolute w-[20px] rounded-full top-[-3px] right-[-3px]'
            >
              {totalItemsCart}
            </span>
          </Link>
        </li>
        <li className='flex items-center justify-center'>
          <Link
            href="/wishlist"
            aria-label="Products saved in whishlist"
            className='text-sm py-3 px-3 rounded-md transition-all text-[#EDEDED] hover:bg-[#1F1F1F] relative'
          >
            <Heart size={20} />
            <span
              className='flex items-center bg-[#0072F5] font-medium text-[#EDEDED] justify-center absolute w-[20px] rounded-full top-[-3px] right-[-3px]'
            >
              {totalWishlists || 0}
            </span>
          </Link>
        </li>

        {authLinks()}
      </ul>
    </header>
  )
}
