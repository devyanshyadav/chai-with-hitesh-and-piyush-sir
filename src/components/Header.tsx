
import { BadgeCheck, CoffeeIcon, Youtube, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col items-center w-full py-8 bg-gradient-to-r from-chai-secondary to-chai-dark text-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-chai-primary">
            Hitesh Choudhary
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-chai-primary/20 text-chai-primary">
              <Youtube className="w-4 h-4 mr-1" /> YouTuber
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-chai-accent/20 text-chai-accent">
              <BadgeCheck className="w-4 h-4 mr-1" /> Tech Educator
            </span>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
              <CoffeeIcon className="w-4 h-4 mr-1" /> Entrepreneur
            </span>
          </div>
          <p className="text-sm text-gray-300 mt-2 text-center md:text-left max-w-md">
            Ex-CTO & Sr. Director with 950k+ YouTube subscribers. Teaching tech in simple language.
          </p>
        </div>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-chai-primary bg-gradient-to-br from-chai-dark to-chai-secondary flex items-center justify-center">
          <span className="text-5xl font-bold text-chai-primary">HC</span>
        </div>
      </div>
      <div className="w-full mt-6 border-t border-gray-700">
        <div className="container flex justify-center md:justify-start gap-4 pt-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? "text-chai-primary" : "text-white hover:text-chai-primary transition-colors"}>
            Home
          </NavLink>
          <NavLink to="/courses" className={({isActive}) => isActive ? "text-chai-primary" : "text-white hover:text-chai-primary transition-colors"}>
            Courses
          </NavLink>
          <NavLink to="/dual-chat" className={({isActive}) => isActive ? "text-chai-primary" : "text-white hover:text-chai-primary transition-colors"}>
            <span className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" /> Chat
            </span>
          </NavLink>
          <a 
            href="https://youtube.com/@HiteshChoudharydotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-chai-primary transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
