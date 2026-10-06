import type { PokemonResumo } from "../models/Pokemon";

export function formatarPokemon(pokemon: PokemonResumo): string {
  const tipos = pokemon.tipos.join(", ");
  // A PokeAPI informa altura em decímetros e peso em hectogramas
  const alturaEmMetros = pokemon.altura / 10;
  const pesoEmKg = pokemon.peso / 10;

  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${alturaEmMetros} m | Peso: ${pesoEmKg} kg | HP: ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`;
}
