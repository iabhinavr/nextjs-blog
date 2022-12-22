import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ className }) {
    return (
        <header className={`${className} flex items-stretch justify-between`}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="/CoolNomad.svg" alt="CoolNomad" width="180" height="120" />
                </Link>
            </div>
            <nav className="text-slate-100">
                <ul className="flex h-full [&>li>a]:flex [&>li>a]:items-center [&>li>a]:h-full [&>li>a]:px-3 [&>li>a]:py-2 [&>li>a:hover]:-translate-y-0.5 [&>li>a]:transition [&>li>a]:rounded [&>li>a:hover]:text-yellow-400 text-xl">
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
    )
}