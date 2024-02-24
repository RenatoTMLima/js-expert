import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);

    document.body.insertAdjacentHTML("afterbegin", template);
  }

  prepareData(data) {
    const [firstItem] = data;
    const tHeaders = Object.keys(firstItem).map(
      (key) => `<th scope="col">${key}</th>`
    );

    const joinLists = (list) => list.join("");

    const tBodyValues = data
      .map((item) => Object.values(item).map((value) => `<td>${value}</td>`))
      .map((td) => `<tr>${joinLists(td)}</tr>`);

    const template = `
      <table class="table">
        <thead>
          <tr>${joinLists(tHeaders)}</tr>
        </thead>
        <tbody>${joinLists(tBodyValues)}</tbody>
      </table>
    `;

    return template;
  }
}
