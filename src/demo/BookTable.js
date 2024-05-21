// script.js

document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const bookList = document.getElementById('bookList');

    // Yazar ve kitap ekleme formunun submit olayını dinle
    addForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const author = document.getElementById('author').value;
        const book = document.getElementById('book').value;

        try {
            // API'ye POST isteği gönder
            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author, book })
            });

            if (!response.ok) {
                throw new Error('Kitap ekleme başarısız');
            }

            // Kitap listesini yeniden yükle
            loadBookList();
        } catch (error) {
            console.error('Hata:', error.message);
        }
    });

    // Kitap listesini yükleme işlevi
    const loadBookList = async () => {
        try {
            // API'den kitap listesini al
            const response = await fetch('http://localhost:8080/api/books');
            const data = await response.json();

            // Kitap listesini HTML'e ekle
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.author}: ${book.bookName}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Sil';
                deleteButton.addEventListener('click', async () => {
                    try {
                        // API'ye DELETE isteği gönder
                        const deleteResponse = await fetch(`http://localhost:8080/api/books/${book.id}`, {
                            method: 'DELETE'
                        });

                        if (!deleteResponse.ok) {
                            throw new Error('Kitap silme başarısız');
                        }

                        // Kitap listesini yeniden yükle
                        loadBookList();
                    } catch (error) {
                        console.error('Hata:', error.message);
                    }
                });
                li.appendChild(deleteButton);
                bookList.appendChild(li);
            });
        } catch (error) {
            console.error('Hata:', error.message);
        }
    };

    // Sayfa yüklendiğinde kitap listesini yükle
    loadBookList();
});
