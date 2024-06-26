import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <Head>
        <title>Home - Compress App</title>
        <meta
          name="description"
          content="Compress your images and PDFs easily."
        />
        <meta name="keywords" content="compress, image, pdf, online tool" />
      </Head>
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        Welcome to Compress App
      </h1>
      <p className="mt-4 text-lg sm:text-xl">Select an option below:</p>
      <div className="mt-6">
        <Link
          href="/compress-image"
          className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
        >
          Compress Image
        </Link>
      </div>
      <div className="mt-4">
        <Link
          href="/compress-pdf"
          className="px-4 py-2 border border-black rounded-md hover:bg-gray-200"
        >
          Compress PDF
        </Link>
      </div>
    </div>
  );
}
