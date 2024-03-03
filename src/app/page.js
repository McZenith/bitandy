import { redirect } from "next/navigation";

async function getData() {

  const res = await import("../app/api/aws/route");

  return await (await res.GET()).json();
}

export default async function Home() {
  await getData();
  redirect("https://18.134.91.60");

  return <main>Hello World</main>;
}
