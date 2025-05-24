import LogoutIcon from '../../assets/icons/logout.svg';
import { useAuth } from '../../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <div className='flex cursor-pointer w-min rounded-3xl border-orange-600 border-4 py-1 pl-2 pr-8' onClick={logout}>
      <img
        src={LogoutIcon} alt="logout"
        className='bg-white w-6 p-1 mr-2 rounded-2xl'
      />
      <p>Logout</p>
    </div>
  )
};

export default Logout;
