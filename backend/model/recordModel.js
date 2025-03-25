
export const recordModel = {

    addRecord : function ({channel_id,resource_id , sid}){
        return `
            INSERT INTO public.channel_record
            (channel_id, resource_id,sid, start_time)
            VALUES('${channel_id}','${resource_id}','${sid}', CURRENT_TIMESTAMP);
        `
    },

    stopRecord : function ( {video_url  , sid} ){
        return `
        UPDATE public.channel_record
        SET video_url='${video_url}',
            stop_time=CURRENT_TIMESTAMP
        WHERE sid = '${sid}';
            ;
        `
    },

    getRecordData : function( {sid , channel_id , order } ) {

        let w_sid = ""
        let w_channel_id = ""
        let order_by = "ORDER BY cr.row_id ASC"

        if(order){
            order_by = `ORDER BY cr.row_id ${order}`
        }

        /* ----- */
        if(sid){
            w_sid = ` AND cr.sid = '${sid}'`
        }

        if(channel_id){
            w_channel_id = ` AND c.channel_id = '${channel_id}'`
        }

        return `
            SELECT * , cr.start_time as start_time FROM public.channel_record cr
            JOIN channel c ON cr.channel_id = c.channel_id 
            WHERE c.row_id > 0 ${w_channel_id} ${w_sid}
            ${order_by}
        `
    }

    



}
