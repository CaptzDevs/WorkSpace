import { getCurrentDateTime } from "../lib/dateTime.js"

export const channelModel = {
    get: function (channel_id) {

        let w_id = ''
        if (channel_id) w_id = `WHERE c.channel_id = '${channel_id}'`

        return `
            SELECT *
            FROM channel c
            ${w_id}
            ORDER BY c.row_id DESC
            ;
        `
    },

    getOwner: function ({channel_id , start_time,end_time}) {
        let w_id = ''
        let w_startTime = ''
        if (channel_id) w_id = `WHERE c.channel_id = '${channel_id}'`
        if (start_time) w_startTime = `WHERE (c.start_time - interval '7 hours')::DATE >= '${start_time}' AND (c.start_time - interval '7 hours')::DATE <= '${end_time}'`

        return `
        SELECT *, 
        c.row_id AS row_id,
        CASE
            WHEN c.expire_time IS NULL THEN 'empty'
            WHEN c.channel_active = true THEN 
                CASE 
                    WHEN current_timestamp <= (c.expire_time - interval '7 hours') THEN 'active'
                    ELSE 'expired'
                END
            ELSE 'closed'
        END AS status
    FROM channel c
    LEFT JOIN channel_member cm ON c.channel_id = cm.channel_id AND cm.is_owner = true
    ${w_id} ${w_startTime}
    ORDER BY c.start_time ASC;
    
        `
    },

    grantOwner: function (uid, channelId) {
        return `UPDATE channel_member
        SET 
            is_owner = true
            where uid = '${uid}' AND channel_id = '${channelId}';`
    },

    revokeOwner: function (channelId) {
        return `UPDATE channel_member
        SET 
            is_owner = false
            where channel_id = '${channelId}';`
    },

    gets: function (conditions) {

        let w_id = ''
        let w_startTime = ''

        if (conditions.channel_id) w_id = `WHERE c.channel_id = '${channel_id}'`
        if (conditions.start_time) w_startTime = `WHERE c.start_time = '${conditions.start_time}'`

        return `
            SELECT *
            FROM channel c
            ${w_startTime}
            ORDER BY c.row_id DESC
            ;
        `
    },
    getChannelWithRecordData: function (channel_id) {

        let w_id = ''
        if (channel_id) w_id = `WHERE c.channel_id = '${channel_id}'`

        return `
            SELECT c.row_id, c.channel_id, c.channel_token, c.channel_name_init,
            c.channel_name, c.channel_access, c.max_member, c.duration, c.create_by, c.create_time, c.expire_time,
            c.update_time, c.channel_active, c.end_session_by, c.end_session_time, create_token_time , c.channel_password,
            cr.start_time ,cr.stop_time, cr.video_url , cr.resource_id , c.start_time as slot_time
            FROM channel c
            LEFT JOIN channel_record cr on c.channel_id = cr.channel_id AND cr.stop_time IS NOT NULL
            ${w_id}
            ORDER BY c.row_id DESC
            ;
        `
    },
    createEmpty: function (channelData) {

        return `INSERT INTO channel
        (   channel_id,
            channel_name_init,
            channel_name,
            channel_access,
            max_member,
            duration,
            create_by,
            channel_password,
            start_time
        )
        VALUES(
                '${channelData.channel_id}',
                '${channelData.channel_name_init}',
                '${channelData.channel_name}',
                ${channelData.channel_access},
                ${channelData.max_member},
                ${channelData.duration},
                '${channelData.create_by}',
                '${channelData.channel_password}',
                '${channelData.start_time}'

               );
        `;
    },
    create: function (channelData) {

        return `UPDATE channel
        SET 
            channel_token='${channelData.channel_token}',
            expire_time='${channelData.expire_time}',
            create_token_time=CURRENT_TIMESTAMP,
            update_time=CURRENT_TIMESTAMP
            where channel_id = '${channelData.channel_id}' RETURNING channel_id , create_token_time
            ;
        `;
    },
    create_old: function (channelData) {

        return `INSERT INTO channel
        (channel_id, channel_token,channel_name_init,channel_name, channel_access, max_member, duration, create_by, expire_time, update_time)
        VALUES(
                '${channelData.channel_id}',
                '${channelData.channel_token}',
                '${channelData.channel_name_init}',
                '${channelData.channel_name}',
                ${channelData.channel_access},
                ${channelData.max_member},
                ${channelData.duration},
                ${channelData.create_by},
                '${channelData.expire_time}',
                NULL);
        `;
    },

    update: function (id, channelData) {

        return `UPDATE channel
        SET 
            channel_id='${channelData.channel_id}',
            channel_token='${channelData.channel_token}',
            channel_name='${channelData.channel_name}',
            channel_access=${channelData.channel_access},
            max_member=${channelData.max_member},
            duration=${channelData.duration},
            expire_time='${channelData.expire_time}',
            update_time=CURRENT_TIMESTAMP
            where channel_id = '${id}'
            ;
        `;
    },

    join: function (channel_id, uid) {

        return `UPDATE channel_member
        SET 
            join_time=CURRENT_TIMESTAMP
            where channel_id = '${channel_id}' and uid ='${uid}'
        `;
    },

    leave: function (channel_id, uid) {

        return `UPDATE channel_member
        SET 
            leave_time=CURRENT_TIMESTAMP
            where channel_id = '${channel_id}' and uid ='${uid}' and join_time is not null and leave_time is null
        `;
    },


    invite: function (uid, fullname, channelId, userType) {
        return `
            INSERT INTO channel_member
            (channel_id, uid,fullname ,role, user_type, invite_time)
            VALUES('${channelId}','${uid}','${fullname}','1','${userType}', CURRENT_TIMESTAMP);
        `
    },

    inviteOwner: function (uid, fullname, channelId, userType, isOwner) {
        return `
            INSERT INTO channel_member
            (channel_id, uid,fullname ,role, user_type,is_owner,invite_time)
            VALUES('${channelId}','${uid}','${fullname}','1','${userType}',${isOwner}, CURRENT_TIMESTAMP);
        `
    },

    inviteList: function (uid, channelId, userType) {
        return `
            SELECT row_id, channel_id, uid, user_type, invite_time
            FROM channel_member
            WHERE uid = '${uid}' AND channel_id = '${channelId}'
            ;
        
        `
    },
    reject: function (channel_id, uid) {
        return `
        DELETE FROM public.channel_member as cm
        WHERE cm.uid = '${uid}' AND channel_id = '${channel_id}'`
    },

    channelSession: function (channel_id, uid, session) {
        return `UPDATE channel
        SET 
            channel_active = ${session},
            end_session_by = '${uid}',
            end_session_time = CURRENT_TIMESTAMP
            where channel_id = '${channel_id}';`
    },

    channelDelete: function (channel_id) {
        return `
            DELETE FROM public.channel
            where channel_id = '${channel_id}'
            `
    },


    pdpaConsent: function (channel_id, uid, consent) {
        return `UPDATE channel_member
        SET 
            consent = ${consent}
            where channel_id = '${channel_id}' AND uid = '${uid}';`
    },


    member: function (channel_id, uid) {
        let w_uid = '';
        if (uid) w_uid = `AND cm.uid = '${uid}' `

        return `
        SELECT cm.row_id, channel_id , cm.fullname, cm.uid, invite_time, user_type , join_time, 
        leave_time , consent , temp_uid , g.real_password, emp.doctor_type , cm.is_owner ,
  		case 
  			when emp.fix_employee_type_id in ('1','3','5') then 'Nurse'
  			when emp.fix_employee_type_id in ('2') then 'Doctor'
  			when cm.user_type = 'patient' then 'Patient'
  			else 'Employee'
  		end as employee_type
  		FROM channel_member cm
        LEFT JOIN guest g on cm.uid = g.uid
        LEFT JOIN employee as emp on cm.uid = emp.employee_id
        WHERE channel_id = '${channel_id}' ${w_uid}
        ;
        `
    },

    available: function (channel_id) {
        let w_id = ''
        if (channel_id) w_id = `AND channel_id = '${channel_id}'`

        return `
            select  * from channel c 
            where  current_timestamp < expire_time ${w_id}
            ;
        `
    },



    /* --------------------- */

    createRecord: function (channelID, url, resource_id, sid) {
        return `
        INSERT INTO channel_record
        (channel_id, url, create_time, resource_id, sid)
        VALUES('${channelID}', '', CURRENT_TIMESTAMP, '${resource_id}', '${sid}');
        `
    },

    getRecord: function (channelID) {
        return `SELECT row_id, channel_id, url, create_time, resource_id, sid
        FROM channel_record
        WHERE channel_id = '${channelID}'
        ;
        `
    },
    channelCSI: function (channelID, uid, value, comment) {
        return `UPDATE public.channel_member
        SET  csi_score=${value}, csi_comment='${comment}'
        WHERE channel_id = '${channelID}' AND uid = '${uid}' 
        `;
    },

    channelCSI_: function (channelID, uid, audio_score, video_score, comment) {
        return `UPDATE public.channel_member
        SET  csi_audio=${audio_score},csi_video=${video_score}, csi_comment='${comment}'
        WHERE channel_id = '${channelID}' AND uid = '${uid}' 
        `;
    },

    memberCSI: function (channelID, customerUID, employeeUID) {
        return `SELECT * FROM public.member_csi 
        WHERE channel_id = '${channelID}' AND uid = '${customerUID}' AND employee_uid = '${employeeUID}'  
        `
    },
    addMemberCSI: function (channelID, customerUID, employeeUID, value) {
        return `INSERT INTO public.member_csi
        (channel_id, uid, employee_uid, create_time ,value)
        VALUES('${channelID}', '${customerUID}', '${employeeUID}', CURRENT_TIMESTAMP , ${value});
        `;
    },

    updateMemberCSI: function (channelID, customerUID, employeeUID, value) {
        return `UPDATE public.member_csi
        SET create_time=CURRENT_TIMESTAMP, value=${value}
        WHERE channel_id = '${channelID}' AND uid = '${customerUID}' AND employee_uid = '${employeeUID}'  
        `;
    },

    latestInvite: function (uid) {
        return `
        SELECT *, 
            (SELECT fullname FROM channel_member cm2 WHERE cm2.channel_id = c.channel_id AND cm2.is_owner = true) AS owner_name,
            CASE
            WHEN c.expire_time IS NULL THEN 'empty'
            WHEN c.channel_active = true THEN 
                CASE 
                    WHEN current_timestamp <= (c.expire_time - interval '7 hours') THEN 'active'
                    ELSE 'expired'
                END
            ELSE 'closed'
        END AS status
        FROM channel c
        INNER JOIN channel_member cm ON c.channel_id = cm.channel_id 
        WHERE cm.uid = '${uid}' AND c.channel_active = true
           ORDER BY c.start_time ASC;

        `
    },

    getChannelHistory : function(uid){
        return ` SELECT *, 
        (SELECT fullname FROM channel_member cm2 WHERE cm2.channel_id = c.channel_id AND cm2.is_owner = true) AS owner_name,
        CASE
        WHEN c.expire_time IS NULL THEN 'empty'
        WHEN c.channel_active = true THEN 
            CASE 
                WHEN current_timestamp <= (c.expire_time - interval '7 hours') THEN 'active'
                ELSE 'expired'
            END
        ELSE 'closed'
    END AS status
    FROM channel c
    INNER JOIN channel_member cm ON c.channel_id = cm.channel_id 
    WHERE cm.uid = '${uid}' AND cm.join_time IS NOT NULL
    ORDER BY cm.join_time ASC;
        ` 
    },

    getDashboardData : function({start_time}){
        
        return `
        WITH channel_status AS (
            SELECT 
                c.row_id AS row_id,
                CASE
                    WHEN c.expire_time IS NULL THEN 'empty'
                    WHEN c.channel_active = true THEN 
                        CASE 
                            WHEN current_timestamp <= (c.expire_time - interval '7 hours') THEN 'active'
                            ELSE 'expired'
                        END
                    ELSE 'closed'
                END AS status
            FROM channel c
            LEFT JOIN channel_member cm ON c.channel_id = cm.channel_id AND cm.is_owner = true
            WHERE DATE_TRUNC('month', start_time) = DATE_TRUNC('month', DATE '${start_time}')
        )
        SELECT 
            COALESCE(status, 'Total') AS status,
            COUNT(*) AS count
        FROM channel_status
        GROUP BY ROLLUP(status);
        `
    }

}