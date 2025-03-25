
export const logModel = {

    log : function (channel_id,uid, message, log_type, actionUID){
        
        let isActionUID 
        if(typeof actionUID === 'string'){
            isActionUID = `'${actionUID}'`
        }else{
            isActionUID = null;
        }

        return `
            INSERT INTO public.channel_logs
            (channel_id ,uid, message, log_type, log_time, action_uid)
            VALUES('${channel_id}','${uid}', '${message}', '${log_type}', CURRENT_TIMESTAMP ,${isActionUID});
        `
    },

    getLog : function (channel_id){
        let w_channel_id = ''
        if(channel_id){
            w_channel_id = `AND channel_id = '${channel_id}'`
        }
        return `
           SELECT * From channel_logs 
           WHERE row_id > 0 ${w_channel_id}
           ORDER BY log_time DESC
           ;
        `
    },

    logAdmin : function (uid, message, log_type, actionUID,channel_id){
        
        let isActionUID 
        if(typeof actionUID === 'string'){
            isActionUID = `'${actionUID}'`
        }else{
            isActionUID = null;
        }
        return `
            INSERT INTO public.admin_logs
            (uid, message, log_type, log_time, action_uid,channel_id)
            VALUES('${uid}', '${message}', '${log_type}', CURRENT_TIMESTAMP ,${isActionUID}, '${channel_id}');
        `
    },
    getLogAdmin : function (uid){
        let w_uid = ''
        if(uid){
            w_uid = `AND uid = '${uid}'`
        }
        return `
           SELECT * From admin_logs 
           WHERE row_id > 0 ${w_uid}
           ORDER BY log_time DESC
           ;
        `
    },
}