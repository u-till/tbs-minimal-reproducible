import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { baseUrl } from "../../constants";
import { getMenu, getPosts } from "../../utils/dataservice.js";

///////////////
////Style
///////////////
const PostContentDiv = styled.div`
  margin-top: 16px;
`;

const PostPaper = styled.div`
  max-width: 748px;
  transition: height 0.2s;
  overflow-y: auto;
  @media (max-width: 600px) {
    height: 100vh;
  }
`;

const NewsPaperWrapper = styled.div`
  @media (max-width: 1084px) {
    padding-top: 0;
  }
  p {
    padding-bottom: 16px;
  }
  img:first-child {
    max-width: 900px;
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: center;
  }
`;

///////////////
////React
///////////////

export default function Post(props) {
  return (
    <>
      <div>
        <h1>{props.post[0].title.rendered}</h1>
        <hr />
        <PostContentDiv
          dangerouslySetInnerHTML={{
            __html: props.post[0].content.rendered,
          }}
        />
      </div>
    </>
  );
}

///////////////
////Next get Data
///////////////

export async function getStaticProps({ params: { slug }, locale, locales }) {
  const menuData = await getMenu(locales);
  const postRes = await fetch(
    `${baseUrl}/${locale}/wp-json/wp/v2/posts?slug=${slug}`
  );

  const post = await postRes.json();

  return {
    props: {
      post,
      menuData,
    },
    //TODO evtl menu url fetch is the problem
    revalidate: 60,
  };
}

///////////////
////Next get Paths
///////////////

export async function getStaticPaths({ locales }) {
  const publishedPosts = await getPosts(locales);

  const paths = publishedPosts.posts.map((post) => ({
    params: { slug: post.slug },
    locale: post.wpml_current_locale.substring(0, 2),
  }));

  return { paths, fallback: false };
}
