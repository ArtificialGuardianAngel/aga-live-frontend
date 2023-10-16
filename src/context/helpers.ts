import { History } from "../types/chat";

type Messages = { _id: string; content: string; isMe: boolean }[];

export const parseHistoryToMessages = (history: History): Messages =>
    history.visible
        .map(([inp, out], i) => [
            {
                _id: i.toString(),
                content: inp,
                isMe: true,
            },
            {
                _id: i.toString(),
                content: out,
                isMe: false,
            },
        ])
        .flat();

export const mdAnswer =
    "TypeORM is a TypeScript-based ORM that allows you to interact with databases using TypeScript. To convert a raw SQL query to TypeORM code, you can follow these steps:\n\n1. Install TypeORM by running `npm install typeorm` or `yarn add typeorm` in your project directory.\n2. Import the necessary dependencies in your TypeScript file:\n```typescript\nimport { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';\n```\n3. Create a new entity class that represents the table you want to query. For example:\n```typescript\n@Entity()\nexport class MyEntity {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  name: string;\n\n  @Column()\n  email: string;\n}\n```\n4. Use the `createQueryBuilder` method of the entity class to create a query builder instance. For example:\n```typescript\nconst queryBuilder = MyEntity.createQueryBuilder('myEntity');\n```\n5. Use the query builder methods to add conditions, joins, and other query elements to the query. For example:\n```typescript\nqueryBuilder\n  .where('name = :name', { name: 'John' })\n  .andWhere('email = :email', { email: 'john@example.com' })\n  .join('innerJoin', 'myEntity.id = myOtherEntity.id')\n  .select('myEntity.id, myEntity.name, myOtherEntity.name as otherName')\n  .orderBy('myEntity.id', 'ASC');\n```\n6. Call the `getMany` method of the query builder to execute the query and retrieve the results. For example:\n```typescript\nconst result = await queryBuilder.getMany();\n```\n7. The `result` variable will contain an array of objects that represent the query results. You can access the properties of each object using the dot notation. For example:\n```typescript\nconsole.log(result[0].id); // prints the ID of the first result\nconsole.log(result[0].name); // prints the name of the first result\n```\n\nThat's it! You have now converted a raw SQL query to TypeORM code. Note that this is just a basic example, and TypeORM offers many more features and options for working with databases.</bot>";
