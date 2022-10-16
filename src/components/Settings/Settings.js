import { ArrowPathIcon, MoonIcon, PencilSquareIcon, SunIcon, TvIcon } from '@heroicons/react/24/solid'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, db, storage } from '../../firebase'
import { ThemeAction } from '../../store/Slices/Themeslice';
import { AuthAction } from '../../store/Slices/AuthSlice';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from 'firebase/auth'



const Settings = () => {
    const user = useSelector(state => state.Auth.User)
    const theme = useSelector(state => state.Theme.theme)
    const nameinput = useRef()
    const light = useRef()
    const dark = useRef()
    const system = useRef()
    const dispatch = useDispatch()
    const { Theme } = ThemeAction
    const { SignIn } = AuthAction
    const [btnsave, setbtnsave] = useState('Save');
    const [img, setImg] = useState();


    useLayoutEffect(() => {
        nameinput.current.value = user.displayName
        setImg(user.photoURL)
        switch (theme) {
            case 'light':
                light.current.style.background = 'green'
                light.current.style.color = 'white'
                break;
            case 'dark':
                dark.current.style.background = 'green'
                dark.current.style.color = 'white'
                break;
            case 'system':
                system.current.style.background = 'green'
                system.current.style.color = 'white'
                break;

            default:
                system.current.style.background = 'green'
                system.current.style.color = 'white'
                break;
        }
    }, [])


    const select = async (e) => {

        const data = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            tasks: user.tasks,
            theme: e.target.id
        }




        let elms = [light.current, dark.current, system.current]
        elms.map(elm => {
            if (elm == e.target) {
                elm.style.background = 'green'
                elm.style.color = 'white'

            } else {
                elm.style.background = ''

            }
        })
        const washingtonRef = doc(db, "users", user.uid);

        await updateDoc(washingtonRef, {
            theme: e.target.id
        });



        localStorage.setItem('user', JSON.stringify(data))
        const action = Theme(e.target.id)
        dispatch(action)


    }





    const uploadImg = async (file) => {
        setbtnsave(<ArrowPathIcon className="animate-spin w-4 inline" />)

        // /** @type {any} */
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, 'images/' + `${Date()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);


        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;


                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setbtnsave('save')
                    setImg(downloadURL)
                });
            }
        );


    }



    const saveChanges = () => {
        setbtnsave(<ArrowPathIcon className="animate-spin w-4 inline" />)


        updateProfile(auth.currentUser, {
            displayName: nameinput.current.value ? nameinput.current.value : user.displayName,
            photoURL: img ? img : user.photoURL
        }).then(() => {
            csa()
        }).catch((error) => {
            console.log('Error updating user:', error);
            setbtnsave('save')
        });



        const csa = async () => {
            const washingtonRef = doc(db, "users", user.uid);

            await updateDoc(washingtonRef, {
                displayName: nameinput.current.value ? nameinput.current.value : user.displayName,
                photoURL: img ? img : user.photoURL
            });


            

            const docSnap = await getDoc(washingtonRef);

            if (docSnap.exists()) {
                localStorage.setItem('user', JSON.stringify(docSnap.data()))
                const action = SignIn(docSnap.data())
                dispatch(action)
                window.location.reload()
                setbtnsave('save')
            } else {
                console.log("No such document!");
            }

        }






    }






    return (
        <div className=' shadow-lg w-[98%] flex flex-col items-center  h-[500px] max-w-[800px] rounded-lg bg-white dark:bg-slate-900 mx-auto mt-16 dark:text-white pt-7'>


            <div className=' flex items-center justify-center  '>


                <label htmlFor="upload-photo" className=' cursor-pointer bg-slate-600/50 absolute w-[97px] h-[97px] rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all'>
                    <div className=''>
                        <PencilSquareIcon className='w-7 text-white' />
                        <input onChange={(e) => uploadImg(e.target.files[0])} type="file" className=' hidden' name="photo" id="upload-photo" />

                    </div>
                </label>


                <img src={img} alt="" className=' border-slate-900 border-8 mx-auto my-5 rounded-full h-[112px] w-[112px] inline' />

            </div>


            <input ref={nameinput} className=' text-center rounded-md my-5  px-2 py-1 dark:bg-black bg-slate-200  focus:outline-none' type="text" />

            <button onClick={saveChanges} className='bn632-hover bn20 block mx-auto px-4 py-1'>{btnsave}</button>


            <div className=' h-[0.5px] w-[95%] bg-slate-500/40 mx-auto my-4 '></div>

            <h1 className='mb-5'>Apperance</h1>

            <div className='w-full flex items-center justify-around py-5'>
                <div id='light' onClick={(e) => select(e)} ref={light} className='sm:scale-100 scale-75  w-[100px] h-[50px] rounded-md bg-slate-300 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 ' ><SunIcon className='w-5 mx-1' />  Light</div>
                <div id='dark' onClick={(e) => select(e)} ref={dark} className='sm:scale-100 scale-75  w-[100px] h-[50px] rounded-md bg-slate-300 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 ' ><MoonIcon className='w-5 mx-1' />  Dark</div>
                <div id='system' onClick={(e) => select(e)} ref={system} className='sm:scale-100 scale-75  w-[100px] h-[50px] rounded-md bg-slate-300 dark:bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-800 ' ><TvIcon className='w-5 mx-1' />  System</div>
            </div>

        </div>
    )
}

export default Settings