const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Sample data for the in-memory "books" array
let books = [
    { id: 1, title: 'example book 1', author: 'example author', notes: 'notes on the book' },
    { id: 2, title: 'example book 2', author: 'example author', notes: 'notes on the book' },
];

// Endpoint to get all books from the in-memory "books" array
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Endpoint to get a specific book by ID from the in-memory "books" array
app.get('/api/books/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = books.find((book) => book.id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

// Endpoint to add a new book to the in-memory "books" array
app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        notes: req.body.notes || '',
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// Endpoint to delete a book from the in-memory "books" array
app.delete('/api/books/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = books.findIndex((book) => book.id === itemId);

    if (index !== -1) {
        // Remove the item from the "books" array
        books.splice(index, 1);
        res.json({ message: "Book deleted successfully" });
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

// Update notes for a specific book
app.put('/api/books/:id/notes', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedNotes = req.body.notes;

    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex !== -1) {
        // Update the notes of the specific book
        books[bookIndex].notes = updatedNotes;
        res.json({ message: 'Notes updated successfully', book: books[bookIndex] });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
