
import BackToTopButton from "../ui/BackToTopButton";
import SocialLinks from "../ui/SocialLinks";

const Footer = () => {
    return (
        <footer className="flex flex-col relative items-center justify-center  pt-16 pb-8 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-20">
            <section className="text-center mb-24">
          <h2 className="text-[30px] font-[700] mb-8">Social Media</h2>
          <SocialLinks />
        </section>
             <footer className="flex   justify-between items-center text-gray-400 text-sm border-t border-gray-800 pt-8 w-full">
          <p className="text-white text-[17px] font-[400]">Copyright © 2025 AizuCoin.com. All rights reserved.</p>
          <BackToTopButton />
        </footer>
        </footer>
    )
};

export default Footer
