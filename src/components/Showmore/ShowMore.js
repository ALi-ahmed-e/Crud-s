import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ThemeAction } from '../../store/Slices/Themeslice';



const ShowMore = () => {
    const { ShowMore } = ThemeAction
    const dispatch = useDispatch()
    const data = useSelector(state => state.Theme.showmore)





    const clg = (e) => {

        if (e.target.id == 'yes') {

            dispatch(ShowMore(false))
        }

    }


    return (
        <div id='yes' onClick={(e) => clg(e)} className=' flex items-center justify-center fixed  top-0 bottom-0 left-0 right-0 bg-black/40 z-50'>


            <div id='no' onClick={(e) => clg(e)} className=' flex flex-col items-center w-[95%] max-w-[600px] h-[500px] dark:text-white bg-white dark:bg-black rounded-lg '>
              
              <div className=' flex items-center self-start m-2'><div className=' rounded-full w-4 h-4 mx-2 bg-red-600'></div> {data.TaskStatus}</div>
              
              
                <div className=' text-3xl my-8'>{data.TaskTitle}</div>
                <div className=' text-xl max-h-[270px] overflow-scroll px-4'>{data.TaskDescription}</div>
                <p className="my-5 text-xs font-light text-gray-700 dark:text-gray-400">
                    {data.Date.slice(0, 21)}
                </p>





            </div>

        </div>
    )
}

export default ShowMore