import { CatalogoPokemon } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main(): Promise<void> {
  const catalogo = new CatalogoPokemon("pc_box.json");
  const controller = new TerminalController(catalogo);

  await controller.iniciar();
}

main();
