import graphqlRequest from "./graphqlRequest";

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

export async function getPostList(endCursor = null, taxonomy = null) {

  let condition = `where: {orderby: {field: DATE, order: DESC}}, first: 5, after: "${endCursor}"`;

  if(taxonomy) {
    condition = `where: {orderby: {field: DATE, order: DESC}, ${taxonomy.key}: "${taxonomy.value}"}, first: 5, after: "${endCursor}"`;
  }
  

  const query = {
    query: `query getMorePosts {
        posts(${condition}) {
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
  const morePosts = resJson.data.posts;
  
  return morePosts;
}

export async function getCategorySlugs() {
  const query = {
    query: `query getAllCategorySlugs {
                categories {
                    nodes {
                        slug
                    }
                }
            }`
  };

  const resJson = await graphqlRequest(query);
  const categories = resJson.data.categories.nodes;

  return categories.map((category) => {
    return {
      params: {
        categoryName: category.slug
      }
    }
  });
}

export async function getCategoryDetails(slug) {
  const query = {
    query: `query getCategoryDetails {
                categories(where: {slug: "${slug}"}) {
                    nodes {
                        name
                        slug
                        count
                    }
                }
            }`
  };

  const resJson = await graphqlRequest(query);
  const categoryDetails = resJson.data.categories.nodes[0];

  return categoryDetails;
}