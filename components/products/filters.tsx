import style from './filters.module.css'
import DragSlider from '../utilities/draggable';
import Reviewfilter from '../utilities/reviewsfilter';
import Genres from '../utilities/genres';
import allcategories from '../../modals/allcategories';
import Ratings from '../utilities/ratings';

const Filters=()=>{
    return(
        <div className={style.main}>
            <h1>Filters</h1>
            <div className={style.filtersdiv}>
                <Ratings/>
                <DragSlider/> 
                <Reviewfilter/>
            </div>
            <h1>Genre</h1>
            <div className={style.genrediv}>
                {allcategories.map((el,key)=>{
                    return(
                        <Genres 
                            name={el.name} 
                            source={el.source}
                            key={key}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Filters