import type { PokemonResumo } from "../models/Pokemon";

export function formatarPokemon(pokemon: PokemonResumo): string {
  const tipos = pokemon.tipos.join(", ");

  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`;
}
