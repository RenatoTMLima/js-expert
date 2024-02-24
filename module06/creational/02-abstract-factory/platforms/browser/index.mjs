import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableBrowserComponent from "./table.mjs";

export default class BrowserViewFactory extends ViewFactory {
  createTable() {
    return new TableBrowserComponent();
  }
}
