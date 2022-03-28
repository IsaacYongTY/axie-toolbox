import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames/bind';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { AxieGene } from 'agp-npm/dist/axie-gene';
import Image from 'next/image';
import styles from './V3CardViewer.module.scss';

const cx = classnames.bind(styles);

type V3CardViewerProps = {
    genes: string | undefined;
};

const V3CardViewer: React.FC<V3CardViewerProps> = ({ genes }) => {
    const [decodedGene, setDecodedGene] = useState<any>({});

    const decodeGene = useCallback(
        (geneHex: string) => {
            return new AxieGene(geneHex);
        },
        [genes]
    );

    useEffect(() => {
        if (!genes) {
            return;
        }
        setDecodedGene(decodeGene(genes));
    }, [genes]);
    return (
        <div className={cx('container')}>
            {decodedGene && (
                <div className={cx('cards')}>
                    <Image
                        src={`/v3/${decodedGene?.tail?.d.cls}/${decodedGene?.tail?.d.partId}.png`}
                        width={300}
                        height={450}
                    />
                    <Image
                        src={`/v3/${decodedGene?.back?.d.cls}/${decodedGene?.back?.d.partId}.png`}
                        width={300}
                        height={450}
                    />
                    <Image
                        src={`/v3/${decodedGene.mouth?.d.cls}/${decodedGene?.mouth?.d.partId}.png`}
                        width={300}
                        height={450}
                    />
                    <Image
                        src={`/v3/${decodedGene.horn?.d.cls}/${decodedGene?.horn?.d.partId}.png`}
                        width={300}
                        height={450}
                    />
                </div>
            )}
        </div>
    );
};

export default V3CardViewer;
