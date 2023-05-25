import database from "../db.json" assert { type: "json" };
import TerminalController from "./terminalController.js";
import Person from "./person.js";
import { save } from "./repository.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question("");
    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await save(person);
    return mainLoop();
  } catch (e) {
    console.error("DEU RUIM -->", e);
    return mainLoop();
  }
}

await mainLoop();

// 2 Bike,Aviao 4300 2020-05-23 2023-11-04
