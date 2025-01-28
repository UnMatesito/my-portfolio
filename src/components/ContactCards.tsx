import Card from "./Card";

function ContactCards() {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 justify-center items-center z-20">
        <a href="https://github.com/UnMatesito" target="_blank"><Card title="GitHub" logo="devicon-github-original"></Card></a>
        <a href="https://www.linkedin.com/in/mateo-nicolas-suarez-a7b68b264/" target="_blank"><Card title="LinkedIn" logo="devicon-linkedin-plain"></Card></a>
        <a href="mailto:mateosuarez1905@hotmail.com" target="_blank"><Card title="Email" logo="devicon-google-plain"></Card></a>
    </div>
  );
}

export default ContactCards;