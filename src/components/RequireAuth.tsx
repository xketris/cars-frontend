import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
    // Sprawdzamy, czy token istnieje w localStorage
    const token = localStorage.getItem('jwt');
    const location = useLocation();

    if (!token) {
        // Jeśli brak tokena, przekieruj do /login
        // 'state={{ from: location }}' pozwala wrócić na poprzednią stronę po zalogowaniu (opcjonalnie)
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jeśli token jest, wyświetl podstrony (Outlet)
    return <Outlet />;
};

export default RequireAuth;