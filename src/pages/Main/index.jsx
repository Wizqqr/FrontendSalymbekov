import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { isAuthSelector } from "../../redux/slices/auth";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../redux/slices/post";
import { Post } from '../../components/Post'

const Main = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector)
    const {posts} = useSelector(state => state.posts);
    const userData = useSelector((state) => state.auth.data)
    const userRole = userData?.role 

    const isPostLoading = posts.status === 'loading';


    React.useEffect(() => {
        dispatch(fetchPosts())
    })

    return(
        <Container maxWidth="lg" sx={{ paddingTop: 1 }}>
            <Link to = "/create-post">
                <button>Создать пост</button>
            </Link>
            <Grid xs={8} item>
          {( isPostLoading? [...Array(5)] : posts.items).map((obj, index) => 
          isPostLoading ? (
            <Post key={index} isLoading={true}></Post>
          ): (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
            //   isEditable={userData?._id === obj.user.id}
            />
          ))}
        </Grid>
        </Container>
    )
}

export default Main