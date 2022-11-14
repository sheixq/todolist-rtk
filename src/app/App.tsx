import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Route} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'

type PropsType = {
    demo?: boolean
}

export const App: React.FC<PropsType> = ({demo = false}) => {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        TODOLIST
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <div style={{height: '5px'}}>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </div>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    )
}

