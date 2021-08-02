import Link from "next/link";
import { getPosts } from "../utils/dataservice";

export default function Home({ paths }) {
  console.log(paths);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {paths.map((path, index) => {
          return (
            <li key={index}>
              <Link
                href={`/post/${path.params.slug}`}
                passHref
                locale={path.locale}
              >
                <a>{path.params.slug}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps({ locales }) {
  const publishedPosts = await getPosts(locales);

  const paths = publishedPosts.posts.map((post) => ({
    params: { slug: post.slug },
    locale: post.wpml_current_locale.substring(0, 2),
  }));

  return { props: { paths } };
}
