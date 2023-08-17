type TFriendList = {
    response: {
        count: number,
        items: number[] 
    }
   
}

type TFriendsInfo = {
    response: {
        count: number,
        items: TItem[]
    }
   
}

interface TItem {
id?: number,
has_mobile?: number,
track_code?: string,
first_name?: string,
last_name?: string,
can_access_closed?: boolean,
is_closed?: boolean,
photo_50?: string,
country?: object,
sex?: number
}

export {TFriendList, TFriendsInfo, TItem}