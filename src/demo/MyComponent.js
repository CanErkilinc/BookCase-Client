import React, { useState, useEffect } from 'react';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/resource');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('API isteği sırasında hata oluştu:', error);
        }
    };

    return (
        <div>
            <h1>API Verileri</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyComponent;
