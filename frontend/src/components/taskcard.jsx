import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskcard, taskcard as taskcardAxios } from './AxiosCreate';
import Task from './task';
import './taskcard.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ButtonComponent from '../Button/ButtonComponent';
// import Loader from '../Loader/Loader'; // Import your Loader component

export default function TaskCard() {
    //   const navigate = useNavigate();

    //   if (!localStorage.getItem('isAdminAuth')) {
    //     navigate('/adminlogin');
    //   }

    const [loading, setLoading] = useState(true);
    const [taskcardlist, settaskcardlist] = useState([]);
    const [taskcardname, settaskcardname] = useState('');
    const [taskcardCnt, settaskcardCnt] = useState(0);

    useEffect(() => {
        setLoading(true);
        taskcardAxios
            .get('/')
            .then((response) => {
                settaskcardCnt(response.data.count);
                settaskcardlist(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('ERROR MESSAGE ::', error);
                setLoading(false);
            });
    }, [taskcardCnt]);

    //   const [modal, setModal] = useState(false);

    //   const toggleModal = () => {
    //     setModal(!modal);
    //   };

    const addTaskCard = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const accessToken = localStorage.getItem('accessToken');

        // if (!accessToken) {
        //   setLoading(false);
        //   console.log('UNAUTHORIZED!!');
        //   toast.error('Authorization error.');
        //   return;
        // }

        const data = {
            taskcardname: taskcardname,
        };

        await taskcardAxios
            .post('/', data, {
                // headers: {
                //   Authorization: `Bearer ${accessToken}`,
                // },
            })
            .then((response) => {
                settaskcardCnt(taskcardCnt + 1);
                settaskcardname('');
                // setModal(!modal);
                setLoading(false);
                if (response.status === 201) {
                    console.log('Task Card created successfully.');
                    //   toast.success('Task Card created successfully.');
                }
            })
            .catch((error) => {
                console.log('ERROR MESSAGE ::', error);
                setLoading(false);
                // toast.error('Category already exists.');
            });
    };

    return (
        <div>
            {loading ? (
                // <Loader />
                <></>
            ) : (
                <>
                    
                    
                    {/* <div className="sticky-wall">
                        {taskcardlist.map((item) => (
                            <div>
                                <h3>{item.taskcardname}</h3>
                                
                            </div>
                        ))}

                    </div> */}
                </>
            )}
        </div>
    );

}


