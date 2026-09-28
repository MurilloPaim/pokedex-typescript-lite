import { buscarPokemon } from "./services/PokeApiService";

// TESTE TEMPORÁRIO do buscarPokemon — será substituído pelo menu depois
async function main() {
  console.log("Pokédex TypeScript Lite iniciado");

  const pikachu = await buscarPokemon("charizard");
  console.log(pikachu);

  const inexistente = await buscarPokemon("pokemon-inexistente");
  console.log(inexistente);
}

main();
