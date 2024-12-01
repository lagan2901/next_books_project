"use client";

import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import useApi from "../../hooks/use-api";
import Loading from "../utilities/Loading";
import style from "./Auth.module.css";
import AuthLoginForm from "./AuthLoginform";
import AuthSignUp from "./AuthSignupform";
interface Props {
  name: string;
}
const Auth = (props) => {
  const [signin, setsignin] = useState(true);
  const { isLoading, error, sendRequest, setErrorNull } = useApi();
  const [requestsend, setrequest] = useState(false);
  const router = useRouter();
  let p = "nothing";

  const applyData = (data) => {};
  const ans = !error && !isLoading;
  const mount = useRef(0);
  useEffect(() => {
    if (mount.current) {
      console.log(ans);
      if (ans) {
        console.log("hi");
      }
    } else mount.current = 1;
  }, [ans]);

  const loginHandler = async (email: string, password: string) => {
    const payload = { email, password };
    const g = await sendRequest(
      {
        url:"/api/auth/signin",
        provider: "credentials",
        payload: { ...payload, redirect: false },
        method:"POST"
      },
      "signin",
      (data) => {
        if (typeof window !== "undefined") {
          // Access localStorage here
          localStorage.setItem("TOKEN", data);
      }
        window.location.href = "/";
      }
    );
    setrequest(() => true);
  };

  const signupHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    sendRequest(
      {
        url: "/api/auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: email,
          password: password,
          fullname: name,
        },
      },
      "signup",
      (token) => {
        if (typeof window !== "undefined") {
        
        localStorage.setItem("TOKEN", token);
        }
        window.location.href = "/";
      }
    );
  };
  useEffect(() => {
    setErrorNull();
  }, [signin]);

  const statement = signin
    ? `Don't have an account`
    : "Already have an account";
  // if(isLoading) p='loading';
  // else if(error) p=error
  // else p='done'
  // console.log(router);
  const errorNullhandler = () => {
    setErrorNull();
    return;
  };
  return (
    <div className={style.main}>
      {isLoading && <Loading />}
        <Fragment>
          <div className={style.user}>
            <div className={style.formdiv}>
              <div className={style.userauth}>
                <p>{signin ? "Sign in" : "Sign Up"} for BooKs</p>
              </div>
              {error && (
                <div className={style.errordiv}>
                  <p className={style.errorState}>{error}</p>
                </div>
              )}
              {signin && (
                <AuthLoginForm
                  onsubmit={loginHandler}
                  onstart={errorNullhandler}
                />
              )}
              {!signin && (
                <AuthSignUp
                  onsubmit={signupHandler}
                  onstart={errorNullhandler}
                />
              )}
            </div>
            <div className={style.ordiv}>
              <div className={style.orline1}></div>
              <div className={style.orpara}>Or</div>
              <div className={style.orline2}></div>
            </div>
            <div className={style.externalauth}>
              <button>
                <FontAwesomeIcon
                  icon={faGoogle}
                  className={`${style.icon} ${style.icon1}`}
                />{" "}
                Continue with Google
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className={`${style.icon} ${style.icon2}`}
                />{" "}
                Continue with Facebook
              </button>
              <button>
                <FontAwesomeIcon
                  icon={faGithub}
                  className={`${style.icon} ${style.icon3}`}
                />{" "}
                Continue with Github
              </button>
            </div>
          </div>

          <div className={style.signinup}>
            <p>{statement}</p>
            <button
              onClick={() =>
                setsignin((prev) => {
                  return !prev;
                })
              }
            >
              Sign {signin ? "Up" : "In"}
            </button>
          </div>
        </Fragment>
      
    </div>
  );
};

export default Auth;
