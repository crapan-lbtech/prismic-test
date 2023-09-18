/**
 * @typedef {import("@prismicio/client").Content.BannerSlice} BannerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BannerSlice>} BannerProps
 * @param {BannerProps}
 */

import styles from './banner.module.css';

async function getData(productId) {
    const res = await fetch(`https://650309dfa0f2c1f3faeb5429.mockapi.io/product/${productId}`);

    // if (!res.ok) {
    //     throw new Error('Failed to fetch data')
    // }

    return res.json();
}

const Banner = async ({ slice }) => {
    const product = await getData(slice.primary.productid);

    return (
        <section
            className={styles.banner}
            style={{ backgroundImage: `url(${product?.image})` }}
        >
            <div className={styles.banner__content}>
                <div className={styles.banner__left}>
                    <h1 className={styles.banner__title}>{slice.primary.title}</h1>
                    <h2 className={styles.banner__subtitle}>{slice.primary.subtitle}</h2>
                </div>
                <div className={styles.banner__right}>
                    <p className={styles['banner__product-id']}>{slice.primary.productid}</p>
                    <p className={styles['banner__product-price']}>${product?.price}</p>
                </div>
            </div>
        </section>
    );
};

export default Banner;
