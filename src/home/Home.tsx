import { Link } from 'react-router-dom'
import { DESIGNER_INS_ROUTE, DEV_INS_ROUTE } from '../routes'

const Home = (): React.ReactElement => {
  return (
    <>
      <p>Welcome to Getsafe's Insurance</p>
      <Link to={DEV_INS_ROUTE}>Get started with developer insurance!</Link>
      <Link to={DESIGNER_INS_ROUTE}>Get started with designer insurance!</Link>
    </>
  )
}

export default Home
