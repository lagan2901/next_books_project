import style from './Loading.module.css'
const Loading=()=>{
    return(
        <div className={style[`loader`]}>
            <div className={style[`loader-inner`]}>
                <div className={style[`loader-line-wrap`]}>
                    <div className={style[`loader-line`]}></div>
                </div>
                <div className={style[`loader-line-wrap`]}>
                    <div className={style[`loader-line`]}></div>
                </div>
                <div className={style[`loader-line-wrap`]}>
                    <div className={style[`loader-line`]}></div>
                </div>
                <div className={style[`loader-line-wrap`]}>
                    <div className={style[`loader-line`]}></div>
                </div>
                <div className={style["loader-line-wrap"]}>
                    <div className={style[`loader-line`]}></div>
                </div>
            </div>
        </div>
    )
}

export default Loading;