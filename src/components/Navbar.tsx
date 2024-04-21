const navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Genre",
    link: "/genre",
  },
  {
    name: "Top",
    link: "/top",
  },
  {
    name: "Recommendations",
    link: "/recommendations",
  },
];
export const Navbar = () => {
  return (
    <>
      <div className="h-10 flex justify-center border-2 border-orange-500">
        <ul className=" flex xs:gap-1 sm:gap-5 md:gap-10 lg:gap-20 border-2 border-green-500">
          {navlinks.map((links,index) => (
            <li key={index} className="border-2 border-blue-500  hover:bg-teal-500 rounded-md py-1 px-3"  >{links.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
