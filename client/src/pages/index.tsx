import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();

  console.log("Here is data:", data);

  return (
    <>
      {data?.user ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn("google")}>Sign in</button>
      )}
      {data?.user?.name}
    </>
  );
};

export default Home;
