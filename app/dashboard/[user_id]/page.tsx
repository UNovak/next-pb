const Dashboard = ({
  params,
}: {
  params: {
    user_id: string
  }
}) => {
  return <>Dashboard of user: {params.user_id}</>
}

export default Dashboard
