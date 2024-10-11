import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './Footer.module.scss';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';

export const Footer = () => {
    return (
        <footer className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <div className={styles.contacts}>
                        <h2>Contacts</h2>
                        <Link href="tel:+1234567890" className={styles.contactItem}>
                            <PhoneIcon />
                            <Typography variant="body2">+996 (312) 658-538</Typography>
                        </Link>
                        <Link href="mailto:info@example.com" className={styles.contactItem}>
                            <MailIcon />
                            <Typography variant="body2">info@salymbekov.com</Typography>
                        </Link>
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <FacebookIcon />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <TwitterIcon />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <InstagramIcon />
                        </a>
                        <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <TelegramIcon />
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
