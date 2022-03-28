import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { Alert, TextField } from '@mui/material';
import axios from 'axios';

import AxieCard from '../../components/AxieCard';
import { POSTGetAxieDetails } from '../../types';
import Layout from '../../components/Layout';

import styles from './playground.module.scss';
import V3CardViewer from '../../components/V3CardViewer';

const cx = classnames.bind(styles);

const Playground: React.FC = () => {
    const [axieDetails, setAxieDetails] = useState<POSTGetAxieDetails>();
    const [axieId, setAxieId] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleGetAxieDetails = async () => {
        console.log(axieId);
        try {
            const { data } = await axios.get(`/api/axie?axieId=${axieId}`);

            setAxieDetails(data.result);
        } catch (err) {
            handleShowAlert();
        }
    };
    console.log(axieDetails);

    const handleShowAlert = () => {
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    };
    return (
        <Layout>
            <div className={cx('container')}>
                <div className={cx('axie-id-input')}>
                    <TextField
                        label="Axie Id"
                        variant="outlined"
                        onChange={(e) => setAxieId(e.target.value)}
                        className={cx('input')}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleGetAxieDetails}
                    >
                        Get Axie Details
                    </button>
                </div>

                {axieDetails && (
                    <div className={cx('result')}>
                        <AxieCard axieDetails={axieDetails} />
                        <V3CardViewer genes={axieDetails?.genes} />
                    </div>
                )}
            </div>

            {showAlert && (
                <Alert variant="filled" severity="error">
                    This is an error alert — check it out!
                </Alert>
            )}
        </Layout>
    );
};

export default Playground;
