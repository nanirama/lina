import { NextPage, GetStaticProps } from "next";
import React from "react";
import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useRouter } from "next/router";
import Link from "next/link";
import { format } from "date-fns";

import { getAllPosts, getPost, Post } from "../../lib/blog";
import BlogTemplate from "../../components/blog/BlogTemplate";
import PostContent from "../../components/blog/PostContent";
import Custom404 from "./404";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "post" 
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'post',
    'fields.slug': params.slug
  })

  return {
    props: { post: items[0] }
  }

}

type BlogProps = {
  post: Post;
};

const Blog: NextPage<BlogProps> = ({ post }) => {
  console.log('Post Info', post)
  const router = useRouter();

  if (!post?.fields?.slug) {
    return <Custom404 loading={router.isFallback} />;
  }

  return (
    <BlogTemplate>
      <section className="pt-12 md:pt-16 px-6 flex flex-col items-center justify-center">
        <div className="container">
          <Link href="/blog">
            <a className="text-sm">← Back to Lina Blog home</a>
          </Link>
        </div>
        <div className="container flex flex-col items-center my-8 md:my-12">
          <h1 className="text-4xl">{post.fields.title}</h1>
          <time className="text-xs text-gray-500" dateTime={post.fields.date}>
            {format(new Date(post.fields.date), "LLLL d, yyyy")}
          </time>
          <img
            alt={post.fields?.coverImage?.fields?.file?.fileName}
            src={post.fields?.coverImage?.fields?.file?.url}
            className="my-8 md:px-12"
          />
          <div className={`w-full text-justify md:px-12`} >
            {post?.fields?.author?.fields?.name}
          {documentToReactComponents(post.fields.content)}
          </div>
          {/* <PostContent>{post.fields.content}</PostContent> */}
        </div>
      </section>
    </BlogTemplate>
  );
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const post = await getPost(params!.slug as string);
//   return { props: { post } };
// };

// export async function getStaticPaths() {
//   const allPosts = await getAllPosts();

//   return {
//     paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
//     fallback: true,
//   };
// }

export default Blog;
