import graphqlRequest from "./graphqlRequest";

export async function getSeo(pageType = 'post', slug = '/') {
    const query = {
        query: `query getSeo {
            ${pageType}(id: "${slug}", idType: SLUG) {
              seo {
                opengraphImage {
                  mediaItemUrl
                }
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphTitle
                opengraphType
                opengraphUrl
                schema {
                  raw
                }
                title
                metaDesc
                opengraphSiteName
                readingTime
                opengraphPublisher
              }
            }
          }`
    };

    const getSeo = await graphqlRequest(query);
    const seoData = getSeo.data[pageType].seo;

    console.log('seodata...');
    console.log(seoData.opengraphImage.mediaItemUrl);

    return seoData;
}