import Card from "./Card";
import ghLogo from "../svg/github.svg";
import lkLogo from "../svg/linkedin.svg";
import emailLogo from "../svg/email.svg";

function ContactCards() {
  return (
    <div className="flex flex-row gap-4">
        <a href="https://github.com/UnMatesito"><Card title="GitHub" logo={ghLogo}></Card></a>
        <a href="https://www.linkedin.com/in/mateo-nicolas-suarez-a7b68b264/"><Card title="LinkedIn" logo={lkLogo}></Card></a>
        <a href="mateosuarez@hotmail.com"><Card title="Email" logo={emailLogo}></Card></a>
    </div>
  );
}

export default ContactCards;