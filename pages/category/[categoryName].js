import Head from "next/head";
import Link from "next/link";
import LoadMore from "../../components/LoadMore";
import { getCategoryDetails, getCategorySlugs, getPostList } from "../../lib/posts";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import FeaturedImage from "../../lib/FeaturedImage";
import { useState } from "react";

export async function getStaticProps({ params }) {
    const allPosts = await getPostList(null, {key: "categoryName", value: params.categoryName});
    const categoryDetails = await getCategoryDetails(params.categoryName);

    return {
        props: {
            allPosts: allPosts,
            categoryDetails: categoryDetails
        },
    };
}

export async function getStaticPaths() {
    const paths = await getCategorySlugs();

    return {
        paths,
        fallback: false 
    };
}

export default function CategoryArchive({ allPosts, categoryDetails }) {

    const [posts, setPosts] = useState(allPosts);

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
                Category Archive: {categoryDetails.name}
            </h1>
            <p className="relative z-10 text-center text-slate-200 text-2xl">
                Found {categoryDetails.count} posts under this category
            </p>
        </div>
        <main>
            <section className="post-list mt-4">
                <div className="container mx-auto lg:max-w-5xl">
                    <ul>
                        {
                            posts.nodes.map((post) => (
                                <li key={post.slug} className="grid grid-cols-5 gap-4 mb-4">
                                    <div className="featured-image col-span-2">
                                        <FeaturedImage post={post} />
                                    </div>
                                    <div className="col-span-3">
                                        <h2 className="py-4"><Link className="text-blue-400 text-2xl hover:text-blue-600" href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                                        <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    </div>
                                    
                                </li>
                            ))
                        }
                    </ul>
                    <div className="py-4">
                        <LoadMore
                        posts={posts}
                        onPostsChange={setPosts}
                        taxonomy={{key: "categoryName", value: categoryDetails.slug}}
                        />
                    </div>
                </div>
            </section>
        </main>
        <SiteFooter />
        </>
    );
}