[{
    id:'asdsadddddd',
    name:'Vergil',
    room:'The Office Fans'
}]

// addUser(id, name, room)
// removeUser (id)
// getUser(id)
// getUserList(room)

class User {
    constructor () {
        this.users = []
    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser (id) {
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user)=> user.id !== id);
        }  
        return user;  
    }
    getUser (id) {
        return this.users.filter((user)=>user.id === id)[0];        
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray
    }
}

module.exports = {User};

// class Person { 
//     constructor (id,name,room) {
//         this.id = id;
//         this.name=name;
//         this.room=room;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.room} year(s) old.`
//     }
// }

// var me = new Person(1,'KKK','BABA');
// console.log(me.getUserDescription());