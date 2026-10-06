import { createInterface } from "node:readline/promises";
import type { Interface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import type { CatalogoPokemon } from "../services/BoxService";
import { buscarPokemon } from "../services/PokeApiService";
import { LocalBoxError } from "../models/CustomErrors";
import { formatarPokemon } from "../utils/textFormatters";

export class TerminalController {
  private catalogo: CatalogoPokemon;
  private leitor: Interface;

  constructor(catalogo: CatalogoPokemon) {
    this.catalogo = catalogo;
    this.leitor = createInterface({ input: stdin, output: stdout });
  }

  async iniciar(): Promise<void> {
    try {
      await this.catalogo.carregar();

      let opcao = "";

      while (opcao !== "0") {
        this.mostrarMenu();
        opcao = (await this.leitor.question("Escolha uma opção: ")).trim();

        if (opcao === "1") {
          await this.buscarEAdicionar();
        } else if (opcao === "2") {
          this.catalogo.listar();
        } else if (opcao === "3") {
          await this.removerPorId();
        } else if (opcao !== "0") {
          console.log("[AVISO] Opção inválida.");
        }
      }

      console.log("Até logo!");
    } catch (erro) {
      if (erro instanceof LocalBoxError) {
        console.log(`[ERRO] ${erro.message}`);
      } else {
        console.log("[ERRO] Ocorreu um erro inesperado.");
      }
    } finally {
      this.leitor.close();
    }
  }

  private mostrarMenu(): void {
    console.log("");
    console.log("=== Pokédex TypeScript Lite ===");
    console.log("1 - Buscar Pokémon e adicionar ao catálogo");
    console.log("2 - Listar catálogo");
    console.log("3 - Remover Pokémon por ID");
    console.log("0 - Sair");
  }

  private async buscarEAdicionar(): Promise<void> {
    const nomeOuId = (await this.leitor.question("Nome ou ID do Pokémon: ")).trim().toLowerCase();

    if (nomeOuId === "") {
      console.log("[AVISO] Digite um nome ou ID.");
      return;
    }

    const pokemon = await buscarPokemon(nomeOuId);

    if (pokemon !== null) {
      console.log(formatarPokemon(pokemon));
      await this.catalogo.adicionar(pokemon);
    }
  }

  private async removerPorId(): Promise<void> {
    const resposta = (await this.leitor.question("ID do Pokémon a remover: ")).trim();
    const id = Number(resposta);

    if (resposta === "" || Number.isNaN(id)) {
      console.log("[AVISO] ID inválido. Digite apenas números.");
      return;
    }

    await this.catalogo.remover(id);
  }
}
