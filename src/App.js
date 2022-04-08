import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/" element={<AdminPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App