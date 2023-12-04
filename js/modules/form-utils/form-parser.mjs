export class FormParser {
    static getCheckboxValues(form, key) {
        const checkboxEl = form[key];

        const isCheckboxSingle = checkboxEl && checkboxEl.type === "checkbox";
        const isCheckboxMultiple = checkboxEl && checkboxEl.length && checkboxEl[0].type === "checkbox";
        const isCheckbox = isCheckboxSingle || isCheckboxMultiple;

        if (!isCheckbox) {
            return null;
        }

        if (isCheckboxMultiple) {
            return Array.from(checkboxEl)
                .filter(option => option.checked)
                .map(option => option.value);
        }

        return checkboxEl.checked ? [checkboxEl.value] : [];
    }

    static getTextValue(form, key) {
        const inputEl = form[key];

        const isText = inputEl && inputEl.type === "text";

        if (!isText) {
            return null;
        }

        return inputEl.value;
    }
}
