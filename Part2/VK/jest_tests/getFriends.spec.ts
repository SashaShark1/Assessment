import {BaseMethod} from '../framework/helpers/baseMethod'
import { FriendsList } from "../framework/objects/friendsListClass";


describe(`Get friends list: `, () => {

  test(`With define length: 5`, async () => {
    const data = new FriendsList({count: 5})     
    const length = await data.getItemsLength()
    const status = await data.getStatus()
    expect(status).toBe(200);
    expect(length).toBe(5)
  });

    test(`With photo field`, async () => {
    const data = new FriendsList({count: 10, fields: 'photo_50'}) 
    const status = await data.getStatus()
    expect(status).toBe(200);
    const length = await data.getItemsLength()
    expect(length).toBe(10);
    const items = await data.getItems()
    const photoLength = (await data.getPhoto()).length
    expect(photoLength).toBe(length);
    const photo = BaseMethod.checkEvery(items, 'photo_50')
    expect(photo).toBeTruthy();
  });

  test(`With country field `, async () => {
    const data = new FriendsList({count: 20, fields: 'country'}) 
    const status = await data.getStatus()
    expect(status).toBe(200);
    const length = await data.getItemsLength()
    expect(length).toBe(20);
    const items = await data.getItems()
    const country = BaseMethod.checkSome(items, 'country')
    expect(country).toBeTruthy();    
  });

  test(`From 'Best friends' list`, async () => {
    const data = new FriendsList({list_id: 28}) 
    const status = await data.getStatus()
    expect(status).toBe(200);
    const count = await data.getCount()
    expect(count).toBe(3)
  });

  test(`With gender field`, async () => {
    const data = new FriendsList({fields: 'sex'}) 
    const status = await data.getStatus()
    expect(status).toBe(200);
    const count =  await data.getCount()
    expect(count).toBe(225)
    const female = (await data.getGender())
                  .filter(el => el === 1)
                  .length
    expect( female).toBe(158)
  });

  test(`With define name`, async () => {
    const data = new FriendsList({fields: 'sex'}) 
    const status = await data.getStatus()
    expect(status).toBe(200);
    const count =  await data.getCount()
    expect(count).toBe(225)
    const name = (await data.getFirstName())
                  .filter(el => el === "Елена")
                  .length
    expect(name).toBe(11)
  });
});
