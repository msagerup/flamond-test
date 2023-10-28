'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/products/`);
  };

  return (
    <nav className='bg-gray-900 border-gray-200 dark:bg-gray-900'>
      <div className=' flex flex-wrap items-center justify-between mx-auto p-4'>
        <div className='cursor-pointer' onClick={handleOnClick}>
        <Image src='/flammond.png' alt='logo' layout='fixed' width={200} height={120} priority style={{ height: 'auto' }} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
