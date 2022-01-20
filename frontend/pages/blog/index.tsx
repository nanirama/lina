import { NextPage } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { createClient } from 'contentful'

import BlogTemplate from "../../components/blog/BlogTemplate";
import { getAllPosts, Posts } from "../../lib/blog";

type IndexProps = {
  allPosts: Posts;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const Index: NextPage<IndexProps> = ({ allPosts }) => {
  const { items } = allPosts
  console.log('All Posts', allPosts)
  return(
  <BlogTemplate>
    <section className="pt-16 md:pt-18 px-6 flex justify-center bg-seashell relative">
      <div className="md:px-20 container grid grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-3xl md:text-4xl mb-4 md:mb-8">Blog Posts</h1>
          <div className="font-light leading-relaxed mb-4 md:mb-8">
            We’re here to tell you what we know, but don’t take it as medical
            advice. Talk to your medical provider about your specific health
            concerns.
          </div>
        </div>
      </div>
    </section>
    <section className="py-8 flex flex-col items-center justify-center">
      <header className="container flex flex-col items-center justify-center">
        <h1 className="uppercase text-2xl">Recent posts</h1>
        <span
          className="block m-2 w-24"
          style={{ borderTop: "seashell 2px solid" }}
        />
      </header>
      <div className="container grid grid-cols-1 md:grid-cols-3 mt-8 gap-x-4 gap-y-4">
        {items && items.map(({fields},index)=>{
          return(
            <article
            key={fields.slug}
            className="relative mx-2 md:mx-0 mb-20"
            style={{ paddingBottom: "80%" }}
          >
            <Link href={`/blog/${fields.slug}`}>
              <a
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${fields.coverImage?.fields?.file?.url})`,
                  backgroundSize: "cover",
                }}
              >
                <span
                  className="absolute flex flex-col justify-between items-center w-full"
                  style={{ bottom: "-4rem" }}
                >
                  <h3 className="m-0 p-0 leading-tight">{fields.title}</h3>
                  <time className="text-xs text-gray-500" dateTime={fields.date}>
                    {format(new Date(fields.date), "LLLL d, yyyy")}
                  </time>
                </span>
              </a>
            </Link>
          </article> 
          )
        })}
        {/* {allPosts?.edges.map(({ node: post }) => (
          <article
            key={post.slug}
            className="relative mx-2 md:mx-0 mb-20"
            style={{ paddingBottom: "80%" }}
          >
            <Link href={`/blog/${post.slug}`}>
              <a
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${post.featuredImage?.node?.sourceUrl})`,
                  backgroundSize: "cover",
                }}
              >
                <span
                  className="absolute flex flex-col justify-between items-center w-full"
                  style={{ bottom: "-4rem" }}
                >
                  <h3 className="m-0 p-0 leading-tight">{post.title}</h3>
                  <time className="text-xs text-gray-500" dateTime={post.date}>
                    {format(new Date(post.date), "LLLL d, yyyy")}
                  </time>
                </span>
              </a>
            </Link>
          </article>
        ))} */}
      </div>
    </section>
  </BlogTemplate>
  )};

export default Index;

export async function getStaticProps() {
   const allPosts = await client.getEntries({ content_type: "post", order: '-sys.createdAt' })
  //const allPosts = await getAllPosts(true);
  return { props: { allPosts } };
}

