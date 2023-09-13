import Link from 'next/link';

const Sidebar = ({ children }: any) => {
  const navigations = [
    {title: 'dashboard', route: '/'},
    {title: 'appointments', route: '/appointments'},
    {title: 'dashboardas', route: './'},
    {title: 'dashboardasda', route: './'},
    {title: 'dashboardasdadad', route: './'},
  ]

  return (
    <div className="h-screen w-[300px]">
      {navigations.map(item => (
        <div key={item.title}>
          <Link href={item.route} >
          {item.title}</Link>
        </div>
      ))}
      
    </div>
  )
}

export default Sidebar
