import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ children }: any) => {

  return (
    <div className="h-[116px] w-full flex justify-between items-center p-[40px] gap-[40px] border-b-[1.5px] border-gray-200">
      <div className="w-full border-2">
        <input />
      </div>
      <div className="w-[286px] flex gap-[10px]">
        <button className="flex gap-[10px] justify-center items-center">
          <div className="">
            <Image
              src={`/images/user-photo.png`}
              width={20}
              height={20}
              alt={'user'}
              priority={true}
            />
          </div>
          <span>Jane Dee</span>
        </button>
        <button>
          <Image
            src={`/images/notif-icon.svg`}
            width={36}
            height={36}
            alt={'notif'}
            priority={true}
          />
        </button>
        <button>
          <Image
            src={`/images/settings-icon.svg`}
            width={36}
            height={36}
            alt={'settings'}
            priority={true}
          />
        </button>
        <button>
          <Image
            src={`/images/download-icon.svg`}
            width={36}
            height={36}
            alt={'download'}
            priority={true}
          />
        </button>
      </div>
      
    </div>
  )
}

export default Navbar
