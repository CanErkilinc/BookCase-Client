import React, { useState } from 'react';
import './styles/BookTable.css';
import Login from './Login';

const App = () => {
    const [books, setBooks] = useState([]);
    const [bookName, setBookName] = useState('');
    const [yayinYili, setYayinYili] = useState('');
    const [yazar, setYazarAdi] = useState('');
    const [showTable, setShowTable] = useState(false); // Tabloyu göstermek için durum
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcının giriş yapmış olup olmadığını izlemek için durum

    const handleLogin = (user) => {
        // Kullanıcı bilgilerini kontrol et ve giriş yap
        console.log('Yeni kullanıcı:', user);
        // Burada backend API ile iletişime geçip kullanıcıyı kaydedebilirsiniz
        setIsLoggedIn(true); // Kullanıcı giriş yaptı
    };

    const fetchBooks = async () => {
        try {
            let url = 'http://localhost:8080/kitapBilgileri/getirTumListe';
            if (yazar) {
                url += `?yazar=${encodeURIComponent(yazar)}`; // Yazar varsa sorguya ekle
            }
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Veri çekilirken bir hata oluştu:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/kitapBilgileri/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ adi: bookName, yayinYili: yayinYili, yazarAdi: yazar }) // Yazar ismi de ekleniyor
            });
            if (response.ok) {
                console.log('Yeni kitap eklendi:', bookName);
                setBookName('');
                setYayinYili('');
                setYazarAdi('');
                // Yeni kitap eklendikten sonra kitap listesini güncelle
                fetchBooks();
                setShowTable(true); // Tabloyu göster
            } else {
                console.error('Kitap eklenirken bir hata oluştu');
            }
        } catch (error) {
            console.error('İstek yapılırken bir hata oluştu:', error);
        }
    };

    const handleQuery = () => {
        fetchBooks();
        setShowTable(true); // Tabloyu göster
    };

    const handleBack = () => {
        setShowTable(false); // Tabloyu kapat
    };

    const handleBookNameChange = (event) => {
        setBookName(event.target.value);
    };

    const handleYayinYiliChange = (event) => {
        setYayinYili(event.target.value);
    };

    const handleYazarAdiChange = (event) => {
        setYazarAdi(event.target.value);
    };

    return (
        <div>
            <h1>Kütüphane Takip Sistemi</h1>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    {!showTable ? (
                        <>
                            <h2>Kitapları Listele</h2>
                            <button onClick={handleQuery}>Sorgula</button>
                        </>
                    ) : (
                        <>
                            <h2>Kitapları Listele</h2>
                            <button onClick={handleBack}>Geri</button>
                            <table>
                                <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
                                <tr>
                                    <th>No</th>
                                    <th>Kitap Adı</th>
                                    <th>Yazar</th>
                                    <th>Yayın Tarihi</th>
                                    <th>Sayfa Sayısı</th>
                                </tr>
                                </thead>
                                <tbody>
                                {books.map((book, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                                        <td>{index + 1}</td>
                                        <td>{book.adi}</td>
                                        <td>{book.yazarAdi}</td>
                                        <td>{book.yayinYili}</td>
                                        <td>{book.sayfaSayisi}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}
                    <h2>Yeni Kitap Ekle</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={bookName} onChange={handleBookNameChange} placeholder="Kitap Adı" />
                        <input type="text" value={yayinYili} onChange={handleYayinYiliChange} placeholder="Yayın Yılı" />
                        <input type="text" value={yazar} onChange={handleYazarAdiChange} placeholder="Yazar İsmi" />
                        <button type="submit">Ekle</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default App;

