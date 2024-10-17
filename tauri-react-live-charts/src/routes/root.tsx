import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <>
      <nav className="bg-midnightExpress-400">
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <a href="/home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/chart" className="hover:underline">
                Sharts
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
