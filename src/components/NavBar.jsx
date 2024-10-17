import { Image, Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuToggle } from '@nextui-org/react';

import logo from '../assets/img/byma-logo.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoFooter from '../assets/img/byma-logo-footer.svg'

const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth='full'
        className={`transition duration-300 ${isMenuOpen ? 'bg-bymaAccent' : 'bg-white'}`}
      >
        <NavbarContent className='gap-10' justify='start'>
          <NavbarMenuToggle className={`transition duration-300 ${isMenuOpen ? 'text-white' : 'text-black'}`} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
          <NavbarBrand>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {isMenuOpen ? <Image src={logoFooter} alt="Logo" /> : <Image src={logo} alt="Logo" />}
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarMenu className={` ${isMenuOpen ? 'bg-bymaAccent' : 'bg-white'}`}>
          <Link to="/" className='text-white text-xl font-bold' onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/stocks-abm" className='text-white text-xl font-bold' onClick={() => setIsMenuOpen(false)}>ABM Stocks</Link>
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default NavBar