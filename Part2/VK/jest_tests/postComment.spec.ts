import { friend, user, group } from "../data/credentials";
import { CommentPost } from "../framework/objects/createCommClass";
import { CommentGet } from "../framework/objects/getCommClass";
import { CommentDataSend } from "../types/commentsInfo";

describe(`Post comments:  `, () => {
  test(`Without sending the same comment again`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3785,
      message: "TestAPI",
      guid: "1243",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = commBody.response.comment_id
    expect(commBody).toEqual({ response: {comment_id: id}});
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: user.id, comment_id: id });
    const text = await commentGet.getText();
    expect(text).toBe("TestAPI");
  });

  test(`Reply to comment`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3785,
      message: "Reply",
      guid: "1243r",
      reply_to_comment: 3794,
    };
    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()
    expect(commBody).toEqual({ response: { comment_id: id } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: user.id, comment_id: id  });
    const text = await commentGet.getText();
    expect(text).toBe("Reply");
    const parent = await commentGet.getParents();
    expect(parent).toEqual([3794]);
  });

  test(`To friend's page`, async () => {
    const data: CommentDataSend = {
      owner_id: friend.id,
      post_id: 19,
      message: "Thanks",
      guid: "1243t",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()
    expect(commBody).toEqual({ response: { comment_id: id  } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: friend.id, comment_id: id  });
    const text = await commentGet.getText();
    expect(text).toBe("Thanks");
  });

  test(`To group's wall`, async () => {
    const data: CommentDataSend = {
      owner_id: group.id,
      post_id: 1656,
      message: "Testing group",
      guid: "1243tg",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()  
    expect(commBody).toEqual({ response: { comment_id: id  } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: group.id, comment_id: id  });
    const text = await commentGet.getText();
    expect(text).toBe(data.message);
  });

  test(`With attachment: photo`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3783,
      attachments: `photo-12382740_457326960`,
      guid: "1243atcn",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()
    expect(commBody).toEqual({ response: { comment_id: id  } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: user.id, comment_id: id  });
    const type = await commentGet.getAttachments();
    expect(type).toBe("photo");
  });

  test(`From group`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3781,
      message: "From group",
      from_group: group.pos_id,
      guid: "1243frgr",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()
    console.log(commBody, commStatus);
    expect(commBody).toEqual({ response: { comment_id: id } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: user.id, comment_id: id });
    console.log(await commentGet.getItems());
    const text = await commentGet.getText();
    expect(text).toBe(data.message);
    const author = await commentGet.getAuthor();
    expect(author).toBe(group.id);
  });

  test(`With sticker`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3778,
      sticker_id: 85,
      guid: "1243st",
    };

    const commentPost = new CommentPost(data);
    const commBody = await commentPost.getReqBody();
    const commStatus = await commentPost.getReqStatus();
    const id = await commentPost.getID()
    expect(commBody).toEqual({ response: { comment_id: id  } });
    expect(commStatus).toBe(200);

    const commentGet = new CommentGet({ owner_id: user.id, comment_id: id  });
    const attach = await commentGet.getAttachments();
    expect(attach).toBe("sticker");
  });
});
