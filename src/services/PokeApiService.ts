import type {PokemonResumo, PokemonApiResponse } from "../models/Pokemon" ;

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
     try {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;
    const resposta = await fetch(url);

    if (!resposta.ok) {
      console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
      return null;
    }

    const dados: PokemonApiResponse = await resposta.json();
    const types = dados.types.map((t) => t.type.name);
    const statHp = dados.stats.find((s) => s.stat.name === "hp");
    const statAttack = dados.stats.find((s) => s.stat.name === "attack");
    const statDefense = dados.stats.find((s) => s.stat.name === "defense");

    if (!statHp || !statAttack || !statDefense) {
        console.log("[ERRO] Status não encontrado")
        return null;
    }

    console.log(`[OK] Pokémon encontrado: ${dados.name}`);

    return {
        id: dados.id,
        nome: dados.name,
        tipos: types,
        altura: dados.height,
        peso: dados.weight,
        hp: statHp.base_stat,
        ataque: statAttack.base_stat,
        defesa: statDefense.base_stat,
    };

  } catch (erro) {
    console.log(`[ERRO] Não foi possível buscar o Pokémon: ${nomeOuId}`);
    return null;
  }
}