import db, { runQuery } from "../lib/db.js"

export const adminModel = {

    updatePasswordFirstTime : function(uid , newPassword){  
            return `UPDATE public."admin"
            SET 
            "password"='${newPassword}', 
            is_change_password=true, 
            change_password_date=CURRENT_TIMESTAMP
            WHERE admin.uid = '${uid}' 
            `
    },
    getAdmin : function(uid , password){
        
        const query =  db('admin as a')
        .leftJoin('employee as e', 'a.uid', 'e.employee_id')
        .leftJoin("base_med_department as bmd", "e.base_med_department_id", "bmd.base_med_department_id")
        .join('admin_role as ar','a.admin_id','ar.admin_id')
        .join('role as r','ar.role_id','r.role_id')
        .select(
          db.raw('COALESCE(a.firstname, e.firstname) AS firstname'),
          db.raw('COALESCE(a.lastname, e.lastname) AS lastname'),
          'a.*',
          'r.role_id',
          'r.role_name',
          'r.role_level',
          'e.base_med_department_id',
          'bmd.description'
        ).where('a.active', true)

        if(uid){
            query.where('a.uid' , uid)
        }
        if(password){
            query.andWhere('a.password',password)
        }
        return query

    },
    getAdminById : function(admin_id){
        
        const query =  db('admin as a')
        .leftJoin('employee as e', 'a.uid', 'e.employee_id')
        .leftJoin("base_med_department as bmd", "e.base_med_department_id", "bmd.base_med_department_id")
        .join('admin_role as ar','a.admin_id','ar.admin_id')
        .join('role as r','ar.role_id','r.role_id')
        .select(
          db.raw('COALESCE(a.firstname, e.firstname) AS firstname'),
          db.raw('COALESCE(a.lastname, e.lastname) AS lastname'),
        
          'a.*',
          'r.role_id',
          'r.role_name',
          'r.role_level',
          'e.base_med_department_id',
          'bmd.description'
        ).where('a.active', true)

        if(admin_id){
            query.where('a.admin_id' , admin_id)
        }
      
        return query

    },
    getImedPassword : function(admin_id) {
        const query = db('admin as a')
        .select('a.admin_id', 'a.uid', 'e.password')
        .innerJoin('employee as e', 'a.uid', 'e.employee_id')
        .where('a.password_type', '1')
        .andWhere('a.active', true);

        if(admin_id){
            query.where('a.admin_id', admin_id)
        }
      
        return query;
      
    },
    getImedUser : function(admin_uid) {
        const query = db('employee as em').where('em.employee_id', admin_uid);
        
        return query;
    }
}
