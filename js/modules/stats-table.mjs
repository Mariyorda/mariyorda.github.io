import { ElementsIds } from "./constants.mjs";
import { APP_STATE } from "./appstate.mjs";
import { FormParser, FormValidation, FormValidationRule } from "./form-utils/index.mjs";
import { HTMLTable, HTMLTableRow } from "./table.mjs";
 
const tableColumnKeys = {
    country: "country",
    numberOfCompanies: "numberOfCompanies",
    numberOfEmployees: "numberOfEmployees",
    totalUsers: "totalUsers",
};

const tableColumnHeadings = {
    [tableColumnKeys.country]: "Country",
    [tableColumnKeys.numberOfCompanies]: "Number of Companies",
    [tableColumnKeys.numberOfEmployees]: "Number of Employees",
    [tableColumnKeys.totalUsers]: "Total Users",
};

const COUNTRY_SELECT_KEY = "country-select";
const COLUMNS_SHOWN_KEY = "columns-shown";
const MIN_TOTAL_USERS_KEY = "min-total-users";

const DEFAULT_MIN_TOTAL_USERS = 0;
const DEFAULT_COLUMNS_SHOWN = [
    tableColumnKeys.country,
    tableColumnKeys.numberOfCompanies,
    tableColumnKeys.numberOfEmployees,
    tableColumnKeys.totalUsers,
];

function renderTable() {
    const config = APP_STATE.getStatsTableFilters() || {};

    config[MIN_TOTAL_USERS_KEY] = !config[MIN_TOTAL_USERS_KEY] ? DEFAULT_MIN_TOTAL_USERS : config[MIN_TOTAL_USERS_KEY];
    config[COLUMNS_SHOWN_KEY] = !config[COLUMNS_SHOWN_KEY] ? DEFAULT_COLUMNS_SHOWN : config[COLUMNS_SHOWN_KEY];

    const tableContainer = document.getElementById(ElementsIds.statsTableSectionId);

    const columnsNumber = config[COLUMNS_SHOWN_KEY].length;
    
    const table = new HTMLTable([
        `table_cols_${columnsNumber}`,
        "table_fullwidth",
        "table_dark",
        "table_sticky-header",
        "table_spacing_xl",
        "table_gap-y_xl",
        "table_height_s",
    ]);

    const filteredTableData = APP_STATE.statsTableData.filter(record => {
        return [
            !config[COUNTRY_SELECT_KEY] || config[COUNTRY_SELECT_KEY].toLowerCase() === record.country.toLowerCase(),
            record.totalUsers >= Number(config[MIN_TOTAL_USERS_KEY]),
        ].every(Boolean);
    });

    const tableHeaderRow = new HTMLTableRow(columnsNumber, [], true);
    
    config[COLUMNS_SHOWN_KEY].forEach((key, i) => {
        tableHeaderRow.getCol(i).textContent = tableColumnHeadings[key];
    });

    table.addHeaderRow(tableHeaderRow);

    filteredTableData.forEach(record => {
        const tableRow = new HTMLTableRow(columnsNumber, []);

        config[COLUMNS_SHOWN_KEY].forEach((key, i) => {
            tableRow.getCol(i).textContent = record[key];
        });

        table.addRow(tableRow);
    });
    
    tableContainer.textContent = "";
    table.render(tableContainer);
}

// FORM
    const formValidationSchema = {
        [COUNTRY_SELECT_KEY]: new FormValidationRule(COUNTRY_SELECT_KEY)
            .string()
            .oneOf(APP_STATE.statsTableAvaliableCountries, "Unsupported country"),
        [MIN_TOTAL_USERS_KEY]: new FormValidationRule(MIN_TOTAL_USERS_KEY)
            .number("Only numeric values are accepted")
            .min(0, "Only positive values are accepted")
            .max(100000, "Max value is 100000"),
    }

    const form = document.getElementById(ElementsIds.statsTableFormId);
    
    form.addEventListener("submit", event => {
        event.preventDefault();

        const formValues = {
            [COUNTRY_SELECT_KEY]: FormParser.getTextValue(form, COUNTRY_SELECT_KEY).trim(),
            [COLUMNS_SHOWN_KEY]: FormParser.getCheckboxValues(form, COLUMNS_SHOWN_KEY),
            [MIN_TOTAL_USERS_KEY]: FormParser.getTextValue(form, MIN_TOTAL_USERS_KEY),           
        };

        APP_STATE.setStatsTableFilters(formValues);

        const validationResult = FormValidation.validate(formValues, formValidationSchema);

        for (const formKey in formValues) {
            const errors = validationResult[formKey];
            const errorMessageBox = document.querySelector(`.input[name=${formKey}] + .input__error-message`);

            if (errors && errorMessageBox) {
                errorMessageBox.classList.remove("input__error-message_hidden");
                errorMessageBox.textContent = errors[errors.length - 1];
            } else if (errorMessageBox) {
                errorMessageBox.classList.add("input__error-message_hidden");
                errorMessageBox.textContent = "";
            }
        }

        if (Object.keys(validationResult).length > 0) {
            return;
        }

        renderTable();
    });

    const statsTableFilters = APP_STATE.getStatsTableFilters();

    form.elements[COUNTRY_SELECT_KEY].value = statsTableFilters[COUNTRY_SELECT_KEY];
    form.elements[MIN_TOTAL_USERS_KEY].value = statsTableFilters[MIN_TOTAL_USERS_KEY];

    Array.from(form.elements[COLUMNS_SHOWN_KEY]).forEach(checkbox => {
        if (statsTableFilters[COLUMNS_SHOWN_KEY].includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });

    renderTable();
