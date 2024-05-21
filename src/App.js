// App.js
import { Routes, Route } from 'react-router-dom';
import YazarEkle from './component/yazar/YazarEkle';
import YazarEkleButton from './component/yazar/YazarEkleButton';
import NavBar from './component/NavBar';
import KitapEkleButton from "./component/kitap/KitapEkleButton";
import KitapEkle from "./component/kitap/KitapEkle";
import UyeKayit from "./component/uyelikbilgileri/UyeKayit";
import UyeListele from "./component/uyelikbilgileri/UyeListele";
import AnaSayfaGenel from "./component/anasayfa/AnaSayfaGenel";
import YazarListele from "./component/yazar/YazarListele";


const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/yazar" element={<YazarEkleButton />} />
                <Route path="/yazarEkle" element={<YazarEkle />} />
                <Route path="/yazarListele" element={<YazarListele />} />
                <Route path="/kitap" element={<KitapEkleButton />} />
                <Route path="/kitapEkle" element={<KitapEkle />} />
                <Route path="/uyelikbilgileri" element={<UyeKayit />} />
                <Route path="/uyeListele" element={<UyeListele />} />
                <Route path="/anaSayfaGenel" element={<AnaSayfaGenel />} />
            </Routes>
        </>
    );
};

export default App;