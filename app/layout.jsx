import Header from "./components/Header";
import ListNavbar from "./components/ListNavbar";
import Context from "./context/Context";
import "./globals.css";

export const metadata = {
  title: "Hệ thống quản lý thông tin hồ sơ bệnh nhân của bệnh viện",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Context>
          <Header></Header>
          <ListNavbar></ListNavbar>
          {children}
        </Context>
      </body>
    </html>
  );
}
