import Head from "next/head";
import { getAllPosts } from "../../lib/posts";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import Image from "next/image";
import FeaturedImage from "../../lib/FeaturedImage";
import SiteFooter from "../../components/SiteFooter";

export async function getStaticProps() {
    const allPosts = await getAllPosts();
    return {
        props: {
            allPosts,
        },
    }
}

export default function BlogHome({ allPosts }) {
    return (
        <>
        <Head>
            <title>Blog</title>
        </Head>
        <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
            <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
            
            <div className="container lg:max-w-4xl mx-auto">
                <SiteHeader className="z-10 relative" />
            </div>
            
            <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
                BLOG
            </h1>
            <p className="relative z-10 text-center text-slate-200 text-2xl">
                Read our latest articles
            </p>
        </div>
        <main>
            <section className="post-list mt-4">
                <div className="container mx-auto lg:max-w-5xl">
                    <ul>
                        {
                            allPosts.nodes.map((post) => (
                                <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                                    <div className="featured-image col-span-2">
                                        <FeaturedImage post={post} />
                                    </div>
                                    <div className="col-span-3">
                                        <h2 className="py-4"><Link className="text-blue-400 text-2xl hover:text-blue-600" href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                                        <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                        <div className="py-4">
                                            Posted Under:&nbsp; 
                                        {
                                            post.categories.nodes.map((category) => (
                                                <Link className="text-blue-400 hover:text-blue-500" key={category.slug} href={`/category/${category.slug}`}>
                                                    {category.name}
                                                </Link>
                                            ))
                                        }
                                        </div>
                                    </div>
                                    
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </section>
        </main>
        <SiteFooter />
        </>
    );
}