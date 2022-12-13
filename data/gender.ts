interface GenderList {
  id : string,
  value : string,
  name : string
}

const gender:Array<GenderList> = [
  {
    id: 'gender1',
    value: 'female',
    name: '여자',
  },
  {
    id: 'gender2',
    value: 'male',
    name: '남자',
  },
];

export default gender;
