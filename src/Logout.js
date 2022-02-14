import { removeUserSession } from './Utils/Common';

function Logout(props) {

      // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
    window.location.reload(false);
  }


  return(
    handleLogout()

  );
}
export default Logout;