import graphqlRequest from "./graphqlRequest";

export async function createComment(body) {
    const mutation = {
        query: `mutation createComment(
            $author: String = "${body.author}", 
            $authorEmail: String = "${body.authorEmail}", 
            $clientMutationId: String = "uniqueId", 
            $commentOn: Int = ${parseInt(body.postId)}, 
            $content: String = "${body.content}") {
            createComment(
              input: {
                author: $author, 
                authorEmail: 
                $authorEmail, 
                clientMutationId: $clientMutationId, 
                content: $content, 
                commentOn: $commentOn
              }
            ) {
              success
            }
          }`
    };

    const resJson = await graphqlRequest(mutation);

    return resJson;
}

export async function getComments(slug) {
    const query = {
        query: `query getComments {
            post(id: "${slug}", idType: SLUG) {
              comments(where: {parentIn: "null"}) {
                nodes {
                  content
                  author {
                    node {
                      name
                      avatar {
                        url
                        height
                        width
                      }
                    }
                  }
                  date
                  parentId
                }
              }
              commentCount
            }
          }`
    };

    const resJson = await graphqlRequest(query);
    const post = resJson.data.post;

    console.log(JSON.stringify(post));

    return {
       comments: post.comments,
       commentCount: post.commentCount,
    }
}