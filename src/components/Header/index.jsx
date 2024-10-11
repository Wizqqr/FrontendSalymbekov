import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, isAuthSelector } from '../../redux/slices/auth';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const userData = useSelector((state) => state.auth.data);
    const userAvatar = userData?.avatarUrl ? `http://localhost:4444${userData.avatarUrl}` : '/noavatar.png';
    const userName = userData?.fullName;
    const userRole = userData?.role;

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo}>
                    <img src="https://salymbekov.com/wp-content/uploads/2023/02/logo-salymbekov-university-site.png" alt="College Logo" />
                    <div className={styles.brandText}>
                        <h1>Innovative College</h1>
                        <p>Shaping Tomorrow's Leaders</p>
                    </div>
                </Link>

                <nav className={styles.navbar}>
                    <Link to="/about" className={styles.navItem}>About</Link>
                    <Link to="/courses" className={styles.navItem}>Courses</Link>
                    <Link to="/contact" className={styles.navItem}>Contact</Link>
                    <Link to="/events" className={styles.navItem}>Events</Link>
                </nav>

                <div className={styles.authActions}>
                    {isAuth ? (
                        <>
                            <div className={styles.userMenu}>
                                <div className={styles.avatarContainer}>
                                    <img src={userAvatar} alt="User Avatar" className={styles.avatar} />
                                </div>
                           <div className={styles.userDropdown}>
                                <Link to="/profile">Profile</Link>

                                {userRole === 'superuser' && (
                                    <Link to="/students">Manage Students</Link>
                                )}

                                <button onClick={handleLogout}>Logout</button>
    </div>
</div>

                        </>
                    ) : (
                        <div className={styles.guestActions}>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className={styles.signupBtn}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
