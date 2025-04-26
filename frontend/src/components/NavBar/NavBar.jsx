import './NavBar.css';
import * as Icons from '../../assets/Icons';

function NavBar({onSelect}) {
    // const [activeComponent, setActiveComponent] = useState('home');
  return (
    <div className='navBar'>
        
        <div className='icon' onClick={() => onSelect("parent")}>
        <Icons.MdLibraryAdd className='icon' />
        </div>
        <div className='icon' onClick={() => onSelect("home")}>
          <Icons.AiFillHome className='icon' />
        </div>
        <div className='icon' onClick={() => onSelect("kids")}>
        <Icons.PiVideoFill className='icon' />
        </div>
        <div className='icon' onClick={() => onSelect("kids")}>
        <Icons.HiSearch className='icon' />
        </div>
    </div>
  )
}

export default NavBar