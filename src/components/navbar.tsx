"use client";

import React , { useEffect } from 'react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const Navbar = () => {
    const {isConnected} = useAccount();
    const router = useRouter();

    useEffect(() => {
    if (isConnected) {
           Cookies.set('wallet-connected', 'true', { expires: 1 });
    } else {
           Cookies.remove('wallet-connected');
            if (window.location.pathname.startsWith('/chatting')) {
                router.push('/');
            }
       }
    }, [isConnected, router]);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Telepathia AI
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ConnectButton showBalance={false} accountStatus={"address"} chainStatus={"icon"}/>
                </div>
            </div>
        </nav>
    );
};
