import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Anisha Bhagat.</div>
      <div>
        <Link
          to={"https://www.linkedin.com/in/anisha-bhagat108/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/Anisha-GH"} target="_blank">
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
