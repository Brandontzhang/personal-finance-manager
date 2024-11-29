import { Ref, CSSProperties } from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { PiSignOut } from 'react-icons/pi';

interface UserOptionsDropdownProps {
  ref: Ref<HTMLDivElement>,
  styles: CSSProperties
}

const UserOptionsDropdown: React.FC<UserOptionsDropdownProps> = ({ ref, styles }) => {

  const { user, isLoading } = useAuth0();

  return (
    <div
      ref={ref}
      style={styles}
      className='mt-4 rounded-md border border-slate-100 shadow-md'
    >
      <div className='flex flex-col items-start space-y-6 p-4'>
        {!isLoading && user?.picture &&
          <div className='flex flex-row justify-stretch space-x-4 items-center'>
            <img className="w-8 h-8 rounded-full" src={user?.picture} alt={user?.name} />
            <div className='flex flex-col'>
              <span>{user?.name}</span>
              <span className='font-extralight'>{user?.email}</span>
            </div>
          </div>
        }
        <Link href={"/profile"} className='flex flex-row justify-start items-center space-x-2 font-extralight'>
          <FaRegUser />
          <span>Your Profile</span>
        </Link>
        <div className='flex flex-row justify-start items-center space-x-2 font-extralight'>
          <PiSignOut size={20} />
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default UserOptionsDropdown;
