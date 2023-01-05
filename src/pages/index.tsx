import { withUrqlClient } from "next-urql";
import { useEffect } from "react";
import { useQuery } from "urql";
import { NavBar } from "../components/NavBar";
import { currentUser } from "../graphql/queries/me";
import { posts } from "../graphql/queries/posts";
import { urqlClient } from "../utils/urqlClient";
const Index = () => {
  const [{ data }] = useQuery({ query: posts });
  const [{ data: user, fetching }, fetchQuery] = useQuery({
    query: currentUser,
    pause: true,
  });
  useEffect(() => {
    !user && fetchQuery();
  }, []);

  return (
    <div>
      {<NavBar user={user} loading={fetching} />} <div>Hello Gee</div>
      <br />
      {!data
        ? null
        : data.posts.map((post) => (
            <div key={post.id}>
              {post.id} {post.title}
            </div>
          ))}
    </div>
  );
};

export default withUrqlClient(urqlClient, { ssr: true })(Index);
