import Pokemon from "@/components/Pokemon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const LIMIT = 20;

export default async function DashBoard({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  console.log(searchParams);
  const { page } = searchParams;
  const offset = page ? (Number(page) - 1) * LIMIT : 0;
  const pokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${LIMIT}`,
    {
      cache: "force-cache",
    }
  );
  const data = await pokemonData.json();
  const count = data.count;
  const pageCount = Math.ceil(count / LIMIT);
  const arr = new Array(pageCount).fill(0).map((_, i) => i + 1);

  return (
    <div>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
        {data.results.map((item: { name: string; url: string }) => {
          return (
            <li key={item.name} style={{ listStyleType: "none" }}>
              <Suspense fallback={<p>loading...</p>}>
                <Pokemon item={item} />
              </Suspense>
            </li>
          );
        })}
      </ul>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {arr.map((item) => (
          <li style={{ listStyleType: "none" }} key={item}>
            <Link href={`?page=${item}`} scroll={false}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
