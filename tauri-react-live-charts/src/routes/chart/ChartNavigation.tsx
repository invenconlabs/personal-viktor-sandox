import { Outlet } from 'react-router-dom';

export const ChartNavigation = () => {
  return (
    <>
      <nav>
        <div className="container mx-auto flex justify-center">
          <ul className="flex space-x-4">
            <li>
              <a href="/chart/bar">Barshart</a>
            </li>
            <li>
              <a href="/chart/line">Lineshart</a>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
