import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ className }) {
    return (
        <header className={`${className} container mx-auto lg:max-w-4xl flex items-center justify-between`}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="/CoolNomad.svg" alt="CoolNomad" width="180" height="120" />
                </Link>
            </div>
            <nav className="text-slate-100">
                <ul className="flex justify-center [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:text-yellow-400 [&>li>a]:transition text-xl">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}