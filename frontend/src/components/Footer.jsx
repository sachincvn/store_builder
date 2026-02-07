import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
    const { settings } = useSelector((state) => state.config);
    const footerColor = settings?.footerColor || '#111827';
    const footerTextColor = settings?.footerTextColor || '#ffffff';

    return (
        <footer className="border-t mt-12" style={{ backgroundColor: footerColor, color: footerTextColor }}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {settings?.appName || 'Blinkit Clone'}. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: footerTextColor }}>Privacy Policy</a>
                        <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: footerTextColor }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
