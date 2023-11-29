const F = (function() {
    class FormParser {
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

    class FormValidation {
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

    class FormValidationRule {
        constructor(key) {
            this.key = key;
            this.assertions = [];

            this.defaultErrorMessage = `Invalid ${this.key}`;
        }

        string(message) {
            this.assertions.push(
                this._assertion(
                    value => {
                        return !value || typeof this._isString(value);
                    },
                    message,
                )
            );

            return this;
        }

        number(message) {
            this.assertions.push(
                this._assertion(
                    value => {
                        return this._isNil(value) || this._isString(value) && this._isNumeric(value);
                    },
                    message,
                )
            );

            return this;
        }

        array(message) {
            this.assertions.push(
                this._assertion(
                    value => this._isArray(value),
                    message,
                )
            );

            return this;
        }

        required(message) {
            this.assertions.push(
                this._assertion(
                    value => !this._isNil(value),
                    message,
                )
            );

            return this;
        }

        min(minValue, message) {
            this.assertions.push(
                this._assertion(
                    /**
                     * @param {string} value - Value being checked
                     * @param options - Config object, options.min - min integer value  
                     * @description Check if the string is an integer (within boundaries)
                     */                    
                    value => !this._isNumeric(value) || validator.isInt(value, {min: minValue}),
                    message,
                )
            );

            return this;
        }

        max(maxValue, message) {
            this.assertions.push(
                this._assertion(
                    /**
                     * @param {string} value - Value being checked
                     * @param options - Config object, options.max - max integer value  
                     * @description Check if the string is an integer (within boundaries)
                     */
                    value => !this._isNumeric(value) || validator.isInt(value, {max: maxValue}),
                    message,
                )
            );

            return this;
        }

        minLength(minLength, message) {
            this.assertions.push(
                this._assertion(
                    /**
                     * @param {string} value - Value being checked
                     * @param options - Config object, options.minLength - min possible string length  
                     * @description Check if the string's length falls in a range
                     */       
                    value => !this._hasLength(value) || validator.isLength(value, {min: minLength}),
                    message,
                )
            );

            return this;
        }

        maxLength(maxLength, message) {
            this.assertions.push(
                this._assertion(
                    /**
                     * @param {string} value - Value being checked
                     * @param options - Config object, options.maxLength - max possible string length  
                     * @description Check if the string's length falls in a range
                     */      
                    value => !this._hasLength(value) || validator.isLength(value, {max: maxLength}),
                    message,
                )
            );

            return this;
        }

        oneOf(allowedValues, message) {
            this.assertions.push(
                this._assertion(
                    value => 
                        !this._isString(value) || 
                        this._isEmpty(value) || 
                        allowedValues.some(allowedValue => value.toLowerCase() === allowedValue.toLowerCase()),
                    message,
                )
            );

            return this;
        }

        has(requiredValue, message) {
            this.assertions.push(
                this._assertion(
                    value => !this._isArray(value) || value.includes(requiredValue),
                    message,
                )
            );

            return this;
        }

        _isString(value) {
            return typeof value === "string";
        }

        _hasLength(value) {
            return this._isString(value) || this._isArray(value);
        }

        _isNumeric(value) {
            /**
             * @param {string} value - Value being checked
             * @description Check if the string contains only numbers
             */   
            return validator.isNumeric(value);
        }

        _isArray(value) {
            return Array.isArray(value);
        }

        _isNil(value) {
            return value === null || value === undefined;
        }

        _isEmpty(value) {
            /**
             * @param {string} value - Value being checked
             * @description Check if the string has a length of zero
             */   
            return validator.isEmpty(value);
        }

        _assertion(fn, message = this.defaultErrorMessage) {
            return { fn, message };
        }
    }

    return {
        FormParser,
        FormValidation,
        FormValidationRule,
    };
})();
