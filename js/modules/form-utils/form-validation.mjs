export class FormValidation {
    static validate(obj, schema) {
        const schemaKeys = Object.keys(schema);
        const validationResult = {};

        schemaKeys.forEach(key => {
            const value = obj[key];
            const rule = schema[key];

            rule.assertions.forEach(assertion => {
                if (!assertion.fn(value)) {
                    if (validationResult[key]) {
                        validationResult[key].push(assertion.message);
                    } else {
                        validationResult[key] = [assertion.message];
                    }
                }
            });
        });

        return validationResult;
    }
}
