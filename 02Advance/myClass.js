//make a User class
class User {
    constructor(firstName, lastName, Age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Age = Age;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    editName(newName) {
        let strs = newName.split();
        this.firstName = strs[0];
        this.lastName = strs[1];
    }

    sayHello() {
        return `My name is ${this.firstName} ${this.lastName} , ${this.Age} years old.`;
    }
}

const john = new User('John','Anderson',42);

console.log(john);

console.log(john.getFullName());

console.log(john.sayHello());
