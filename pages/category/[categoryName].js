import Head from "next/head";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import LoadMore from "../../components/LoadMore";
import FeaturedImage from "../../components/FeaturedImage";
import { getCategoryDetails, getCategorySlugs, getPostList } from "../../lib/posts";
import { useState } from "react";
import Date from "../../components/Date";

export async function getStaticPaths() {
    const categories = await getCategorySlugs();

    return {
        paths: categories.map((category) => (
            {
                params: {
                    categoryName: category.slug
                }
            }
        )),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const categoryPosts = await getPostList(null, {key: "categoryName", value: params.categoryName});

    const categoryDetails = await getCategoryDetails(params.categoryName);

    return {
        props: {
            categoryPosts: categoryPosts,
            categoryDetails: categoryDetails,
        }
    }
}

export default function CategoryArchive({ categoryPosts, categoryDetails }) {

    const [posts, setPosts] = useState(categoryPosts);

    return (
        <>
        <Head>
            <title>{categoryDetails.name}</title>
        </Head>
        <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
            <div className="absolute bg-slate-900 opacity-40 inset-0 z-0"></div>

            <SiteHeader className="header-category z-10 relative" />

            <h1 className="text-4xl text-center text-slate-100 relative z-10 py-8">
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
                                <div className="col-span-2">
                                    <FeaturedImage post={post} />
                                </div>
                                <div className="col-span-3">
                                    <h2 className="py-4">
                                        <Link href={`/blog/${post.slug}`} className="text-blue-400 text-2xl hover:text-blue-600">{post.title}</Link>
                                    </h2>
                                    <div className="py-4">
                                        Published on <Date dateString={post.date} />
                                    </div>
                                    <div className="text-lg" dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                                    <div className="py-4">
                                        Posted under {
                                            post.categories.nodes.map((category) => (
                                                <Link className="text-blue-400 hover:text-blue-500" href={`/category/${category.slug}`} key={category.slug}>
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
                <div className="py-4 text-center">
                    <LoadMore 
                    posts={posts} 
                    setPosts={setPosts}
                    taxonomy={{key: "categoryName", value: categoryDetails.slug}} />
                </div>
                </div>
            </section>
        </main>
        </>
    );
}