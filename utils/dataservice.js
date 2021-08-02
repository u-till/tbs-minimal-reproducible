import { baseUrl } from "../constants";

//TODO somehow cache this shit so it isnt queried a thousand times

// GET MENU Functions to fetch menu data
export async function getMenu(locales) {
  locales = locales.filter((e) => e !== "catchAll");

  let mainMenuArr = [];
  let shopMenuArr = [];

  await Promise.all(
    locales.map(async (locale) => {
      try {
        const res = await fetch(
          `${baseUrl}/${locale}/wp-json/menus/v1/menus/34`
        );
        const menuItem = await res.json();
        mainMenuArr.push({ [locale]: menuItem });
      } catch (err) {
        console.log(err);
      }
    })
  );

  await Promise.all(
    locales.map(async (locale) => {
      try {
        const res = await fetch(
          `${baseUrl}/${locale}/wp-json/menus/v1/menus/35`
        );
        const menuItem = await res.json();
        shopMenuArr.push({ [locale]: menuItem });
      } catch (err) {
        console.log(err);
      }
    })
  );

  return {
    props: {
      mainMenuArr,
      shopMenuArr,
    },
  };
}

//GET POST Functions to fetch post or posts

export async function getPost(locales) {
  locales = locales.filter((e) => e !== "catchAll");

  let postArr = [];

  await Promise.all(
    locales.map(async (locale) => {
      try {
        const res = await fetch(`${baseUrl}/${locale}/wp-json/wp/v2/posts`);
        const postItems = await res.json();
        postArr.push({ [locale]: postItems });
      } catch (err) {
        console.log(err);
      }
    })
  );

  return {
    props: {
      postArr,
    },
  };
}
export async function getPosts(locales) {
  locales = locales.filter((e) => e !== "catchAll");

  let postArr = [];
  await Promise.all(
    locales.map(async (locale) => {
      try {
        const res = await fetch(`${baseUrl}/${locale}/wp-json/wp/v2/posts`);
        const posts = await res.json();
        postArr.push(...posts);
      } catch (err) {
        console.log(err);
      }
    })
  );

  const posts = postArr.filter((post) => {
    return post.status === "publish";
  });

  return {
    posts,
  };
}
