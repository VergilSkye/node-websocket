const {User} = require('./user');
const expect = require('expect');


describe('Users',()=>{
    var users;

    beforeEach(() => {
        users = new User();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', ()=>{
        var users = new User();
        var user = {
            id:'456',
            name:'Mew',
            room: 'Fans'
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node courses', ()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike','Julie']);
    });

    it('should return names for react courses', ()=>{
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
    });

    it('should find user', () => {
        var user = users.getUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });

    it('should not find user', ()=>{
        var user = users.getUser('10');
        expect(user).toBeUndefined();
        
    });

    it('should remove a user', ()=>{
        var userId = '2';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a  user', ()=>{
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
})