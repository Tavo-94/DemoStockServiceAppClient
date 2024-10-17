import { Image } from '@nextui-org/react'
import logoFooter from '../assets/img/byma-logo-footer.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-bymaBgFooter px-24 py-8 grid grid-cols-6 place-items-center '>
      <div className='justify-self-start flex flex-col gap-4 col-span-3'>
        <Image width={300} src={logoFooter} alt="Logo" />
        <p className='text-white'>Mercado de Valores y Cámara Compensadora, registrado bajo el N° 639 de la CNV</p>
      </div>

      <div className='justify-self-end flex flex-col items-end gap-4 col-span-3 '>
        <p className='text-white'>25 de Mayo 359 (C1002ABG) CABA Argentina</p>
        <p className='text-white'>Tel./Fax: (+54 11) 4316.6000</p>
        <p className='text-white'><Link to={"mailto:info@byma.com.ar"}> Email: info@byma.com.ar</Link></p>
      </div>
    </footer>
  )
}

export default Footer