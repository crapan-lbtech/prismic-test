import Banner from "@/slices/Banner";

export async function generateStaticParams() {
    const products = await fetch('https://650309dfa0f2c1f3faeb5429.mockapi.io/product').then((res) => res.json())

    return products.map((product) => ({
        id: product.id,
    }))
}


export default async function BannerPage({ params }) {
    // const { id } = params;

    // const product = await fetch(`https://650309dfa0f2c1f3faeb5429.mockapi.io/product/${id}`).then((res) => res.json())

    return (
        <Banner></Banner>
    )
}