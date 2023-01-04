import Head from "next/head";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { getPageSlugs, getSinglePage } from "../lib/pages";

export default function Page({ pageData }) {
    return (
        <>
        {/* <p>This is a blog post - {postData.slug}</p> */}
        <Head>
            <title>{pageData.title}</title>
        </Head>
        <section className="bg-slate-700">
            <div className="container lg:max-w-4xl mx-auto">
                <SiteHeader className="z-10 relative" />
            </div>
        </section>
        <section className="content-area py-8">
            <article>
                <h1 className="text-6xl text-center text-slate-700 relative z-10 py-8">
                    {pageData.title}
                </h1>
                <div className="post-content container mx-auto lg:max-w-4xl" dangerouslySetInnerHTML={{ __html: pageData.content }} />
            </article>
        </section>
        <SiteFooter />
        </>
    );
}

export async function getStaticProps({ params }) {
    const pageData = await getSinglePage(params.pageSlug);

    return {
        props: {
            pageData,
        }
    }
}

export async function getStaticPaths() {
    const slugs = await getPageSlugs();

    console.log(slugs);

    return {
        paths: slugs.map((slug) => (
        {
            params: {
                pageSlug: `${slug.slug}`
            }
        }
        )),
        fallback: false
    };
}