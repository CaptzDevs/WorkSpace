import { getCurrentDateTime } from "../lib/dateTime.js"

export const controlModel = {

    insert: function(table, data) {

        let columns = '';
        let values = '';
        Object.keys(data).forEach((key, i) => {

            columns += (i > 0 ? ',' : '') + key;

            let value = data[key];

            if (typeof data[key] === 'string') {
                value = "'" + data[key] + "'";
            } else if (typeof data[key] === 'number' || typeof data[key] === 'boolean') {
                value = data[key];
            } else if (data[key] instanceof Date) {
                value = "'" + data[key].toISOString().slice(0, 19).replace('T', ' ') + "'";
            } else {
                value = JSON.stringify(data[key]);
            }

            values += (i > 0 ? ',' : '') + value;
        })


        return `INSERT INTO ${table} (${columns}) VALUES(${values});`

    },

    update: function(table, data, condition = null) {
        let updates = '';
        let conditions = condition? `WHERE ${condition}` : ""

        Object.keys(data).forEach((key, i) => {
            let value = data[key];

            if (typeof data[key] === 'string') {
                value = "'" + data[key].replace(/'/g, "''") + "'";
            } else if (data[key] instanceof Date) {
                value = "'" + data[key].toISOString().slice(0, 19).replace('T', ' ') + "'";
            } else if (typeof data[key] === 'object') {
                value = `'${JSON.stringify(data[key])}'::json`;
            } else {
                value = String(data[key]);
            }

            updates += (i > 0 ? ',' : '') + key + '=' + value;
        });

        return `UPDATE "${table}" SET ${updates} ${conditions};`;
    },

    delete: function(table, condition) {

        if(typeof condition === 'undefined' || typeof condition !== 'string'){
            console.log(new Error('Condition Required'))
            return 'Condition Required'
        }

        return `DELETE FROM "${table}" WHERE ${condition};`;
    }
}


