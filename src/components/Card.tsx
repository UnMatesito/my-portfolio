function Card({ title, logo }: { title: string; logo: string }) {
  return (
    <div className="container border-2 mx-auto">
        <img src={logo} alt={title} className="h-10 w-10"/>
        <h2>{title}</h2>
    </div>
  );
}

export default Card;