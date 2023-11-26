import Link from "next/link";
import Head from "next/head.js";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{"404 - Sorry bro"}</title>
      </Head>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </>
  );
}
