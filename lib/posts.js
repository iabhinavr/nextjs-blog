import graphqlRequest from "./graphqlRequest";

export async function getAllPosts() {
    const query = {
        query: `query getAllPosts {
            posts {
              nodes {
                date
                excerpt(format: RENDERED)
                slug
                title
                featuredImage {
                  node {
                    mediaDetails {
                      file
                      sizes {
                        file
                        sourceUrl
                        width
                        height
                      }
                    }
                  }
                }
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    const allPosts = resJson.data.posts;

    return allPosts;

}

export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost {
      postBy(slug: "${slug}") {
        content
        date
        excerpt
        featuredImage {
          node {
            mediaDetails {
              sizes {
                file
                sourceUrl
                height
                width
              }
            }
          }
        }
        modified
        slug
        title
      }
    }`
  };

  const resJson = await graphqlRequest(query);

  const singlePost = resJson.data.postBy;

  return singlePost;
}

export async function getPostSlugs() {
  const query = {
    query: `query NewQuery {
      posts {
        nodes {
          slug
        }
      }
    }`
  };

  const resJson = await graphqlRequest(query);

  const slugs = resJson.data.posts.nodes;

  return slugs;
}