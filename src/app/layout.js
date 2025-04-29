import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

export const metadata = {
  title: "News",
  description: "News App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header/>
          {children}
          <Footer />
      </body>
    </html>
  );
}
