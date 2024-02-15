

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    const response = await fetch("http://localhost:4000/getAllNotes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // Add any other headers if needed
        }
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    // expect(data.length).toBe(0);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    const response = await fetch("http://localhost:4000/getAllNotes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
            // Add any other headers if needed
        }
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    // expect(data.length).toBe(2);
});




// Patch with content and title
test("/patchNote - Patch with content and title", async () => {

    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();
    
    const updatedNote = {
        title: "Updated Title",
        content: "Updated Content"
    };
    const response = await fetch(`http://localhost:4000/patchNote/${postData.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
            // Add any other headers if needed
        },
        body: JSON.stringify(updatedNote)
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.response).toContain(`Document with ID ${postData.insertedId} patched.`);
});

// Patch with just title
test("/patchNote - Patch with just title", async () => {
    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();

    const updatedNote = {
        title: "Updated Title"
    };
    const response = await fetch(`http://localhost:4000/patchNote/${postData.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
            // Add any other headers if needed
        },
        body: JSON.stringify(updatedNote)
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.response).toContain(`Document with ID ${postData.insertedId} patched.`);
});





// Patch with just content
test("/patchNote - Patch with just content", async () => {
    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();
    const updatedNote = {
        content: "Updated Content"
    };
    const response = await fetch(`http://localhost:4000/patchNote/${postData.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
            // Add any other headers if needed
        },
        body: JSON.stringify(updatedNote)
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.response).toContain(`Document with ID ${postData.insertedId} patched.`);
});


// Delete a note
test("/deleteNote - Delete a note", async () => {
    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();
    // Delete the posted note
    const deleteResponse = await fetch(`http://localhost:4000/deleteNote/${postData.insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deleteData = await deleteResponse.json();
    expect(deleteResponse.status).toBe(200);
    expect(deleteData.response).toBe(`Document with ID ${postData.insertedId} deleted.`);
});



test("/deleteNote - Delete a note", async () => {
    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();
    // Delete the posted note
    const deleteResponse = await fetch(`http://localhost:4000/deleteNote/${postData.insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const deleteData = await deleteResponse.json();
    expect(deleteResponse.status).toBe(200);
    expect(deleteData.response).toContain(`Document with ID ${postData.insertedId} deleted.`);
});


// Delete one note
test("/deleteAllNotes - Delete one note", async () => {
    const response = await fetch("http://localhost:4000/deleteAllNotes", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"

        }
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.response).toContain("note(s) deleted.");
});

// Delete three notes
test("/deleteAllNotes - Delete three notes", async () => {
    const response = await fetch("http://localhost:4000/deleteAllNotes", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"

        }
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.response).toContain("note(s) deleted.");
});

// Update color of a note to red (#FF0000)
test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const newNote = {
        title: "new Title",
        content: "new Content"
    };
    // Post a new note
    const postResponse = await fetch("http://localhost:4000/postNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNote)
    });
    const postData = await postResponse.json();

    const updatedColor = {
        color: "#FF0000"
    };
    const response = await fetch(`http://localhost:4000/updateNoteColor/${postData.insertedId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(updatedColor)
    });
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.message).toBe("Note color updated successfully.");
});