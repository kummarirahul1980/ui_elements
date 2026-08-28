

function DrawDynamicTable(TableObject, ListData) {
  // Creating the table body and head;
  const MessageBox = document.getElementById("rjelements_message_reciever")
  if (!Array.isArray(ListData) || ListData.length == 0) {
    if (MessageBox) { MessageBox.innerHTML = "Empty data"; }
    console.error("Recieved an empty data.");
    return 0;
  }

  TableObject.innerHTML = "";
  const Table = document.createElement("table");
  const THead = document.createElement("thead");
  const TBody = document.createElement("tbody");

  Table.appendChild(THead);
  Table.appendChild(TBody);

  const headers = Object.keys(ListData[0]);

  const HeaderRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    HeaderRow.appendChild(th);
  });

  THead.appendChild(HeaderRow);

  // Creation of body of table.

  // Row object iteration
  ListData.forEach((RowObject) => {
    const row = document.createElement("tr");

    // Data Entry
    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent =
        RowObject[header] && RowObject[header] != ""
          ? RowObject[header]
          : "<N/A>";
      row.appendChild(td);
    });

    TBody.appendChild(row);
  });
  TableObject.appendChild(Table);
  // Function Ends Here
}
