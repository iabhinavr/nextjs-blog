import graphqlRequest from "./graphqlRequest";

export async function getPageSlugs() {
    const query = {
        query: `query getPageSlugs {
            pages {
              nodes {
                slug
              }
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    console.log(resJson);

    const slugs = resJson.data.pages.nodes;

    return slugs;
}

export async function getSinglePage(slug) {
    const query = {
        query: `query getSinglePage {
            pages(where: {name: "${slug}"}) {
              nodes {
                content
                date
                modified
                slug
                title
              }
            }
          }`
    }

    const resJson = await graphqlRequest(query);

    const pageData = resJson.data.pages.nodes[0];
    return pageData;
}