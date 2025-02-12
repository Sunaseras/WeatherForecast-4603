```typescript
// Importing required libraries
import * as fs from 'fs';
import * as readline from 'readline';

// Defining interface for our Data
interface IData {
  id: number;
  name: string;
  age: number;
  email: string;
}

// Initial data array
let dataArray: IData[] = [];

// Function to add data
function addData(id: number, name: string, age: number, email: string): void {
  let newEntry: IData = {id, name, age, email};
  dataArray.push(newEntry);
}

// Function to remove data by ID
function removeDataById(id: number): void {
  dataArray = dataArray.filter(item => item.id !== id);
}

// Function to update data by ID
function updateDataById(id: number, name?: string, age?: number, email?: string): void {
  let index = dataArray.findIndex(item => item.id === id);

  if(index !== -1) {
    if(name) dataArray[index].name = name;
    if(age) dataArray[index].age = age;
    if(email) dataArray[index].email = email;
  }
}

// Function to get data by ID
function getDataById(id: number): IData | undefined {
  return dataArray.find(item => item.id === id);
}

// Function to read data from file
async function readDataFromFile(fileName: string): Promise<void> {
  let fileStream = fs.createReadStream(fileName);
  let rl = readline.createInterface({input: fileStream});

  for await (let line of rl) {
    let data = JSON.parse(line);
    addData(data.id, data.name, data.age, data.email);
  }
}

// Function to write data to file
function writeDataToFile(fileName: string): void {
  let writeStream = fs.createWriteStream(fileName);

  dataArray.forEach(item => {
    writeStream.write(JSON.stringify(item) + '\n');
  });

  writeStream.end();
}

// Function to process data
function processData(): void {
  // Sorting data by age
  dataArray.sort((a, b) => a.age - b.age);

  // Filtering out people over 40
  dataArray = dataArray.filter(item => item.age <= 40);

  // Mapping data to a new format
  dataArray = dataArray.map(item => {
    return {
      id: item.id,
      fullName: item.name,
      isAdult: item.age >= 18,
      email: item.email
    };
  });
}

// Usage
(async function() {
  await readDataFromFile('data.txt');
  processData();
  writeDataToFile('processed_data.txt');
})();
```
Цей код зчитує дані з файлу, обробляє їх і записує назад у файл. Він також містить функції для додавання, видалення, оновлення і отримання даних. Він використовує Node.js і TypeScript, та виконує невелику обробку даних.