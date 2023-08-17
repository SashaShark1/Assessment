type CommentInfo = {
    response: {
        comment_id: number,
        parents_stack?: number[]
    }
}

type CommentDataSend = {
    owner_id: number | string,
    post_id: number,
    message?: string,
    guid?: string,
    reply_to_comment?: number,
    attachments?: string,
    from_group?: number,
    sticker_id?: number, 
}

type CommentDataGet = {
    id: number,
    from_id: number,
    date: number,
    text: string,
    can_edit: number,
    post_id: number,
    owner_id: number,
    parents_stack: number[],
    attachments: [ { type: string, photo: object[] } ],
    likes: { can_like: number, count: number, user_likes: number, can_publish: number },
    thread: {
        count: number,
        can_post: boolean,
        show_reply_button: boolean,
        groups_can_post: boolean
    }
}

type CommentData = {    
    response: {
        items: CommentDataGet[],
        can_post: boolean,
        show_reply_button: boolean,
        groups_can_post: boolean
    }      
}

export {CommentData, CommentDataGet, CommentDataSend, CommentInfo}