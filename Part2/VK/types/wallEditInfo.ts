type TPostEditData = {
  owner_id?: number | string;
  post_id?: number;
  message?: string;
  attachments?: string;
};

type TPostGetData = {
  response: {
    count: number;
    items: WallItem[];
  };
};

type WallItem = {
  id: number;
  from_id: number;
  owner_id: number;
  date: number;
  comments: {
    can_post: number;
    can_close: number;
    count: number;
    groups_can_post: boolean;
  };
  attachments: [{type: string}];
  text: string;
};

type TPutError = {    
        "error":{
        "error_code": number
        "error_msg": string
        "request_params":object[]
        }
}

export { TPostEditData, TPostGetData, WallItem,  TPutError };
