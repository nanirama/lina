const graphQLFetch = async <T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> => {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  const response = await fetch(
    "https://linahealthblog.wpcomstaging.com/graphql",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || response.statusText || response.status);
  }
  return json as Promise<T>;
};

export type Comment = {
  id: string;
  parentId: string;
  author: {
    node: {
      name: string;
    };
  };
  date: string;
  content: string;
};

export type Post = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  author: {
    node: {
      name: string;
      firstName: string;
      lastName: string;
      avatar: {
        url: string;
      };
    };
  };
  comments?: {
    nodes: Comment[];
  };
};

export type Posts = {
  edges: { node: Post }[];
};

type PostsResponse = {
  data: { posts: Posts };
};

type PostResponse = {
  data: { post: Post };
};

export async function getAllPosts(isHome = false) {
  const { data } = await graphQLFetch<PostsResponse>(
    `
      query GetAllPosts($first: Int!) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              date
              slug
              excerpt
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              author {
                node {
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    { first: isHome ? 20 : 1000 }
  );

  return data?.posts;
}

export async function getPost(slug: string) {
  const { data } = await graphQLFetch<PostResponse>(
    `
      query GetPost($id: ID!) {
        post(id: $id, idType: SLUG) {
          title
          date
          slug
          excerpt
          content
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          author {
            node {
              name
              firstName
              lastName
              avatar {
                url
              }
            }
          }
          comments {
            nodes {  
              id
              parentId
              author {
                node {
                  name
                }
              }
              date
              content
            }
          }
        }
      }
    `,
    { id: slug }
  );

  return data?.post;
}
