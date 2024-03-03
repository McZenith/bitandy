import { redirect } from "next/navigation";

async function getData() {
  await fetch("https://bitandy.vercel.app/api/aws");
}

export default async function Home() {
  await getData();
  redirect("https://18.134.91.60");

  return <main>Hello World</main>;
}
