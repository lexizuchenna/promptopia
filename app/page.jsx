import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="text-center orange_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="text-center desc">
        Promptopia is an open-source AI prompting tool for mordern world to
        discover, create and share create prompts
      </p>
      <Feed />
    </section>
  );
}

export default Home;
