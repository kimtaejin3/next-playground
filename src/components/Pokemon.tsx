import Image from "next/image";

type Props = {
  item: {
    name: string;
    url: string;
  };
};

export default async function Pokemon({ item }: Props) {
  const data = await fetch(item.url);
  const pokemon = await data.json();

  return (
    <div style={{ width: "200px", height: "200px", position: "relative" }}>
      {pokemon.sprites && pokemon.sprites.front_default && (
        <Image fill src={pokemon.sprites.front_default} alt="" />
      )}
    </div>
  );
}
