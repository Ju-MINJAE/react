import { useRouter } from 'next/router';

// our-domaion.com/news/something-important

function DetailPage() {
  const router = useRouter();

  const newsId = router.query.newsId;

  // send a request to ther backend API
  // to fetch the news  iten with newsId

  return <h1>The Detail Page.</h1>;
}

export default DetailPage;
