(function() {
    const tableColumnKeys = {
        name: "name",
        username: "username",
        email: "email",
        website: "website",
    };

    const tableColumnHeadings = {
        [tableColumnKeys.name]: "Name",
        [tableColumnKeys.username]: "Username",
        [tableColumnKeys.email]: "Email",
        [tableColumnKeys.website]: "Website",
    };

    const tableColumns = [
        tableColumnKeys.name,
        tableColumnKeys.username,
        tableColumnKeys.email,
        tableColumnKeys.website,
    ];

    const tableClassesCommon = ["table_fullwidth", "table_spacing_xl", "table_gap-y_xl", "table_height_s"];
    const tableClassesLoading = ["table_skeleton"];
    const tableClassesLoadingSuccess = ["table_dark", "table_sticky-header"];
    const tableClassesLoadingFail = ["table_dark"];

    function renderTable(statusCode) {
        if (typeof $$ === "object") {
            const isLoading = statusCode === __CONSTANTS__.FETCH_STATUS_PENDING;
            const isLoadingSuccess = statusCode === __CONSTANTS__.FETCH_STATUS_SUCCESS;
            const isLoadingFail = statusCode === __CONSTANTS__.FETCH_STATUS_FAIL;

            const columnsNumber = isLoadingFail ? 1 : tableColumns.length;

            const tableContainer = document.getElementById(__CONSTANTS__.USERS_SECTION_ID);
            
            const table = new $$.HTMLTable([
                `table_cols_${columnsNumber}`,
                ...tableClassesCommon,
                ...(isLoading ? tableClassesLoading : isLoadingSuccess ? tableClassesLoadingSuccess : tableClassesLoadingFail) 
            ]);
    
            const tableHeaderRow = new $$.HTMLTableRow(
                columnsNumber,
                isLoading ? ["table__row_empty"] : [],
                true,
            );
            
            if (isLoading) {
                table.addHeaderRow(tableHeaderRow);
        
                [0, 0, 0].forEach(record => {
                    const tableRow = new $$.HTMLTableRow(
                        columnsNumber,
                        "table__row_empty",
                    );
                    table.addRow(tableRow);
                });
            }

            else if (isLoadingSuccess) {
                tableColumns.forEach((key, i) => {
                    tableHeaderRow.getCol(i).textContent = tableColumnHeadings[key];
                });

                table.addHeaderRow(tableHeaderRow);
        
                __APP_STATE__.usersTableData.forEach(record => {
                    const tableRow = new $$.HTMLTableRow(columnsNumber, []);
        
                    tableColumns.forEach((key, i) => {
                        tableRow.getCol(i).textContent = record[key];
                    });
        
                    table.addRow(tableRow);
                });
            }

            else if (isLoadingFail) {
                table.addHeaderRow(tableHeaderRow);
            
                const tableRow = new $$.HTMLTableRow(columnsNumber, ["table__row_error"]);
                tableRow.getCol(0).textContent = "An error occurred while loading data";
    
                table.addRow(tableRow);
            }
            
            tableContainer.textContent = "";
            table.render(tableContainer);
        }
    }

    const updateButton = document.getElementById("users-update");

    updateButton.addEventListener("click", () => {
        dispatchEvent(
            __UTILS__.createCustomEvent(
                __CONSTANTS__.USERS_LOADING_START,
                {filter: {minUsernameLength: Math.floor(Math.random() * 5 + 6)}}
            )
        );
    });

    addEventListener(__CONSTANTS__.USERS_LOADING_STATUS_CHANGE, event => renderTable(event.detail));
})();
