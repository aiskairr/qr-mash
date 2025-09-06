"use client"

import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const DashboardPage = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedData, setScannedData] = useState('');
    const [error, setError] = useState('');

    const handleScan = (result: any) => {
        if (result) {
            setScannedData(result[0].rawValue);
            setIsScanning(false);
            setError('');
        }
    };

    const handleError = (error: any) => {
        console.log('Scan error:', error);
        setError('Ошибка при сканировании. Проверьте доступ к камере.');
    };

    const startScanning = () => {
        setError('');
        setScannedData('');
        setIsScanning(true);
    };

    const stopScanning = () => {
        setIsScanning(false);
    };

    const resetScanner = () => {
        setScannedData('');
        setError('');
        setIsScanning(false);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(scannedData);
            // Можно добавить уведомление об успешном копировании
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const openLink = () => {
        if (scannedData.startsWith('http://') || scannedData.startsWith('https://')) {
            window.open(scannedData, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">QR Scanner</h1>
                    <p className="text-gray-600">Сканируйте QR коды быстро и легко</p>
                </div>

                {/* Main Content */}
                <div className="max-w-md mx-auto">
                    {/* Scanner Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                        <div className="p-6">
                            {!isScanning && !scannedData && !error && (
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Готов к сканированию</h3>
                                    <p className="text-gray-600 mb-6">Нажмите кнопку для запуска камеры</p>
                                    <button
                                        onClick={startScanning}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Запустить сканер</span>
                                        </div>
                                    </button>
                                </div>
                            )}

                            {/* Camera View */}
                            {isScanning && (
                                <div className="text-center">
                                    <div className="relative mb-4 rounded-2xl overflow-hidden bg-black">
                                        <Scanner
                                            onScan={handleScan}
                                            onError={handleError}
                                            constraints={{
                                                facingMode: 'environment'
                                            }}
                                            styles={{
                                                container: {
                                                    width: '100%',
                                                    height: '300px'
                                                }
                                            }}
                                        />

                                        {/* Scanning Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-48 h-48 border-2 border-white rounded-2xl relative">
                                                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-blue-400 rounded-tl-lg"></div>
                                                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg"></div>
                                                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-lg"></div>
                                                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-blue-400 rounded-br-lg"></div>

                                                {/* Scanning Line Animation */}
                                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse transform -translate-y-1/2"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2 mb-4">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>

                                    <p className="text-gray-600 mb-4">Наведите камеру на QR код</p>
                                    <button
                                        onClick={stopScanning}
                                        className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-red-600 transition-colors duration-200"
                                    >
                                        Остановить сканирование
                                    </button>
                                </div>
                            )}

                            {/* Scanned Data */}
                            {scannedData && (
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">QR код отсканирован!</h3>
                                    <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Данные:</p>
                                        <p className="text-gray-800 font-mono text-sm break-all bg-white p-3 rounded-lg border">
                                            {scannedData}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <button
                                            onClick={copyToClipboard}
                                            className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-2xl hover:bg-blue-600 transition-colors duration-200 text-sm flex items-center justify-center space-x-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span>Копировать</span>
                                        </button>
                                        {(scannedData.startsWith('http://') || scannedData.startsWith('https://')) && (
                                            <button
                                                onClick={openLink}
                                                className="bg-green-500 text-white font-semibold py-3 px-4 rounded-2xl hover:bg-green-600 transition-colors duration-200 text-sm flex items-center justify-center space-x-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span>Открыть</span>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        onClick={resetScanner}
                                        className="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-600 transition-colors duration-200"
                                    >
                                        Сканировать ещё
                                    </button>
                                </div>
                            )}

                            {/* Error State */}
                            {error && (
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-red-600 mb-2">Ошибка</h3>
                                    <p className="text-gray-600 mb-6">{error}</p>
                                    <button
                                        onClick={resetScanner}
                                        className="w-full bg-gray-500 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-600 transition-colors duration-200"
                                    >
                                        Попробовать снова
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">Как использовать:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start space-x-2">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                                <span>Нажмите &quot;Запустить сканер&quot;</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                                <span>Разрешите доступ к камере</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                                <span>Наведите на QR код и дождитесь сканирования</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                                <span>Скопируйте данные или откройте ссылку</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>)
}

export default DashboardPage