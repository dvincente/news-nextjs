import "./globals.css";
import BProvider from "./provider";
import Header from "./components/layout/header";

export const metadata = {
  title: "News",
  description: "News App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BProvider>
          <Header/>
          {children}
          <footer className="bg-white py-12 mt-12">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  GitHub
                </a>
              </div>
              <p className="text-gray-600">
                Copyright © Your Website 2023
              </p>
            </div>
          </footer> </BProvider>
      </body>
    </html>
  );
}
