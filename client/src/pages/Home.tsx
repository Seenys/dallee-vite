import { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post: any) => {
      return <Card key={post._id} {...post} />;
    });
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setAllPosts(data.data.reverse());
      } catch (e) {
        console.log(e);
        alert(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          The Community Showcase is a place for you to share your best work with
          the world.
        </p>
      </div>
      <div className="mt-16">
        <FormField />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#66e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="Search Results" />
              ) : (
                <RenderCards data={allPosts} title="Post Not Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
