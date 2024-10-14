import { Sidebar } from '@components/sidebar'

const DashboardLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    user_id: string
  }
}>) => {
  return (
    <div>
      <Sidebar params={params} />
      {children}
    </div>
  )
}

export default DashboardLayout
