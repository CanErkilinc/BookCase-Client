// Kitap ve yazar bilgilerini tutacak bir dizi oluşturun
var books = [
    { title: "Gökdelen", author: "J.G. Ballard" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },
    // İsterseniz buraya istediğiniz kadar kitap ve yazar ekleyebilirsiniz
];

// Kitap ve yazar bilgilerini görüntülemek için bir fonksiyon oluşturun
function displayBooks() {
    var bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = ''; // Önceki içeriği temizle

    books.forEach(function(book) {
        var bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        var titleHeading = document.createElement("h2");
        titleHeading.classList.add("title");
        titleHeading.textContent = book.title;

        var authorHeading = document.createElement("h3");
        authorHeading.classList.add("author");
        authorHeading.textContent = book.author;

        bookDiv.appendChild(titleHeading);
        bookDiv.appendChild(authorHeading);
        bookContainer.appendChild(bookDiv);
    });
}

// Sayfa yüklendiğinde kitapları görüntüleyin
window.onload = function() {
    displayBooks();
};
