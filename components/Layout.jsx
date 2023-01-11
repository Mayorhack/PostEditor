import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-6xl md:mx-auto font-poppins px-4">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
