import knex from 'knex'
import db, { runQuery } from '../lib/db.js'


export const previsitModel = {

    getPrevisit: async ({ client_id, pvs_id, lang = 'th', limit, offset, client_detail = true }) => {

        const query = db('previsit as p')
        if (pvs_id) query.where('p.previsit_id', pvs_id)
        if (client_detail) {
            query.with('religion_translations', (qb) => {
                qb.select('object_id')
                  .groupBy('object_id')
                  .select(db.raw('JSON_OBJECT_AGG(t.language_code, t.name) as religion_name'))
                  .from('translation as t')
                  .where('t.object_type', 'religion');
              })
              .with('occupation_translations', (qb) => {
                qb.select('object_id')
                  .groupBy('object_id')
                  .select(db.raw('JSON_OBJECT_AGG(t.language_code, t.name) as occupation_name'))
                  .from('translation as t')
                  .where('t.object_type', 'occupation');
              })
              .with('marriage_translations', (qb) => {
                qb.select('object_id')
                  .groupBy('object_id')
                  .select(db.raw('JSON_OBJECT_AGG(t.language_code, t.name) as marriage_name'))
                  .from('translation as t')
                  .where('t.object_type', 'marriage');
              })
              .select('p.*', 'c.*')
              .select('rt.religion_name', 'ot.occupation_name', 'mt.marriage_name')
              .from('previsit as p')
              .innerJoin('client as c', 'c.client_id', 'p.client_id')
              .leftJoin('religion as r', 'c.religion_id', 'r.base_religion_id')
              .leftJoin('religion_translations as rt', 'r.base_religion_id', 'rt.object_id')
              .leftJoin('occupation as o', 'c.occupation_id', 'o.fix_occupation_id')
              .leftJoin('occupation_translations as ot', 'o.fix_occupation_id', 'ot.object_id')
              .leftJoin('marriage as m', 'c.marriage_status', 'm.fix_marriage_id')
              .leftJoin('marriage_translations as mt', 'm.fix_marriage_id', 'mt.object_id')
              .orderBy('p.previsit_id', 'asc');
        }
        if (client_id) query.where('p.client_id', client_id)


        


        if (limit) {
            const pageSize = parseInt(limit, 10);
            query.limit(pageSize);
            // Apply offset only if it is provided along with limit
            if (offset) {
                const page = parseInt(offset, 10);
                query.offset((page - 1) * pageSize);
            }
        }
        console.log(query.toString());

        const result = await runQuery(() => query);


        return result
    },
    getSymptoms: async ({ pvs_id, lang = 'th', limit, offset, detail, client_detail = true }) => {
        const query = db('previsit as p')
            .leftJoin('client_symptom as cs', 'p.previsit_id', 'cs.previsit_id')
            .orderBy("cs.symptom_priority", 'desc')
            .where("c.active_status", true)

        if (pvs_id) query.where('p.previsit_id', pvs_id)
        if (client_detail) query.join('client as c', 'c.client_id', 'p.client_id')

        if (limit) {
            const pageSize = parseInt(limit, 10);
            query.limit(pageSize);
            // Apply offset only if it is provided along with limit
            if (offset) {
                const page = parseInt(offset, 10);
                query.offset((page - 1) * pageSize);
            }
        }

        const result = await runQuery(() => query);
        return result
    },

    getSymptoms: async ({ pvs_id, lang = 'th', limit, offset, detail, client_detail = true }) => {
        const query = db('previsit as p')
            .leftJoin('client_symptom as cs', 'p.previsit_id', 'cs.previsit_id')
            .orderBy("cs.symptom_priority", 'desc')


        if (pvs_id) query.where('p.previsit_id', pvs_id)
        if (client_detail) query.join('client as c', 'c.client_id', 'p.client_id').where("c.active_status", true)

        const result = await runQuery(() => query);
        return result
    },
    getInsurance: async ({ pvs_id, lang = 'th', limit, offset, detail, client_detail = true }) => {
        const query = db('previsit as p')
            .select('*', 'ts.name as payment_method_type_name')
            .innerJoin('client_insurance as ci', 'p.previsit_id', 'ci.previsit_id')
            .innerJoin('insurance as ins', 'ins.insurance_id', 'ci.insurance_id')
            .innerJoin(
                'translation as ts',
                function () {
                    this.on('ts.object_id', '=', 'p.payment_method_type_id')
                        .andOn('ts.object_type', '=', db.raw('?', ['payment_method_type']));
                }
            ).where('p.previsit_id', pvs_id)

        if (pvs_id) query.where('p.previsit_id', pvs_id)
        if (client_detail) query.join('client as c', 'c.client_id', 'p.client_id').where("c.active_status", true)

        if (lang) {
            query.where('ts.language_code', lang)
        }

        const result = await runQuery(() => query);
        return result
    },

    getConsent: async ({ pvs_id, lang = 'th', limit, offset, client_detail = true }) => {
        const query = db('previsit as p').select("*", 'ts.name as consent_name')
            .leftJoin('client_consent as cc', 'p.previsit_id', 'cc.previsit_id')
            .leftJoin('consent_form as cf', 'cf.consent_form_id', 'cc.consent_form_id')
            .leftJoin('translation as ts', 'ts.object_id', 'cf.consent_form_id')
            .where("ts.language_code", lang)
            .where('ts.object_type', 'consent')

        if (pvs_id) query.where('p.previsit_id', pvs_id)
        if (client_detail) query.join('client as c', 'c.client_id', 'p.client_id').where("c.active_status", true)

        if (limit) {
            const pageSize = parseInt(limit, 10);
            query.limit(pageSize);
            // Apply offset only if it is provided along with limit
            if (offset) {
                const page = parseInt(offset, 10);
                query.offset((page - 1) * pageSize);
            }
        }

        const result = await runQuery(() => query);
        return result
    },
}

