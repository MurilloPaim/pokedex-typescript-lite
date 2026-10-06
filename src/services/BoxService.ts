import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import type { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";
import { formatarPokemon } from "../utils/textFormatters";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];
  private caminhoArquivo: string;

  constructor(caminhoArquivo: string) {
    this.caminhoArquivo = caminhoArquivo;
  }

  async carregar(): Promise<void> {
    if (!existsSync(this.caminhoArquivo)) {
      await this.salvar();
      return;
    }

    try {
      const texto = await readFile(this.caminhoArquivo, "utf-8");
      this.pokemons = JSON.parse(texto);
    } catch (erro) {
      throw new LocalBoxError(`Não foi possível ler o arquivo ${this.caminhoArquivo}`);
    }
  }

  private async salvar(): Promise<void> {
    try {
      const texto = JSON.stringify(this.pokemons, null, 2);
      await writeFile(this.caminhoArquivo, texto, "utf-8");
    } catch (erro) {
      throw new LocalBoxError(`Não foi possível salvar o arquivo ${this.caminhoArquivo}`);
    }
  }

  async adicionar(pokemon: PokemonResumo): Promise<void> {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    await this.salvar();
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    console.log("Catálogo atual:");
    this.pokemons.forEach((pokemon) => {
      console.log(formatarPokemon(pokemon));
    });
  }

  async remover(id: number): Promise<void> {
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    await this.salvar();
    console.log("[OK] Pokémon removido do catálogo.");
  }
}
