const request = require('supertest');
const app = require('./server'); // Assuming your server file is named server.js

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

  describe('DELETE /deleteNote/:noteId', () => {
    it('should delete a note', async () => {
      // Insert a dummy note into the database before making the request
      const collection = db.collection(COLLECTIONS.notes);
      const insertedNote = await collection.insertOne({ title: 'Dummy Note', content: 'Dummy Content', createdAt: new Date() });
      const dummyNoteId = insertedNote.insertedId;

      const response = await request(app).delete(`/deleteNote/${dummyNoteId}`);
      expect(response.status).toBe(200);
      expect(response.body.response).toContain(`Document with ID ${dummyNoteId} deleted.`);
    });
  });

  describe('PATCH /patchNote/:noteId', () => {
    it('should patch note with content and title', async () => {
      // Insert a dummy note into the database before making the request
      const collection = db.collection(COLLECTIONS.notes);
      const insertedNote = await collection.insertOne({ title: 'Dummy Note', content: 'Dummy Content', createdAt: new Date() });
      const dummyNoteId = insertedNote.insertedId;

      const response = await request(app)
        .patch(`/patchNote/${dummyNoteId}`)
        .send({ title: 'Updated Title', content: 'Updated Content' });

      expect(response.status).toBe(200);
      expect(response.body.response).toContain(`Document with ID ${dummyNoteId} patched.`);
    });
  });

  // Add test cases for other endpoints (PATCH, DELETE) similarly
});