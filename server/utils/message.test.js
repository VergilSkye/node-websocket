const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen';
        const text = 'SOme message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct geolocation message object', () => {
        const from = 'Mark';
        const lat = 10;
        const long = -20;
        const url = 'https://www.google.com/maps?q=10,-20';
        const message = generateLocationMessage(from,lat,long);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
        

    });
})