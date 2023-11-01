import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet /> {/* child Route를 렌더링해야 할 장소를 표시하는 마커 */}
      </main>
    </>
  );
}

export default RootLayout;
