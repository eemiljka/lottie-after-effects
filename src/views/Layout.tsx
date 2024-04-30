import {Link, Outlet, useLocation} from 'react-router-dom';
import houseAnimation from '../assets/lottie/house.json';
import hamburgerAnimation from '../assets/lottie/hamburger.json'
import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

const Layout = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const toggle = () => {
    setMenuToggle(!menuToggle);
  };

  const location = useLocation();

  const houseRef = useRef<LottieRefCurrentProps>(null);
  const hamburgerRef = useRef<LottieRefCurrentProps>(null);

  const hoverHandler = () => {
    if (!houseRef.current) {
      return;
    }
//    houseRef.current.goToAndStop(0);
    houseRef.current.play();
  };

  const rewind = () => {
    if (!houseRef.current) {
      return;
    }
    houseRef.current.goToAndStop(0);
  }

  useEffect(() => {
    if (!hamburgerRef.current) {
      return;
    }
    if (menuToggle) {
      hamburgerRef.current.setDirection(1);
    } else {
      hamburgerRef.current.setDirection(-1);
    }
    hamburgerRef.current.play();
  }, [menuToggle]);

  useEffect(() => {
    setMenuToggle(false);
  }, [location])

  return (
    <div className="m-auto h-full w-11/12">
      <nav className="absolute right-0 flex flex-col-reverse items-end justify-end lg:relative lg:block lg:flex-row">
        <ul
          className={`
          mr-4
          justify-end
          overflow-hidden
          rounded-lg
          bg-slate-200
          p-0
          shadow-md
          transition-all
          duration-400
          ease-in-out
          lg:flex
          lg:opacity-100
          ${menuToggle ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <li>
            <Link 
              onMouseEnter={hoverHandler}
              className="block p-4 text-center  hover:bg-slate-300" to="/">
              <div className='flex'>
                <Lottie 
                  lottieRef={houseRef}
                  loop={false}
                  className='h-7' 
                  animationData={houseAnimation}
                  onComplete={rewind}
                />
                <span className='pl-1'>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="block p-4 text-center  hover:bg-slate-300"
              to="/example"
            >
              Example
            </Link>
          </li>
        </ul>
        <div className="m-4 h-8 w-8 sm:block lg:hidden">
          <Lottie lottieRef={hamburgerRef} onClick={toggle} loop={false} animationData={hamburgerAnimation} />
        </div>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
