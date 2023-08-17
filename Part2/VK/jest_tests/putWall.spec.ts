import { friend, user, group } from "../data/credentials";
import { BaseMethod } from "../framework/helpers/baseMethod";
import { WallEdit } from "../framework/objects/wallEditClass";
import { WallGet } from "../framework/objects/wallGetClass";
import { TPostEditData } from "../types/wallEditInfo";

describe(`Edit wall post:  `, () => {
  test(`Replace user's post content`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: user.id,
      post_id: 3803,
      message: `Edit${BaseMethod.useRandom()}`,
    };

    const postEdit = new WallEdit(dataEdit);
    const edBody = await postEdit.getEditBody();
    const edStatus = await postEdit.getEditStatus();
    expect(edBody).toEqual({ response: { post_id: 3803 } });
    expect(edStatus).toBe(200);

    const postGet = new WallGet({ owner_id: user.id, count: 1 });
    const text = await postGet.getText();
    expect(text).toBe(dataEdit.message);
  });

  test(`Replace group's post content`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: group.id,
      post_id: 1659,
      message: `For testing. Don't pay attention! Try${BaseMethod.useRandom()}`,
    };

    const postEdit = new WallEdit(dataEdit);
    const edBody = await postEdit.getEditBody();
    const edStatus = await postEdit.getEditStatus();
    expect(edBody).toEqual({ response: { post_id: dataEdit.post_id } });
    expect(edStatus).toBe(200);

    const postGet = new WallGet({ owner_id: group.id, offset: 1, count: 1 });
    const text = await postGet.getText();
    expect(text).toBe(dataEdit.message);
  });

  test(`Replace group's post content to photo`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: group.id,
      post_id: 1660,
      attachments: `photo-12382740_457326960`,
    };

    const postEdit = new WallEdit(dataEdit);
    const edBody = await postEdit.getEditBody();
    const edStatus = await postEdit.getEditStatus();
    expect(edBody).toEqual({ response: { post_id: dataEdit.post_id } });
    expect(edStatus).toBe(200);

    const postGet = new WallGet({ owner_id: group.id, count: 1 });
    const photo = await postGet.getAttachments();
    expect(photo).toBe("photo");
  });

  test(`Without nessessary field: post id`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: group.id,
      message: "Negative",
    };

    const postEdit = new WallEdit(dataEdit);
    const erCode = await postEdit.getErrorCode();
    const erMess = await postEdit.getErrorMessage();
    expect(erMess).toEqual("One of the parameters specified was missing or invalid: post_id is undefined");
    expect(erCode).toBe(100);
  });

  test(`Without nessessary field: message or attachment`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: group.id,
      post_id: 1660,
    };

    const postEdit = new WallEdit(dataEdit);
    const erCode = await postEdit.getErrorCode();
    const erMess = await postEdit.getErrorMessage();
    expect(erMess).toEqual("One of the parameters specified was missing or invalid: invalid message param");
    expect(erCode).toBe(100);
  });


  test(`Without both nessessary field: message or attachment and post id`, async () => {
    const dataEdit: TPostEditData = {
      owner_id: user.id,      
    };

    const postEdit = new WallEdit(dataEdit);
    const erCode = await postEdit.getErrorCode();
    const erMess = await postEdit.getErrorMessage();
    expect(erMess).toEqual("One of the parameters specified was missing or invalid: post_id is undefined");
    expect(erCode).toBe(100);
  });
});
