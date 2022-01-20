import Link from "next/link";

import BlogTemplate from "../../components/blog/BlogTemplate";
import Section from "../../components/landing/Section";

export default function Custom404({ loading = false }) {
  return (
    <BlogTemplate>
      <Section className="flex justify-center">
        <div className="container text-center my-auto">
          <h1 className="text-2xl">
            {loading ? "Loading…" : "Post not found"}
          </h1>
          {!loading && (
            <Link href="/blog">
              <a className="underline">Go to Blog home</a>
            </Link>
          )}
        </div>
      </Section>
    </BlogTemplate>
  );
}
