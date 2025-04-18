import React from 'react';
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-black border-t border-gray-600 shadow-sm md:flex md:items-center md:justify-between md:p-6">
            <span className="text-sm text-gray-400 sm:text-center">
                © 2025 Telepathia-AI™. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">
                        Licensing
                    </Link>
                </li>
                <li>
                    <Link href="#" className="hover:underline me-4 md:me-6">
                        Contact
                    </Link>
                </li>
            </ul>
        </footer>
    );
};
