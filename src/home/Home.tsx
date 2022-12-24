import { Link } from 'react-router-dom'
import { DESIGNER_INS_ROUTE, DEV_INS_ROUTE } from '../routes'

const Home = (): React.ReactElement => {
  return (
    <>
      <p>Welcome to Getsafe's Insurance</p>
      <div>
        <Link to={DEV_INS_ROUTE}>Developer insurance</Link>
      </div>
      <div>
        <Link to={DESIGNER_INS_ROUTE}>Designer insurance</Link>
      </div>
    </>
  )
}

export default Home
