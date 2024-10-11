import React, {useEffect} from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import './Home.module.scss';

const Home = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 1 }}>
            <div>
                {isAuth ? (
                    <>
                        <Link to="/info">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                sx={{ marginTop: 4 }}
                            >
                                Расписание
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                    </>
                )}
            </div>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h2" gutterBottom>
                        Welcome to Our Educational Platform
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Empowering students and educators with world-class resources and a community-driven learning experience. Our platform offers extensive opportunities to learn, grow, and succeed in your educational journey.
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Grid>
                <Grid item xs={10} md={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSXfrFBx8usjrJX539FzYp-1H1lml9n6Og-Q&s"
                            style={{ width: '350px', height: '350px' }}
                            alt="Educational Platform"
                        />
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="fadeInUp">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://salymbekov.com/wp-content/uploads/2021/03/c0b9390-1024x683.jpg"
                            alt="Feature 1"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                High-Quality Courses
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Learn from the best educators with well-curated and interactive courses.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="fadeInUp" style={{ animationDelay: '0.3s' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://salymbekov.com/wp-content/uploads/2022/07/bc0b2745-1024x683.jpg"
                            alt="Feature 2"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Community-Driven Learning
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Engage with peers and instructors to deepen your understanding.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className="fadeInUp" style={{ animationDelay: '0.6s' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://salymbekov.com/wp-content/uploads/2022/07/photo_2022-07-18_15-21-07-1024x682.jpg"
                            alt="Feature 3"
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Flexible Learning Paths
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Choose your learning journey with flexible schedules and course paths.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 6 }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Our Vision
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our mission is to provide top-notch educational resources to empower the next generation of professionals. With courses designed by industry leaders, we aim to create a community of learners that is curious, innovative, and collaborative.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We believe that education should be accessible to all, and our platform ensures that students from all walks of life have the tools they need to succeed.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image="https://dordoi.kg/media/upload/news/original/93_913.jpg"
                            alt="Our Vision"
                            height="300"
                        />
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ marginTop: 6 }} className="fadeInUp">
                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom align="center">
                        Ready to Start Your Journey?
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        Join our platform and take the first step towards achieving your educational goals. Whether you're a student or a professional looking to enhance your skills, we have something for everyone.
                    </Typography>
                    <Grid container justifyContent="center">
                        <Button variant="contained" color="primary" size="large">
                            Sign Up Now
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home