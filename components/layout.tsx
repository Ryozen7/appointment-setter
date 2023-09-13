import Footer from "./elements/footer"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

const Layout = ({ children }: any) => {
  return (
    <div className="h-screen w-full flex justify-between">
      {/* Aligned to the top */}
      <Sidebar />
      <div className="w-full flex flex-col">
          <Navbar />
          <div className="w-[100%] h-[100%] overflow-y-auto">
          {children}
          </div>
      </div>
    </div>
  )
}

export default Layout
