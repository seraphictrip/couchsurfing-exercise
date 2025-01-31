import { faker } from "@faker-js/faker";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const data = new Array(1000).fill(null).map((_, i) => {
  const numFriends = getRandomInt(20);
  const friendSet = new Set();
  for (let i = 0; i < numFriends; i++) {
    friendSet.add(getRandomInt(1000));
  }
  return {
    id: i,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    nickname: faker.nickname,
    short: faker.person.bio(),
    bio: faker.lorem.paragraphs({ min: 1, max: 3 }),
    avatar: faker.image.avatar(),
    friends: [...friendSet],
  };
});

const dict = data.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

data.map((item) => {
  item.friends = item.friends.map((id) => ({
    id: id,
    firstName: dict[id].firstName,
    lastName: dict[id].lastName,
  }));

  return item;
});

console.log(JSON.stringify(data, null, 2));
