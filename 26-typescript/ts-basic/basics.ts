// Primitives : number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;
age = 26;

let userName: string;
userName = 'MinJae';

let isInstructor: boolean;
isInstructor = true;

// More complex types

let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

type Person = {
  name: string;
  age: number;
};

let person: Person;
person = {
  name: 'MJ',
  age: 26,
};

// person = {
//   isEmployee: true,
// };

let people: Person[];

// Type inference

let course: string | number = 'React - The Complete Guide';
// 변수를 만들고 바로 초기화를 하면 타입스크립트는 할당된 값의 자료형을 불러옴 :string
course = 12341;

// Function & types

function add(a: number, b: number): number | string {
  return a + b;
}

function printOutput(value: any) {
  console.log(value);
}

// Generics
//
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, 0); // [0,1,2,3]
const stringArray = insertAtBeginning(['a', 'b', 'c,'], 'd');
// <>를 사용하여 제네릭 유형을 정의할 수 있을 뿐만 아니라
// 제네릭 유형을 사용하고 사용해야 하는 자리 표시자 유형을 명시적으로 설정할 수 있음

// updatedArray[0].split('');
