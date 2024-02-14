
const app = require('../server'); // Assuming your server file is named server.js


describe('Endpoint Tests', () => {
  describe('GET /getAllNotes', () => {
    it('should return list of zero notes for getAllNotes', async () => {
      const response = await request(app).get('/getAllNotes');
      expect(response.status).toBe(200);
      expect(response.body.response).toEqual([]);
    });

    it('should return list of two notes for getAllNotes', async () => {
      // Insert two dummy notes into the database before making the request
      const collection = db.collection(COLLECTIONS.notes);
      await collection.insertMany([
        { title: 'Note 1', content: 'Content 1', createdAt: new Date() },
        { title: 'Note 2', content: 'Content 2', createdAt: new Date() }
      ]);

      const response = await request(app).get('/getAllNotes');
      expect(response.status).toBe(200);
      expect(response.body.response.length).toBe(2);
    });
  });
});