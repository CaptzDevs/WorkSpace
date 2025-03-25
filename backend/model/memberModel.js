import { getCurrentDateTime } from "../lib/dateTime.js"

export const memberModel = {
    getAdmin : function (uid){
        return `
        SELECT * 
        FROM Admin ad
        LEFT JOIN employee emp on ad.uid = emp.employee_id
        WHERE is_use = true
        ORDER BY order_priority ASC 
        ;
        `
    },
    getEmployee : function (uid){
        let w_uid = ''
        if(uid) w_uid = `AND emp.employee_id = '${uid}'`

        return `
            SELECT * 
            FROM employee emp
            JOIN base_med_department bmd on emp.base_med_department_id = bmd.base_med_department_id
            LEFT JOIN employee_doctor ed on emp.employee_id = ed.employee_id
            WHERE emp.fix_employee_type_id = ANY (ARRAY['1','2','3','5'])  ${w_uid}
            ;
        `
    },
    getPatient : function (hncode){
        let w_hncode = ''
        if(hncode) w_hncode = `AND hncode = '${hncode}'`

        return `
            SELECT *
            FROM patient
            WHERE active = '1' ${w_hncode}
            LIMIT 30
            ;
        `
    },
    getMember : function(channel_id , uid){
        let w_uid = '';
        let w_channel = '';
        if(channel_id) w_channel = `AND channel_id = '${channel_id}' `
        if(uid) w_uid = `AND uid = '${uid}' `

        return `
        SELECT fullname, uid, user_type , count(uid) cuid
        FROM channel_member
        WHERE row_id > 0 
        GROUP BY fullname, uid, user_type 
        ORDER BY cuid DESC
        ;
        `
    }, 

 

    getMemberPatient : function(channel_id , uid){
        let w_uid = '';
        let w_channel = '';
        if(channel_id) w_channel = `AND cm.channel_id = '${channel_id}' `
        if(uid) w_uid = `AND cm.uid = '${uid}' `

        return `
        SELECT *
        FROM channel_member cm
        JOIN patient pt on pt.hncode = cm.uid
        WHERE row_id > 0 ${w_channel} ${w_uid}
        ;
        `
    }, 

    getMemberEmployee : function(channel_id , uid){
        let w_uid = '';
        let w_channel = '';
        if(channel_id) w_channel = `AND cm.channel_id = '${channel_id}' `
        if(uid) w_uid = `AND cm.uid = '${uid}' `

        return `
        SELECT *
        FROM channel_member cm
        JOIN employee emp on emp.employee_id = cm.uid
        WHERE row_id > 0 ${w_channel} ${w_uid}
        ;
        `
    }, 
    searchPatient : function (searchText){
        return `
            SELECT *
            FROM patient
            WHERE 
            hncode LIKE '%${searchText}%' OR 
            LOWER(firstname) LIKE LOWER('%${searchText}%') OR 
            LOWER(lastname) LIKE LOWER('%${searchText}%') OR 
            LOWER(firstname) || ' ' || lastname LIKE LOWER('%${searchText}%') OR 
            pid LIKE '%${searchText}%' OR
            LOWER(passport_no) LIKE LOWER('%${searchText}%')
            ;
        `
    },
    adminLogin : function (eid , password){
        console.log(eid , password);
        return `
            SELECT *,
            emp.password AS imed_password,
            ad.password AS password
            FROM Admin ad
            LEFT JOIN employee emp on ad.uid = emp.employee_id
            LEFT JOIN admin_permission ap on ad.uid = ap.uid
            WHERE ad.uid = '${eid}' AND (ad.password = '${password}' OR emp.password = '${password}');
            `
    },

    employeeLogin : function (eid , password){
        console.log(eid , password);
        return `
            SELECT *
            FROM employee
            WHERE employee_id = '${eid}' AND password = '${password}';
            `
    },
    patientLogin : function (pid , birthdate ){
        return `
            SELECT *
            FROM patient pt
            WHERE pt.pid = '${pid}' AND pt.birthdate = '${birthdate}';
            `
    },
    foreignerLogin : function (pid , birthdate ){
        return `
            SELECT *
            FROM patient pt
            WHERE pt.passport_no = '${pid}' AND pt.birthdate = '${birthdate}';
            `
    },

    guestLogin : function (uid , password){
        return `
            SELECT *
            FROM guest
            WHERE uid = '${uid}' AND password = '${password}';
            `
    },



    updateTempUID : function (uid,channelId,temp_uid){
        return `UPDATE channel_member
        SET 
            temp_uid = '${temp_uid}'
            where uid = '${uid}' AND channel_id = '${channelId}';`
    },

    getAdminPermission : function(uid){
        return `SELECT row_id, uid, permission_id, date_create
                FROM public.admin_permission
                WHERE uid = '${uid}'
                ;
        `
    },

    addGuest : function(uid ,password , r_password, guest_name , expire_time , create_by){
        return `INSERT INTO public.guest
        (uid, "password", fullname, relate_to, expire_time, create_by , real_password)
        VALUES('${uid}', '${password}', '${guest_name}', '0', '${expire_time}','${create_by}','${r_password}');
        `
    },
    getGuest : function(uid){
        let w_uid = ''
        if(uid) w_uid = `AND uid = '${uid}'`

        return `SELECT *
        FROM public.guest
        WHERE row_id > 0 ${w_uid}
        ORDER BY row_id DESC
        `
    },
    updateMemberGuestName : function ({ fullname  , uid }){
        return `UPDATE public.channel_member
        SET  fullname='${fullname}'
        WHERE uid = '${uid}'
        ;
        `;
    },
    updateGuestName : function ({ fullname , relateTo , uid }){
        return `UPDATE public.guest
        SET  fullname='${fullname}', relate_to='${relateTo}',is_name_changed=true,update_time=CURRENT_TIMESTAMP
        WHERE uid = '${uid}'
        ;
        `;
    },
    getGuestMaxUID : function(uid){
        return `SELECT *
        FROM public.guest
        ORDER BY row_id DESC
        `
    },


    updateLocation : function (channel_id,uid,location){
        return `UPDATE channel_member
        SET 
            location = '${location}'
            where channel_id = '${channel_id}' AND uid = '${uid}';`
    },

    addAdmin : function({uid , firstname , lastname , password , role , create_by}){
        return `INSERT INTO public."admin"
        (uid, firstname, lastname, "password", "role", create_by, create_time, custom)
        VALUES('${uid}', '${firstname}', '${lastname}', '${password}', '${role}', '${create_by}', CURRENT_TIMESTAMP, false);
        `
    },
    getPermissionList : function(){
        return `SELECT *
        FROM permission 
        WHERE is_active = true
        ORDER BY permission_id ASC
        
        ;
        `
    },
    grantPermission : function(permissionSet){
        const values = permissionSet.map(
            (perm, index) => {
               return `(${Object.keys(perm).map(item=> `'${perm[item]}'`)})`
            }
        ).join(', ');
        
        return `INSERT INTO public.admin_permission
        (uid, permission_id, create_by)
        VALUES${values};`
    },
    revokePermissionById : function({row_id}){
        return `DELETE FROM public.admin_permission
        WHERE row_id='${row_id}';
        `
    },
    
    revokePermission : function({uid , permissionID}){
        let permissionIdSet = []
        permissionID = permissionID.map(item =>{
            return `'${item}'`
        })

        console.log(permissionID.join(','));
        

        return `DELETE FROM public.admin_permission
        WHERE uid='${uid}' AND permission_id IN (${permissionID})
        `
    },
    removeAdmin : function(uid){
        return `DELETE FROM public.admin
        WHERE uid='${uid}'
        `
    }
}