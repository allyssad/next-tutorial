import fs from 'fs'; // node module that lets you read files from the file system
import path from 'path'; // module that lets you manipulate file paths
import matter from 'gray-matter'; // lib that lets your parse the metadata in each markdown file

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// can fetch data from other sources, e.g. external API endpoint:
export async function getSortedPostsDataFromAPI() {
  //instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('...');
  return res.json();
}

// can query the db directly:
// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...);

// export async function getSortedPostDataFromDB() {
//   return databaseClient.query('SELECT posts...')
// }

// NOTE about getStaticProps
// runs ONLY on the server-side - won't be included in JS bundle for browser. Means you can write code such as direct database queries without sending them to the browser
// meant to be un at build time so you won't be able to use data that's only available during request time (e.g. query params or HTTP headers)
// can only be exported from a "page"

// FETCHING DATA at REQUEST TIME using SERVER-SIDE RENDERING

// use getServerSideProps instead of getStaticProps
// use only when you need to pre-render a page whose data must be fetched at request time!

export async function getServerSideProps(context) {
  // "context" param contains request specific parameters
  return {
    props: {
      // props for your component
    },
  };
}

// can also do both! pre-render without data and then load hte data on the client-side
// works well for user dashboard pages
// because a dashboard = private, user-specific pages, SEO is not relevant and page doesn't need to be pre-rednered
// data is frequently updated, which requires request-time data fetching

// SWR React hook for data fetching:
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}</div>;
}

// highly recommended for fetching data on client side
// handles caching, revalidation, focus tracking, refetching on interval, and more
