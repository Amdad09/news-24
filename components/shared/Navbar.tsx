import Image from 'next/image';
import Container from '../ui/Container';
import Navlinks from '../navbar/Navlinks';

const Navbar = () => {
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  }); 
    return (
        <div className="py-4">
            <Container>
                <header className="relative flex items-center justify-between">
                    {/* Center Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={42}
                            height={42}
                        />

                        <div>
                            <h1 className="text-red-600 text-2xl font-bold">
                                Bangla News 24
                            </h1>

                            <p className="text-xs text-neutral-500">{date}</p>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="ml-auto flex items-center gap-4">
                        <button>সাইন ইন</button>

                        <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                            সাইন আপ
                        </button>
                    </div>
                </header>
                <Navlinks />
            </Container>
        </div>
    );
};

export default Navbar;
