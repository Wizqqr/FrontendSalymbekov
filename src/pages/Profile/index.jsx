import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.scss';

const Profile = () => {
    const userData = useSelector((state) => state.auth.data);
    const userName = userData?.fullName;
    const userRole = userData?.role;
    const userEmail = userData?.email;
    const userAvatar = userData?.avatarUrl ? `http://localhost:4444${userData.avatarUrl}` : '/noavatar.png';

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    <img src={userAvatar} alt="Avatar" className={styles.avatar} />
                </div>
                <h1 className={styles.profileHeader}>Ваш профиль</h1>
                <p className={styles.profileSubtitle}>
                    Добро пожаловать, {userName}! Ваша роль: {userRole}. Мы рады, что вы с нами.
                </p>
                <div className={styles.profileDetails}>
                    <p className={styles.profileItem}>
                        <strong>Имя: </strong> {userName}
                    </p>
                    <p className={styles.profileItem}>
                        <strong>Почта: </strong> {userEmail}
                    </p>
                    <p className={styles.profileItem}>
                        <strong>Роль: </strong> {userRole}
                    </p>
                </div>
                <div className={styles.profileDescription}>
                    <h2>О вас</h2>
                    <p>
                        Вы являетесь важной частью нашего сообщества. Ваши знания и опыт ценны для нас. Продолжайте развиваться и достигать своих целей, а мы будем рядом на каждом шагу вашего пути.
                    </p>
                    <p>
                        Ваша роль {userRole} позволяет вам вносить вклад в развитие платформы и делиться своим опытом. Не забывайте, что знания – это сила, и каждый день – это новая возможность для роста.
                    </p>
                </div>
                <p className={styles.profileStatus}>
                    Статус аккаунта: <strong>Активный</strong>
                </p>
            </div>
        </div>
    );
};

export default Profile;
