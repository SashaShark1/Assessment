import { DeleteItem } from "../framework/objects/deleteItemsClass";
import { CommentPost } from "../framework/objects/createCommClass";
import { CommentDataSend } from "../types/commentsInfo";
import { group, user } from "../data/credentials";

describe(`Delete: `, () => {
  test(`Comment from user's page`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3785,
      message: "Delete",
    };

    const commentPost = new CommentPost(data);
    const id = await commentPost.getID();

    const comment = new DeleteItem("wall.deleteComment", {
      owner_id: user.id,
      comment_id: id,
    });
    const delCom = await comment.getDelBody();
    expect(delCom).toEqual({ response: 1 });
  });

  test(`Comment from group's page`, async () => {
    const data: CommentDataSend = {
      owner_id: group.id,
      post_id: 1656,
      message: "Delete comm",
    };

    const commentPost = new CommentPost(data);
    const id = await commentPost.getID();

    const comment = new DeleteItem("wall.deleteComment",  {
      owner_id: group.id,
      comment_id: id,
    });
    const delCom = await comment.getDelBody();
    expect(delCom).toEqual({ response: 1 });
  });

  test(`Comment without nessesary parameter: comment id`, async () => {
    const comment = new DeleteItem("wall.deleteComment", {
      owner_id: group.id,
    });
    const erCode = await comment.getErrorCode();
    const erMess = await comment.getErrorMessage();
    expect(erMess).toEqual("One of the parameters specified was missing or invalid: comment_id is undefined");
    expect(erCode).toBe(100);
  });

  test(`Comment without nessesary parameter: user id`, async () => {
    const data: CommentDataSend = {
      owner_id: user.id,
      post_id: 3785,
      message: "Delete comm without owner",
    };

    const commentPost = new CommentPost(data);
    const id = await commentPost.getID();

    const comment = new DeleteItem("wall.deleteComment", { comment_id: id });
    const delCom = await comment.getDelBody();
    expect(delCom).toEqual({ response: 1 });
  });
});
