/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// import { authApi } from '../__fake-api__/auth-api';
import {apiAuth} from '../api/auth'
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
var ActionType;
(function (ActionType) {
  ActionType['INITIALIZE'] = 'INITIALIZE';
  ActionType['LOGIN'] = 'LOGIN';
  ActionType['LOGOUT'] = 'LOGOUT';
  ActionType['REGISTER'] = 'REGISTER';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type]
  ? handlers[action.type](state, action)
  : state);

export const AuthContext = createContext({
  ...initialState,
  platform: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookies = new Cookies()
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = cookies.get("access_token");

        if (accessToken) {
          // const user = await authApi.me(accessToken);
        const user = cookies.get("access_token");


          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (phone, password) => {
  const cookies = new Cookies()

   await apiAuth({ phone, password }).then((res)=>{
      cookies.set("access_token", res.data.access_token)
      toast.success("Вы вошли в систему")
      setTimeout(()=>{
        window.location.href = "/dashboard";

      },1000)
    }).catch((e)=>{
      console.log(e,"e")
    })
    dispatch({
      type: ActionType.LOGIN,
      payload: {
        phone
      }
    });
  };

  const logout = () => {
    const cookies = new Cookies()
    cookies.remove("access_token");
    dispatch({ type: ActionType.LOGOUT });
    toast.error("Вы вышли в систему")
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'JWT',
        login,
        logout,
        // register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
