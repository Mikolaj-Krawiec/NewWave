const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');

const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
      const testConcertOne = new Concert({
        _id: '5d9f1140f10a81216cfd4408',
        genre: 'R&B',
        price: 25,
        day: 1,
        image: '/img/uploads/2f342s4fsdg.jpg',
        performer: 'Test Test',
      });
      await testConcertOne.save();

      const testConcertTwo = new Concert({
        _id: '5d9f1159f81ce8d1ef2bee48',
        genre: 'Rock',
        price: 30,
        day: 2,
        image: '/img/uploads/2f342s4fsdg.jpg',
        performer: 'Test Test',
      });
      await testConcertTwo.save();

      const testConcertThree = new Concert({
        _id: '6d9f4568f81ce8d1ef2bee27',
        genre: 'Rock',
        price: 45,
        day: 3,
        image: '/img/uploads/2f342s4fsdg.jpg',
        performer: 'John Black',
      });
      await testConcertThree.save();
    });

    after(async () => {
        await Concert.deleteMany();
      });

    it('/performer/:performer should return performer', async () => {
      const res = await request(server).get('/api/concerts/performer/Test Test');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
    });

    it('/genre/:genre should return genre', async () => {
      const res = await request(server).get('/api/concerts/genre/Rock');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);
    });

    it('/price/:price_min/:price_max should return price', async () => {
      const res = await request(server).get('/api/concerts/price/25/45');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(3);
    });

    it('/day/:day should return price', async () => {
      const res = await request(server).get('/api/concerts/day/1');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(1);
    });

  });
  