import knex from 'knex';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.PREVISIT_HOST,
        user: process.env.PREVISIT_USER,
        password: process.env.PREVISIT_PASSWORD,
        database: process.env.PREVISIT_DATABASE,
        port: process.env.PREVISIT_PORT,
    },
});

/**
 * Executes a query with optional transaction handling.
 * @param {Function} queryFunction - Function that returns a Knex query.
 * @param {knex.Transaction} [trx] - Optional transaction object.
 * @returns {Promise<{ success: boolean, data?: any, numRows?: number, error?: string }>}
 */

export async function runQuery(queryFunction, trx = null) {
    try {
        const query = queryFunction();
        const result = trx ? await query.transacting(trx) : await query;
        
        return { success: true, data: result, numRows: result.length || 0 };
    } catch (error) {
        console.error(chalk.red(`Database query failed: ${queryFunction.name || 'Unknown Query'}`), error.message || error);
        throw new Error(  `Database query failed: ${queryFunction.name || 'Unknown Query'}` );
    }
}

export default db;
