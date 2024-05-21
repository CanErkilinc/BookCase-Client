import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const securityQuestion = "En sevdiğin renk?";
    const [securityAnswer, setSecurityAnswer] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Şifrelerin eşleştiğini kontrol et
        if (password !== confirmPassword) {
            console.error("Şifreler eşleşmiyor");
            return;
        }
        // Üyelik bilgilerini oluştur
        const userInfo = {
            username,
            password,
            securityQuestion,
            securityAnswer
        };
        try {
            // API'ye üyelik bilgilerini gönder
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });
            if (!response.ok) {
                throw new Error('Üye olma başarısız');
            }
            // Başarılıysa kullanıcıyı uygulamaya giriş yap
            onSignup(username, password);
        } catch (error) {
            console.error('Hata:', error.message);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSecurityAnswerChange = (event) => {
        setSecurityAnswer(event.target.value);
    };

    return (
        <div>
            <h2>Üye Ol</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Kullanıcı Adı" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Şifre" />
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Şifreyi Onayla" />
                <input type="text" value={securityQuestion} readOnly />
                <input type="text" value={securityAnswer} onChange={handleSecurityAnswerChange} placeholder="Güvenlik Yanıtı" />
                <button type="submit">Üye Ol</button>
            </form>
        </div>
    );
};

export default Signup;
